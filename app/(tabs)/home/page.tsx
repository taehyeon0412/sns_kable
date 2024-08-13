import TopNav from "@/app/_components/common/top_nav";
import db from "@/app/_libs/_server/db";
import getSession from "@/app/_libs/_server/session";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home() {
  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-12 w-full min-h-screen">
        <div className="hidden md:flex flex-col md:col-span-3 bg-red-100">
          <span>첫번째 칼럼입니다.</span>
          <span>첫번째 칼럼입니다.</span>
        </div>
        <div className="col-span-full md:col-span-6 ">
          <span>두번째 칼럼입니다.</span>
          <span>두번째 칼럼입니다.</span>
        </div>
        <div className="hidden md:flex flex-col md:col-span-3 bg-gray-400">
          <span>세번째 칼럼입니다.</span>
          <span>세번째 칼럼입니다.</span>
        </div>
      </div>
    </>
  );
}
