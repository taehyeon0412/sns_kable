"use server";

import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import AWS from "aws-sdk";
import { redirect } from "next/navigation";
import { z } from "zod";

//AWS 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // .env.local에서 설정한 리전 값 사용
});

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
  throw new Error("AWS_BUCKET_NAME is not defined");
}

//zod 설정
const itemSchema = z.object({
  image: z.string().min(1, { message: "사진을 추가해 주세요." }),

  title: z.string().min(1, { message: "제목을 입력해주세요." }),

  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),

  description: z.string().min(1, { message: "설명을 입력해주세요." }),
});

export async function uploadItem(_: any, formData: FormData) {
  console.log("FormData:", Object.fromEntries(formData.entries()));

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const data = {
    image: formData.get("image"),
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  };

  if (data.image instanceof File) {
    const photoData = await data.image.arrayBuffer();

    const buffer = Buffer.from(photoData);

    const imgName = `${Date.now()}-${data.image.name.split(".")[0]}.png`;

    const params = {
      Bucket: bucketName!, // bucketName이 undefined가 아님을 명시적으로 알림
      Key: imgName, // 고유한 파일 이름 생성
      Body: buffer,
      ContentType: "image/png",
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      data.image = uploadResult.Location;
    } catch (error) {
      console.error("실패지점:", error);
    }
  }

  const result = itemSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      //category 이름으로 ID 찾기
      //현재 input으로 받아온 값은 카테고리의 이름이라서 id를 찾아야됨
      const category = await db.category.findUnique({
        where: { name: result.data.category },
        select: { id: true }, // id만 선택하여 반환
      });

      await db.item.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          category: {
            connect: {
              id: category?.id,
            },
          },
          image: result.data.image,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      /*  revalidateTag("home-detail");*/
      redirect(`/home`);
    }
  }

  console.log(result);
}
