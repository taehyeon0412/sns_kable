import TopNav from "@/app/_components/common/top_nav";
import ChatList from "./../../_components/chats/chat_list";

export default function Chats() {
  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <div className="bg-slate-300 hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center" />

        {/* 중앙 메인 div */}
        <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
          {/* map으로 감싸기 */}
          <div className="pb-10 divide-y-[1px]">
            <ChatList />
          </div>
        </div>

        {/* 오픈쪽 div */}
        <div className="bg-slate-300 hidden md:flex flex-col md:col-span-3 gap-3 ml-2" />
      </div>
    </>
  );
}
