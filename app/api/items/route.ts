import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const itemsInfo = await prisma.item.findMany({
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

    if (itemsInfo) {
      return NextResponse.json(itemsInfo, { status: 200 });
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
