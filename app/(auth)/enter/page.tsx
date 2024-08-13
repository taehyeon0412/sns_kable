"use client";

import Image from "next/image";
import LoginForm from "../../_components/login/login_form";
import Link from "next/link";
import Kable_name from "@/public/asset/kable_name.png";

export default function InitHome() {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      <div
        className="grid min-h-screen w-full "
        style={{ gridTemplateRows: "8% 82% 10%" }}
      >
        {/* 상단 */}
        <div className="bg-black flex items-center justify-between px-[8%]">
          <div className="flex gap-20">
            <div className="relative py-4 px-20">
              <Image src={Kable_name} alt="KABLE logo" layout="fill" />
            </div>

            <div className="hidden md:flex flex-col justify-center">
              <div>
                <span className="text-sm text-white">
                  빠르게 가입해서 즐겨보세요!
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/create_account">
              <div className="py-2 px-3 lg:px-4 bg-gray-700 hover:bg-gray-100 hover:text-black rounded-md text-white">
                회원가입
              </div>
            </Link>

            <Link href="/enter">
              <div className="py-2 px-3 lg:px-4 bg-gray-400 text-white hover:bg-gray-100 hover:text-black rounded-md ">
                로그인
              </div>
            </Link>
          </div>
        </div>

        {/* 중단 */}
        <div className="flex items-center justify-center px-[8%]">
          <div className=" h-[90%] w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-[5%] sm:px-[15%] md:px-0 lg:px-[10%] xl:px-[15%]">
            <div className="hidden md:flex bg-black text-white  justify-center items-center">
              이미지 들어감
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
