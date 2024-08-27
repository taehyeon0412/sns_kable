import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = parseInt(params.id, 10);
  const { payload, userId } = await request.json();

  if (!payload || !userId) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        payload,
        userId,
        itemId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ message: "서버 오류입니다." }, { status: 500 });
  }
}
