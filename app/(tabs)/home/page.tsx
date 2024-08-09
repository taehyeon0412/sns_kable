import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import { notFound } from "next/navigation";

async function getUser() {
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

export default async function Home() {
  const user = await getUser();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      <span className="text-3xl ">로그인 되었습니다.</span>
      <span className="text-3xl ">환영합니다!!! {user.username}님</span>
      <span className="text-3xl ">로그인 된 이메일은 {user.email}입니다.</span>
    </div>
  );
}
