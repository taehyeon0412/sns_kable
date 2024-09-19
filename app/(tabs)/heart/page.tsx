import CategoryDiv from "@/app/_components/common/category_div";
import TopNav from "@/app/_components/common/top_nav";
import MainSection from "@/app/_components/heartSection/main_section";

export default async function HeartHome() {
  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center"></div>

        {/* 중앙 메인 div */}
        <div className="col-span-full relative md:col-span-8 flex flex-col gap-6 mb-12 px-2">
          <MainSection />
        </div>

        {/* 오픈쪽 div */}
        <div className="hidden md:flex flex-col md:col-span-3 gap-3 ml-4"></div>
      </div>
    </>
  );
}
