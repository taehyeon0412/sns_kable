import db from "@/app/_libs/_server/db";
import { NextRequest, NextResponse } from "next/server";

//프로필을 눌렀을 때 id가 url로 전송되고 id를 url에서 들고옴
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const userId = parseInt(id);

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { message: "유저가 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("유저를 가져오는 중 오류 발생", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
