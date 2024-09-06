import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  //limit은 초기 값이자 한번에 불러오는 데이터 수
  try {
    const itemsInfo = await prisma.item.findMany({
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
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
        Comment: {
          select: {
            id: true,
          },
        },
      },
    });

    //Promise.all => 비동기 작업을 병렬로 처리하고
    //모든 하트 개수 계산이 완료되면, 결과를 배열(itemsHeartCount)로 반환함
    const itemsHeartCount = await Promise.all(
      itemsInfo.map(async (item) => {
        const heartCount = await prisma.heart.count({
          where: { itemId: item.id },
        });

        return {
          ...item,
          heartCount,
        };
      }),
    );

    return NextResponse.json(itemsHeartCount, { status: 200 });
  } catch (error) {
    console.error("아이템 정보를 가져오는 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 내부 오류" }, { status: 500 });
  }
}
