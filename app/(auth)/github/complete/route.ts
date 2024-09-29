import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  //코드없이 URL에 강제로 접속할 경우

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  //토큰에 필요한 항목

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  //baseURL+accessTokenParams을 합쳐준것

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  //error일때 400에러를 보여줌

  // --------액세스 토큰을 사용하여 API에 액세스 파트

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login } = await userProfileResponse.json();
  //userData에서 id, avatar_url, login를 가져옴

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("https://sns-kable.vercel.app/home");
  }
  //기존 유저면 바로 홈으로 이동

  const newUser = await db.user.create({
    data: {
      github_id: id + "", //github에서 주는 id는 int인데 prisma에 있는 속성은 string이라서 변환해줌
      profile_img: avatar_url,
      username: `${login}-gh`, //github속성에서 login이 사용자 닉네임으로 되어있음
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("https://sns-kable.vercel.app/home");
  //새 유저면 db에 추가하고 홈으로 이동
}
