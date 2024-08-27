import getSession from "@/app/_libs/_server/session";
import { bucketName, s3 } from "@/app/_libs/config/awsConfig";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10);

  if (isNaN(itemId)) {
    return NextResponse.json(
      { message: "아이템ID가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  try {
    // 아이템 정보를 가져옵니다.
    const itemDetailInfo = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            profile_img: true,
          },
        },
        Comment: {
          select: {
            id: true,
            payload: true,
            created_at: true,
            user: {
              select: {
                username: true,
                profile_img: true,
              },
            },
          },
        },
      },
    });

    // 아이템이 존재하지 않을 경우 404 오류를 반환합니다.
    if (!itemDetailInfo) {
      return NextResponse.json(
        {
          message: "아이템을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    // 하트 개수 계산
    const heartCount = await prisma.heart.count({
      where: { itemId },
    });

    // 사용자 세션 가져오기
    const session = await getSession();

    // 사용자가 하트를 눌렀는지 확인
    const isHearted = session?.id
      ? Boolean(
          await prisma.heart.findFirst({
            where: {
              itemId,
              userId: session.id,
            },
          })
        )
      : false;

    // 응답에 하트 상태 추가
    return NextResponse.json(
      {
        ...itemDetailInfo,
        heartCount,
        isHearted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching item detail:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//DELETE 요청
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10);

  if (isNaN(itemId)) {
    return NextResponse.json(
      { message: "아이템ID가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return NextResponse.json(
      { message: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
      userId,
    },
    select: {
      id: true,
      image: true,
    },
  });

  if (!item) {
    return NextResponse.json(
      { message: "아이템을 찾을 수 없거나 삭제 권한이 없습니다." },
      { status: 404 }
    );
  }

  // S3에서 이미지 삭제
  try {
    await s3
      .deleteObject({
        Bucket: bucketName!,
        Key: item.image!,
      })
      .promise();
  } catch (error) {
    console.error("이미지 삭제 중 오류 발생:", error);
    return NextResponse.json(
      { message: "이미지 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  // DB에서 아이템 삭제
  try {
    await prisma.item.delete({
      where: {
        id: itemId,
        userId,
      },
    });

    return NextResponse.json(
      { message: "아이템이 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("아이템 삭제 중 오류 발생:", error);
    return NextResponse.json(
      { message: "아이템 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
