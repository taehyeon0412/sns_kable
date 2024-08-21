import TopNav from "@/app/_components/common/top_nav";

export default function Loading() {
  return (
    <>
      <TopNav />

      <div className="animate-pulse nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-2 items-center xl:items-start xl:justify-center"></div>

        <div className="col-span-full md:col-span-10 flex flex-col gap-6 my-8 px-2">
          <div className="relative bg-neutral-700 w-full aspect-[16/9] rounded-xl" />

          <div>
            <div className="w-14 h-6 px-2 py-1 rounded-md border-none bg-neutral-700" />

            <div className="mt-2">
              <div className="bg-neutral-700 w-48 h-10" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="relative bg-neutral-700 w-8 h-8 rounded-full"></div>

                <div className="flex gap-1 items-center">
                  <div className="bg-neutral-700 w-20 h-6" />
                </div>
              </div>

              <div className="flex justify-center items-center gap-3">
                <div className="flex justify-center items-center bg-neutral-700 h-10 w-14 rounded-lg" />

                <div className="flex justify-center items-center bg-neutral-700 h-10 w-14 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300"></div>

          <div className="w-full h-24 bg-neutral-700" />

          <div></div>
        </div>
      </div>
    </>
  );
}
