"use client";

import { useRouter } from "next/navigation";

export default function MessagesList() {
  const router = useRouter();

  const onClickUpload = () => {
    router.push("/items/upload");
  };

  return (
    <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
      {/* 왼쪽 div */}
      <div className="bg-slate-300 hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center">
        <button
          onClick={onClickUpload}
          className="mt-6 text-white border-transparent w-[80%] bg-blue-400 hover:bg-blue-600 border-2 rounded-md py-2"
        >
          뒤로 가기
        </button>
      </div>

      {/* 중앙 메인 div */}
      <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
        <div>메세지 리스트 입니다.</div>
      </div>

      {/* 오픈쪽 div */}
      <div className="bg-slate-300 hidden md:flex flex-col md:col-span-3 gap-3 ml-2" />
    </div>
  );
}
