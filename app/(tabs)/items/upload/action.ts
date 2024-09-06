"use server";

import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { bucketName, s3 } from "@/app/_libs/config/awsConfig";
import {
  itemUpdateSchema,
  itemUploadSchema,
} from "@/app/_libs/schema/itemSchema";
import { redirect } from "next/navigation";

// 공통 예외 처리 함수
function createFieldError(field: string, message: string) {
  return {
    fieldErrors: {
      title: [],
      category: [],
      description: [],
      image: [],
      session: [],
      [field]: [message],
    },
  };
}

//sharp 모듈을 로드
//실패하면(예: 환경에서 모듈을 사용할 수 없는 경우) 오류를 기록하고 대체 메커니즘을 계속 사용
let sharp: typeof import("sharp");
try {
  sharp = require("sharp");
} catch (error) {
  console.error("로드 실패 sharp module:", error);
}

export async function uploadItem(_: any, formData: FormData) {
  /* action 반응이 너무 빨라서 화면이 튀는 것 처럼 보여서 0.2초 딜레이를 줌 */
  await new Promise((resolve) => setTimeout(resolve, 200));

  const isUpdate = !!formData.get("id"); // ID가 있으면 수정 모드

  const schema = isUpdate ? itemUpdateSchema : itemUploadSchema;

  const data = {
    id: formData.get("id"),
    image: formData.get("image") as File | null,
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  };

  // Zod를 사용하여 입력된 데이터 유효성 검사
  const result = schema.safeParse(data);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        title: fieldErrors.title ?? [], //오류가 없을 때는 빈배열로 초기화
        category: fieldErrors.category ?? [],
        description: fieldErrors.description ?? [],
        image: fieldErrors.image ?? [],
        session: [],
      },
    };
  }

  //aws 이미지 업로드 처리
  let imageUrl = "";
  if (data.image && data.image.size > 0) {
    try {
      const imageData = await data.image.arrayBuffer();

      let optimizedImage: Buffer;

      // Sharp를 사용하여 이미지 최적화 if문 사용
      if (sharp) {
        optimizedImage = await sharp(Buffer.from(imageData))
          .webp({ quality: 95 }) // WebP 형식으로 변환 및 압축 품질 설정
          .toBuffer();
      } else {
        //sharp가 정상 동작하지 않으면 그대로 넣는 대체 구문
        optimizedImage = Buffer.from(imageData);
      }

      const fileName = data.image.name
        ? data.image.name.split(".")[0]
        : "default";
      const imgName = `${Date.now()}-${fileName}.webp`;

      const params = {
        Bucket: bucketName!,
        Key: imgName,
        Body: optimizedImage,
        ContentType: "image/webp",
      };

      const uploadResult = await s3.upload(params).promise();
      imageUrl = uploadResult.Location;
    } catch (error) {
      return createFieldError("image", "이미지 업로드에 실패했습니다.");
    }
  } else if (!isUpdate) {
    // 업로드 모드에서 이미지가 없으면 오류 처리
    return createFieldError("image", "유효한 이미지 파일이 필요합니다.");
  }

  // 사용자 세션 확인 및 예외 처리
  const session = await getSession();
  if (!session.id) {
    return createFieldError("session", "사용자 세션을 확인할 수 없습니다.");
  }

  // db에서 현재 선택한 값과 같은 카테고리 찾기
  const category = await db.category.findUnique({
    where: { name: data.category as string },
    select: { id: true },
  });

  // image 예외 처리
  if (!imageUrl && !isUpdate) {
    return createFieldError("image", "이미지 URL 생성에 실패했습니다.");
  }

  // db에 item 생성 & 수정
  if (isUpdate) {
    const existingItem = await db.item.findUnique({
      where: { id: parseInt(data.id as string) },
      select: { image: true },
    });

    await db.item.update({
      where: { id: parseInt(data.id as string) },
      data: {
        title: data.title as string, //type 오류 때문에 string으로 명시해줌
        description: data.description as string,
        category: {
          connect: {
            id: category?.id,
          },
        },
        image: imageUrl || existingItem?.image, // imageUrl이 없으면 기존 이미지를 유지
      },
    });
  } else {
    await db.item.create({
      data: {
        title: data.title as string, //type 오류 때문에 string으로 명시해줌
        description: data.description as string,
        category: {
          connect: {
            id: category?.id,
          },
        },
        image: imageUrl,
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
  }

  redirect("/home");
}
