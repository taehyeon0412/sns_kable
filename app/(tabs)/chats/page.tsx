"use client";

import TopNav from "@/app/_components/common/top_nav";
import ChatList from "./../../_components/chats/chat_list";
import { userInfo } from "@/app/hooks/user_info";

export default function Chats() {
  const { data: user, isLoading, error } = userInfo();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !user) {
    return <p>Error loading user information.</p>;
  }

  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <div className=" hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center" />

        {/* 중앙 메인 div */}
        <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
          {/* map으로 감싸기 */}
          <div className="pb-10 divide-y-[1px]">
            <ChatList currentUserId={user.id.toString()} />
          </div>
        </div>

        {/* 오픈쪽 div */}
        <div className=" hidden md:flex flex-col md:col-span-3 gap-3 ml-2" />
      </div>
    </>
  );
}
