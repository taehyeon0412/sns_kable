"use client";

import Button from "../common/button";
import Input from "@/app/_components/common/input";
import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { login } from "../../(auth)/enter/action";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const psRef = useRef<HTMLInputElement>(null);
  const [state, action] = useFormState(login, null);
  /* from action을 실행하면 action.ts의  handleForm이 실행되고 
  return 값을 state로 받아옴 
  useFormState는 상호작용을 하므로 use client를 상단에 써야됨
  */

  //useRef
  useEffect(() => {
    // 이메일 오류가 우선
    if (state?.fieldErrors?.email) {
      emailRef.current?.focus();
    }
    // 이메일 오류가 없을 때만 비밀번호에 포커스
    else if (state?.fieldErrors?.password) {
      psRef.current?.focus();
    }
  }, [state?.fieldErrors?.email, state?.fieldErrors?.password]);

  return (
    <div className="mt-16 px-4 2xl:px-16">
      <div className="flex justify-center"></div>

      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-lg text-gray-500 font-semibold">입장하기</h5>
        </div>

        <form action={action} className="flex flex-col">
          <div className="mt-1">
            <Input
              ref={emailRef}
              name="email"
              label=""
              placeholder="이메일 주소"
              errors={state?.fieldErrors.email} //useFormState의 state를 받아오고 handleForm의 return값이 출력됨
            />
            <Input
              ref={psRef}
              name="password"
              label=""
              type="password"
              placeholder="비밀번호"
              errors={state?.fieldErrors.password}
            />
          </div>

          <Button text={"로그인"} type="login" />
        </form>

        <div className="mt-8">
          <div className="relative">
            {/* 중간 라인 선 */}
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className="px-2 text-sm text-gray-500  bg-white">
                다른 입장 방법
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button text={"카카오톡"} type="kakao" />
            <Button text={"깃허브"} type="github" />
          </div>

          <div className="bottom-0 mt-12 flex justify-center items-center hover:cursor-pointer">
            <span className="text-xs text-gray-500">아이디 찾기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
