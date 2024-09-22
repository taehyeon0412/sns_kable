import db from "@/app/_libs/_server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    //전체 아이템, 아이템 제목 반환
    let itemsInfo = await db.item.findMany({
      select: {
        title: true,
        views: true,
        id: true,
      },
    });

    //하트 개수, 조회수 기반 인기 순위 계산
    const itemsPopular = await Promise.all(
      itemsInfo.map(async (item) => {
        const heartCount = await db.heart.count({
          where: { itemId: item.id },
        });

        return {
          title: item.title, //제목 반환
          id: item.id, //id 반환
          popularScore: item.views + heartCount * 10, // 조회수 + (하트 수 * 10)
        };
      })
    );

    //인기순 정렬, 상위 9개 가져오기
    const rankItems = itemsPopular
      .sort((a, b) => b.popularScore - a.popularScore)
      .slice(0, 9);

    //정렬된 제목 반환
    return NextResponse.json(
      rankItems.map((item) => ({ id: item.id, title: item.title })),
      { status: 200 }
    );
  } catch (error) {
    console.error("인기순 아이템 정보를 가져오는 중 오류 발생 : ", error);
    return NextResponse.json({ message: "서버 내부 오류" }, { status: 500 });
  }
}
