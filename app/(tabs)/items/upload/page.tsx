import TopNav from "@/app/_components/common/top_nav";
import UploadForm from "@/app/_components/common/upload/uploadForm";
import React, { Suspense } from "react";

// 동적 페이지로 설정
export const dynamic = "force-dynamic";

export default function Upload() {
  return (
    <>
      <TopNav kind="upload" />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-12 w-full min-h-screen">
        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 "></div>

        {/* 본문 */}
        <div className="col-span-full md:col-span-8 ">
          <Suspense>
            <UploadForm />
          </Suspense>
        </div>

        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 ">
          <div className="flex flex-col">
            <span>글 작성 Tip!</span>
            <span>1.카테고리에 맞는 사진을 추가하세요</span>
            <span>2.제목을 입력하세요</span>
            <span>3.내용을 입력하세요</span>
          </div>
        </div>
      </div>
    </>
  );
}
