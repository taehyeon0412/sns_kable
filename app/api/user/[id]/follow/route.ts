import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const followingId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const session = await getSession();

  if (isNaN(followingId)) {
    return NextResponse.json(
      { message: "팔로우 사용자 ID가 존재하지 않습니다." },
      { status: 400 }
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

export async function GET(request: NextRequest) {
  const session = await getSession();

  console.log("세션 아이디 정보 : ", session);

  // 세션이 없으면 400 오류와 함께 메시지 반환
  if (!session || !session.id) {
    return NextResponse.json(
      { message: "로그인 상태를 확인할 수 없습니다. 유효한 세션이 없습니다." },
      { status: 400 }
    );
  }

  try {
    // 팔로우한 유저 목록 가져오기
    const followingUsers = await db.follow.findMany({
      where: {
        followerId: session.id, // 로그인된 유저의 ID로 필터링하여 팔로우한 유저 목록을 가져옴
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            profile_img: true,
          },
        },
      },
    });

    // 결과가 없을 경우 빈 배열을 반환
    if (!followingUsers || followingUsers.length === 0) {
      return NextResponse.json([]);
    }

    // 팔로우한 유저 목록을 반환
    const result = followingUsers.map((follow) => ({
      ...follow.following,
      isFollowing: true, // 팔로우한 유저이므로 true
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "팔로우 유저를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
