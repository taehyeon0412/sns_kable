import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈

  if (isNaN(itemId)) {
    return NextResponse.json(
      { message: "아이템ID가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  try {
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

    if (itemDetailInfo) {
      return NextResponse.json(itemDetailInfo, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: "아이템을 찾을 수 없습니다. API 오류",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching itemsInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
