import { getUser } from "@/app/hooks/users";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "유저를 찾을 수 없습니다. API 오류" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
