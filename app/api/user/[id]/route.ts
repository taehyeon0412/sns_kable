import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { NextRequest, NextResponse } from "next/server";

//프로필을 눌렀을 때 id가 url로 전송되고 id를 url에서 들고옴
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const userId = parseInt(id);

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "유저를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 팔로워, 팔로잉 수 계산
    const followerCount = await db.follow.count({
      where: { followingId: user.id },
    });

    const followingCount = await db.follow.count({
      where: { followerId: user.id },
    });

    // 사용자 세션 가져오기
    const session = await getSession();

    // 사용자가 해당 유저를 팔로우하고 있는지 확인
    const isFollowing = session?.id
      ? Boolean(
          await db.follow.findFirst({
            where: {
              followerId: session.id,
              followingId: userId,
            },
          }),
        )
      : false;

    // 응답에 팔로우 상태, 팔로워 수, 팔로잉 수 추가
    return NextResponse.json(
      {
        ...user,
        isFollowing,
        followerCount,
        followingCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("유저 프로필을 가져오는 중 오류 발생:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
