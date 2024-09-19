import CategoryDiv from "@/app/_components/common/category_div";
import TopNav from "@/app/_components/common/top_nav";
import LeftSection from "@/app/_components/followSection/left_section";
import MainSection from "@/app/_components/followSection/main_section";
import React, { Suspense } from "react";

export default async function FollowingHome() {
  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center">
          <LeftSection />
        </div>

        {/* 중앙 메인 div */}
        <div className="col-span-full relative md:col-span-8 flex flex-col gap-6 my-12 px-2">
          <div className="absolute -top-16 md:-top-14 left-2 md:left-4 w-full">
            <CategoryDiv initCategory="전체보기" following />
          </div>

          <Suspense>
            <MainSection />
          </Suspense>
        </div>

        {/* 오픈쪽 div */}
        <div className="hidden md:flex flex-col md:col-span-3 gap-3 ml-4"></div>
      </div>
    </>
  );
}
