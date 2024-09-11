"use client";

import TopNav from "@/app/_components/common/top_nav";
import LeftSection from "@/app/_components/homeSection/left_section";
import MainSection from "@/app/_components/homeSection/main_section";
import RightSection from "@/app/_components/homeSection/right_section";
import { useItemsInfo } from "@/app/hooks/items_info";
import Loading from "./loading";
import CategoryDiv from "@/app/_components/common/category_div";

export default function Home() {
  const { isLoading: isMainLoading } = useItemsInfo();

  const isLoading = isMainLoading;

  if (isLoading) {
    return <Loading />; // 페이지 전체 로딩 처리
  }

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
            <CategoryDiv initCategory="전체보기" home />
          </div>
          <MainSection />
        </div>

        {/* 오픈쪽 div */}
        <div className="hidden md:flex flex-col md:col-span-3 gap-3 ml-4">
          <RightSection />
        </div>
      </div>
    </>
  );
}
