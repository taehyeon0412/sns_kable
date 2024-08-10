import { notFound } from "next/navigation";
import db from "../_libs/_server/db";
import getSession from "../_libs/_server/session";

//유저 정보 찾기
export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound(); //세션아이디(쿠키)가 없으면 notFound가 나타남
}
