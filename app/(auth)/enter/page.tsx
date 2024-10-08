"use client";

import Image from "next/image";
import LoginForm from "../../_components/login/login_form";
import Link from "next/link";
import Kable_name from "@/public/asset/kable.name.gif";
import Kable_banner from "@/public/asset/banner.webp";

export default function InitHome() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <div
        className="grid min-h-screen w-full "
        style={{ gridTemplateRows: "8% 82% 10%" }}
      >
        {/* 상단 */}
        <div className="relative bg-white flex items-center justify-between px-[8%]">
          <div className="flex gap-20">
            <div className="absolute h-24 -top-4 py-4 px-20">
              <Image src={Kable_name} alt="KABLE logo" layout="fill" />
            </div>

            <div className="py-4 px-20" />

            <div className="hidden md:flex flex-col justify-center items-center">
              <span className="text-sm ">카테고리로 소통하자 카블!</span>
              <span className="text-sm ">빠르게 가입해서 즐겨보세요!</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/create-account">
              <div className="py-2 px-3 lg:px-4 bg-blue-400 hover:bg-blue-700 rounded-md text-white">
                회원가입
              </div>
            </Link>

            <Link href="/enter">
              <div className="py-2 px-3 lg:px-4 bg-gray-400 text-white hover:bg-gray-600 rounded-md ">
                로그인
              </div>
            </Link>
          </div>
        </div>

        {/* 중단 */}
        <div className="flex items-center justify-center px-[8%]">
          <div className=" h-[90%] w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-[5%] sm:px-[15%] md:px-0 lg:px-[10%] xl:px-[15%]">
            <div className="hidden md:flex  justify-center items-center relative h-[90%]">
              <Image src={Kable_banner} alt="KABLE banner" layout="fill" />
            </div>
            <LoginForm />
          </div>
        </div>

        {/* 하단 */}
        <div className="bg-gray-300  px-[8%]">
          <div className="flex gap-20 justify-start items-center h-full">
            <span className="text-sm  font-semibold">
              Contact Us: taehyeon202@naver.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
