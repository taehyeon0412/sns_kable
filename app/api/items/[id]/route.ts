import getSession from "@/app/_libs/_server/session";
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
            username: true,
            profile_img: true,
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
