"use client";

import Image from "next/image";
import Link from "next/link";
import CreateForm from "@/app/_components/login/create_form";
import Kable_name from "@/public/asset/kable.name.gif";
import Kable_banner2 from "@/public/asset/banner2.webp";

export default function CreateHome() {
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
          <div className=" h-[90%] w-full grid grid-cols-2 gap-8 lg:px-[10%] xl:px-[15%] items-center">
            <div className="hidden md:flex  justify-center items-center relative h-[90%]">
              <Image src={Kable_banner2} alt="KABLE banner" layout="fill" />
            </div>
            <CreateForm />
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
