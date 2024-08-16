import { createAccount } from "@/app/(auth)/create-account/action";
import Button from "../common/button";
import Input from "../common/input";
import { useFormState } from "react-dom";
import React, { useEffect, useRef } from "react";

export default function CreateForm() {
  const [state, action] = useFormState(createAccount, null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const psRef = useRef<HTMLInputElement>(null);
  const pscRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.fieldErrors?.username) {
      nameRef.current?.focus();
    } else if (state?.fieldErrors?.email) {
      emailRef.current?.focus();
    } else if (state?.fieldErrors?.password) {
      psRef.current?.focus();
    } else if (state?.fieldErrors?.password_check) {
      pscRef.current?.focus();
    }
  }, [state?.fieldErrors]);

  return (
    <div className="px-4 py-4">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">안녕하세요!</h1>
          <h2 className="text-sm font-semibold">
            가입을 하려면 항목을 채워주세요.
          </h2>
        </div>

        <form action={action}>
          <div className="flex flex-col">
            <Input
              label="닉네임"
              name="username"
              type="text"
              placeholder="닉네임"
              errors={state?.fieldErrors.username}
            />
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder="이메일 주소"
              errors={state?.fieldErrors.email}
            />
            <Input
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호"
              errors={state?.fieldErrors.password}
            />
            <Input
              label="비밀번호 확인"
              name="password_check"
              type="password"
              placeholder="비밀번호 확인"
              errors={state?.fieldErrors.password_check}
            />
          </div>

          <Button text="생성 완료" />
        </form>
      </div>
    </div>
  );
}
