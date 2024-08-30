export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="layout_px fixed top-0 left-0 w-full h-16 bg-slate-300 border-b-2 border-blue-100 flex items-center justify-between px-4 z-50" />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center">
          <div className="mt-6 border-transparent w-[80%] h-10 bg-slate-300 border-2 rounded-md py-2" />
          <div className="mt-6 border-transparent w-[80%] h-10 bg-slate-300 border-2 rounded-md py-2" />
        </div>

        {/* 중앙 메인 div */}
        <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
          <div className=" flex flex-col gap-6 px-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => {
              return (
                <div
                  key={i}
                  className="wrapper flex flex-col gap-2 md:gap-4 md:grid md:grid-cols-10 md:py-4 px-2 md:px-0 hover:cursor-pointer"
                >
                  {/* 왼쪽 div 이미지, 하트,댓글 박스 */}
                  <div className="h-full col-span-3 p-1 flex flex-col gap-6">
                    <div className="relative bg-neutral-700 w-full aspect-[16/9] md:h-32 rounded-xl" />

                    <div className="hidden md:flex gap-2 mt-auto pl-2 justify-start items-center">
                      <div className="h-4 w-8 bg-neutral-700" />

                      <div className="h-4 w-8 bg-neutral-700" />
                    </div>
                  </div>

                  {/* 오른쪽 div 본문 내용 */}
                  <div className="px-1 h-full col-span-7 flex flex-col gap-4 md:gap-2">
                    <div className="flex">
                      <div className="h-6 w-12 rounded-md bg-neutral-700" />
                    </div>

                    <div className="h-8 w-20 rounded-md bg-neutral-700" />

                    <div className="h-6 w-28 rounded-md bg-neutral-700" />

                    <div className="flex gap-2 mt-2 justify-start items-center">
                      <div className="relative bg-neutral-700 w-8 h-8 rounded-full"></div>

                      <div className="flex gap-1 justify-center items-center">
                        <div className="bg-neutral-700 h-4 w-16 " />
                      </div>
                    </div>

                    {/* 하트, 댓글 */}
                    <div className="md:hidden flex gap-4 mt-auto justify-end items-center">
                      <div className="h-4 w-8 bg-neutral-700" />
                      <div className="h-4 w-8 bg-neutral-700" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오픈쪽 div */}
        <div className="hidden md:flex flex-col md:col-span-3 gap-3 ml-2">
          <div className="mt-10 w-full h-64 bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}
