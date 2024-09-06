import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const followingId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const session = await getSession();

  if (isNaN(followingId)) {
    return NextResponse.json(
      { message: "팔로우 사용자 ID가 존재하지 않습니다." },
      { status: 400 },
    );
  }

  // 세션이 없거나 유효하지 않다면 기본 팔로우 상태를 반환
  if (!session || !session.id) {
    return NextResponse.json({ isFollowing: false });
  }

  // 팔로우하는 사용자 ID 가져오기(로그인 아이디)
  const followerId = session.id;

  // 이미 팔로우 상태인지 확인
  const follow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  // 이미 팔로우한 상태라면 언팔로우
  if (follow) {
    await db.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return NextResponse.json({ isFollowing: false });
  } else {
    // 팔로우 추가
    await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    return NextResponse.json({ isFollowing: true });
  }
}
