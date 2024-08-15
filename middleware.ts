import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/_libs/_server/session";

interface Routes {
  [key: string]: boolean;
}

//퍼블릭으로 접근 가능한 URL 목록
const publicOnlyUrls: Routes = {
  "/": true,
  "/enter": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
  "/kakao/start": true,
  "/kakao/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname]; //유저가 publicOnlyUrls로 이동하는지 알 수 있게함

  //로그인하지 않은 상태
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/enter", request.url));
    }
  }
  //로그인 한 상태
  else {
    if (exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
//미들웨어가 실행되지 않는것
