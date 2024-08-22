"use client";

import TopNav from "@/app/_components/common/top_nav";
import LeftSection from "@/app/_components/homeSection/left_section";
import MainSection from "@/app/_components/homeSection/main_section";
import RightSection from "@/app/_components/homeSection/right_section";

export default function Home() {
  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 div */}
        <LeftSection />

        {/* 중앙 메인 div */}
        <MainSection />

        {/* 오픈쪽 div */}
        <RightSection />
      </div>
    </>
  );
}
