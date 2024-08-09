"use client";

import Image from "next/image";
import Link from "next/link";
import CreateForm from "@/app/_components/login/create_form";

export default function CreateHome() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <div
        className="grid min-h-screen w-full "
        style={{ gridTemplateRows: "8% 82% 10%" }}
      >
        {/* 상단 */}
        <div className="bg-gray-300 flex items-center justify-between px-[8%]">
          <div className="flex gap-20">
            <div className="py-4 px-20 bg-black text-white">로고</div>

            <div className="flex flex-col justify-center">
              <div>
                <span>sns에 오신것을 환영함 설명 쭉~</span>
              </div>

              <div>
                <span className="text-sm">빠르게 가입해서 즐겨보세요!</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href={"/create_account"}>
              <button className="py-2 px-4 bg-gray-800 rounded-md text-white">
                회원가입
              </button>
            </Link>

            <Link href={"/"}>
              <button className="py-2 px-4 bg-gray-500 rounded-md text-white">
                로그인
              </button>
            </Link>
          </div>
        </div>

        {/* 중단 */}
        <div className="flex items-center justify-center px-[8%]">
          <div className=" h-[90%] w-full grid grid-cols-2 gap-8 lg:px-[10%] xl:px-[15%] items-center">
            <div className="bg-black text-white flex justify-center items-center h-full">
              이미지 들어감
            </div>
            <CreateForm />
          </div>
        </div>

        {/* 하단 */}
        <div className="bg-gray-300  px-[8%]">
          <div className="flex gap-20 justify-center items-center h-full">
            <span className="text-sm  font-semibold">
              Contact Us: taehyeon202@naver.com
            </span>
            <span className="text-sm hover:cursor-pointer font-semibold">
              고객센터
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
