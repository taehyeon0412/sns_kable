import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/github/start" && !url.searchParams.has("refresh")) {
    url.searchParams.set("refresh", "true");
    return NextResponse.redirect(url.toString());
  }
  /*만약 요청 URL에 refresh라는 쿼리 파라미터가 없으면, 
    refresh=true를 쿼리 파라미터로 추가한 후 다시 /github/start?refresh=true로 리디렉션한다
    URL에 ?refresh=true가 있으면 새로고침됨*/

  const baseURL = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params).toString();
  //params를 URL에 넣어주는것

  const finalUrl = `${baseURL}?${formattedParams}`;
  //baseURL+formattedParams를 합쳐준다

  const response = NextResponse.redirect(finalUrl);

  response.headers.set("Cache-Control", "no-store"); // 캐시를 사용하지 않도록 설정

  return response;
}
