import TopNav from "@/app/_components/common/top_nav";

export default function Loading() {
  return (
    <>
      <TopNav />

      <div className="animate-pulse nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 사이드 */}
        <div className=" hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-2 items-center xl:items-start xl:justify-center" />

        {/* 중앙 메인 */}
        <div className="col-span-full md:col-span-10 flex flex-col gap-6 my-8 px-2">
          <div className="grid grid-cols-12 w-full min-h-32 mx-auto bg-slate-100">
            <div className=" col-span-3 flex flex-col justify-center items-center py-4 gap-2">
              <div className="relative bg-slate-300 w-16 h-16 rounded-full hover:cursor-pointer">
                <div className="w-full h-full bg-gray-400 rounded-full" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <div className="h-4 bg-slate-300 w-10" />

                <div className="flex gap-2 justify-center items-start">
                  <div className="h-4 bg-slate-300 w-10" />
                  <span className="h-[16px] w-px bg-gray-300"></span>
                  <div className="h-4 bg-slate-300 w-10" />
                </div>
              </div>
            </div>

            <div className=" col-span-9 flex flex-col justify-center items-start p-4 gap-3">
              <div className="flex justify-between w-full h-full">
                <div className="w-full border-2 bg-slate-300 rounded-md"/>
              </div>

              <div className="flex gap-2">
                <div className="h-6 bg-slate-300 w-16" />
              </div>
            </div>
          </div>

          {/* 본문 선 */}
          <div className="border-b border-gray-300" />

          <div className="h-full w-full bg-slate-300 " />
        </div>

        {/* 오른쪽 사이드 */}
        <div className=" hidden md:flex flex-col md:col-span-2 " />
      </div>
    </>
  );
}
