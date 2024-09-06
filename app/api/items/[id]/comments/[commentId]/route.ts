import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//댓글 삭제 로직
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const itemId = parseInt(params.id, 10);
  const commentId = parseInt(params.commentId, 10);

  try {
    // 추가 검증: 해당 commentId가 itemId에 속하는지 확인
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (comment?.itemId !== itemId) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 },
      );
    }

    // 댓글 삭제
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json(
      { message: "댓글이 삭제되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

//댓글 수정 로직
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  const itemId = parseInt(params.id, 10);
  const commentId = parseInt(params.commentId, 10);

  const { payload } = await request.json(); // 클라이언트에서 보낸 JSON 데이터에서 payload 추출

  try {
    // 추가 검증: 해당 commentId가 itemId에 속하는지 확인
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (comment?.itemId !== itemId) {
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 },
      );
    }

    //댓글 수정
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        payload: payload,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      { message: "댓글이 수정되었습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
