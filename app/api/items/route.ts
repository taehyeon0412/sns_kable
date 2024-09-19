import getSession from "@/app/_libs/_server/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5"); //limit은 초기 값이자 한번에 불러오는 데이터 수
  const skip = (page - 1) * limit;
  const categoryId = searchParams.get("category");

  const session = await getSession();
  const userId = session.id;
  const isFollowing = searchParams.get("following") === "true"; // 클라이언트에서 경로 정보로 넘긴 쿼리 파라미터

  try {
    let itemsInfo = [];

    if (isFollowing) {
      const followingUsers = await prisma.follow.findMany({
        where: {
          followerId: userId, //로그인 된 유저가 팔로우 한 유저들
        },
        select: {
          followingId: true,
        },
      });

      const followingUserIds = followingUsers.map(
        (follow) => follow.followingId
      );

      // 팔로우한 유저들의 아이템만 가져옴
      itemsInfo = await prisma.item.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
        where: {
          userId: { in: followingUserIds }, // 팔로우한 유저들의 아이템만 필터링
          ...(categoryId && { categoryId: parseInt(categoryId) }), // 카테고리 필터
        },
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
          Comment: {
            select: {
              id: true,
            },
          },
        },
      });
    } else {
      itemsInfo = await prisma.item.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
        where: categoryId
          ? { categoryId: parseInt(categoryId) } // 카테고리로 필터링
          : {}, // 카테고리 없으면 전체 아이템
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
          Comment: {
            select: {
              id: true,
            },
          },
        },
      });
    }

    //Promise.all => 비동기 작업을 병렬로 처리하고
    //모든 하트 개수 계산이 완료되면, 결과를 배열(itemsHeartCount)로 반환함
    const itemsHeartCount = await Promise.all(
      itemsInfo.map(async (item) => {
        const heartCount = await prisma.heart.count({
          where: { itemId: item.id },
        });

        return {
          ...item,
          heartCount,
        };
      })
    );

    return NextResponse.json(itemsHeartCount, { status: 200 });
  } catch (error) {
    console.error("아이템 정보를 가져오는 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 내부 오류" }, { status: 500 });
  }
}
