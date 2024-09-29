import { getUser } from "@/app/hooks/users";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        message: `Internal Server Error: ${error.message}`,
        error: error.stack,
      },
      { status: 500 }
    );
  }
}
