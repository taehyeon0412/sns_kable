import TopNav from "@/app/_components/common/top_nav";

export default function Loading() {
  return (
    <>
      <TopNav />

      <div className="animate-pulse nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3  items-center xl:items-start xl:justify-center">
          <button className="mt-6 border-transparent w-[80%] bg-neutral-700 border-2 rounded-md py-2 h-10" />
          <button className="xl:mt-6 border-transparent w-[80%] bg-neutral-700 border-2 rounded-md py-2 h-10" />
        </div>

        <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
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
        <div className="hidden md:flex flex-col md:col-span-3 gap-3">
          <div className="flex mt-10 justify-center h-6 w-24 bg-neutral-700" />

          <div className="bg-neutral-700 h-72 w-32" />
        </div>
      </div>
    </>
  );
}
