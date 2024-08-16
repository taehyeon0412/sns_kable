import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categoryInfo = await prisma.category.findMany();

    if (categoryInfo) {
      return NextResponse.json(categoryInfo, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: "카테고리를 찾을 수 없습니다. API 오류",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching categoryInfo:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
