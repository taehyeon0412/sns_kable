import { HeartItem, noHeartItem } from "@/app/(tabs)/items/[id]/heart_action";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const session = await getSession();

  if (isNaN(itemId)) {
    return NextResponse.json(
      { message: "아이템ID가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  // 세션이 없거나 유효하지 않다면 기본 하트 상태를 반환
  if (!session || !session.id) {
    return NextResponse.json({ heartCount: 0, isHearted: false });
  }

  //사용자 확인
  const userId = session.id;

  //사용자가 하트 눌렸는지 확인
  const heartPushed = await db.heart.findFirst({
    where: {
      itemId,
      userId,
    },
  });

  let heartCount;

  //하트를 이미 누른경우
  if (heartPushed) {
    await noHeartItem(itemId);
    heartCount = await db.heart.count({
      where: { itemId },
    });
    return NextResponse.json({ heartCount, isHearted: false });
  }
  //하트를 추가
  else {
    await HeartItem(itemId);
    heartCount = await db.heart.count({
      where: { itemId },
    });
    return NextResponse.json({ heartCount, isHearted: true });
  }
}
