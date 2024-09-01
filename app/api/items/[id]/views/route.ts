import db from "@/app/_libs/_server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈

  try {
    const updateViews = await db.item.update({
      where: { id: itemId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updateViews);
  } catch (error) {
    return NextResponse.json({
      error: "아이템 조회수 증가 오류 (api오류)",
    });
  }
}
