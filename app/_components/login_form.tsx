"use client";

import Button from "../_components/button";
import Input from "@/app/_components/input";
import React from "react";

export default function LoginForm() {
  return (
    <div className="mt-16 px-4">
      <div className="flex justify-center">이미지 들어갈 공간</div>

      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-lg text-gray-500 font-semibold">입장하기</h5>
        </div>

        <form className="flex flex-col">
          <div className="mt-1">
            <Input
              name="email"
              label=""
              type="email"
              placeholder="이메일 주소"
              /* errors={state?.fieldErrors.email} //useFormState의 state를 받아오고 handleForm의 return값이 출력됨 */
              required
            />
            <Input
              name="password"
              label=""
              type="password"
              placeholder="비밀번호"
              /* errors={state?.fieldErrors.password} */
              required
            />
          </div>

          <Button text={"로그인"} type="login" />
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            {/* 중간 라인 선 */}
            <div className="relative -top-3 text-center">
              <span className="px-2 text-sm text-gray-500  bg-white">
                다른 입장 방법
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button text={"카카오톡"} type="kakao" />
            <Button text={"구글"} type="google" />
          </div>

          <div className="bottom-0 mt-12 flex justify-center items-center hover:cursor-pointer">
            <span className="text-xs text-gray-500">아이디 찾기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
