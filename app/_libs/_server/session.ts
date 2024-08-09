import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}
//create_id/action.ts에 있는 cookie.id = user.id;가
//타입스크립트 오류가 나서 interface를 추가하여 알려줌

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "kable_login_session",
    password: process.env.COOKIE_PASSWORD!, //느낌표(!)는env에 비밀번호가 반드시 있다는뜻
  });
}

//iron-session으로 쿠키 만들기
