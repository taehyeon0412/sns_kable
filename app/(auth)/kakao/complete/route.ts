import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const KAKAO_REDIRECT_URL =
    process.env.NODE_ENV === "production"
      ? "https://sns-kable.vercel.app/kakao/complete"
      : "http://localhost:3000/kakao/complete"; //로컬

  // 액세스 토큰 받기
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return redirect("/error"); // 코드가 없을 경우 오류 페이지로 리디렉션

  const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      redirect_uri: KAKAO_REDIRECT_URL,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // 액세스 토큰으로 사용자 정보 요청
  const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const userInfo = await userInfoResponse.json();

  //db에서 유저가 있는지 유효성 검사
  const user = await db.user.findUnique({
    where: { kakao_id: userInfo.id + "" }, //string으로 받아야 됨
    select: { id: true },
  });

  //기존 유저면 바로 홈으로 이동
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/home");
  }

  //새로운 유저면 사용자 정보를 DB에 저장하고 로그인
  const newUser = await db.user.create({
    data: {
      kakao_id: userInfo.id + "",
      profile_img: userInfo.properties.profile_image,
      username: userInfo.properties.nickname,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/home");
}

/* 
전체 흐름 : 
1.리디렉션 URL 설정
2.인증 코드 수신
3.액세스 토큰 요청
4.사용자 정보 요청 -> db에서 사용자 확인
5.기존 사용자 or 새로운 사용자 확인 후 처리
*/
