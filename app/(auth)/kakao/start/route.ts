import { NextRequest, NextResponse } from "next/server";

//NextRequest : 클라이언트로부터 들어오는 HTTP 요청
//NextResponse : 서버에서 클라이언트로 보내는 HTTP 응답
export function GET(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/kakao/start" && !url.searchParams.has("refresh")) {
    url.searchParams.set("refresh", "true");
    return NextResponse.redirect(url.toString());
  }

  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const KAKAO_REDIRECT_URL =
    process.env.NODE_ENV === "production"
      ? "https://sns-kable.vercel.app/kakao/complete"
      : "http://localhost:3000/kakao/complete"; //로컬

  const params = new URLSearchParams({
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: KAKAO_REDIRECT_URL,
    response_type: "code",
    scope: "profile_nickname, profile_image",
    prompt: "login",
  });

  const finalUrl = `${baseURL}?${params}`;

  return NextResponse.redirect(finalUrl, {
    headers: { "Cache-Control": "no-store" },
  });
}

/* 
전체 흐름 
1. 클라이언트가 "/kakao/start" 경로에 GET 요청을 NextRequest를 사용해서 보냄
2. 서버는 요청을 처리하고 사용자를 카카오 인증 서버로 리디렉션 함
3. 사용자는 카카오 인증 페이지에서 로그인하고 이후 설정된 리디렉션 URL로 돌아옴
*/
