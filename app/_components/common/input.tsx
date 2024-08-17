"use client";

import { forwardRef } from "react";

interface InputProps {
  label: string;
  name: string;
  kind?: "text";
  errors?: string[];
  [key: string]: any; //input으로 오는 모든 props를 받게 해놓음
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  //kind의 기본값은 text이고 나머지값들은 객체로 받아옴
  //input으로 오는 모든 props를 ...rest로 받음
  ({ label, name, errors = [], kind = "text", ...rest }, ref) => {
    return (
      <div>
        <label
          className="my-3 mb-1 block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>

        {kind === "text" ? (
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              ref={ref} // ref를 input 요소에 연결
              name={name}
              id={name}
              {...rest}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault(); // 이 필드에서만 Enter 키 제출 방지
                }
              }}
              className="appearance-none w-full px-3 py-2 border focus:border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        ) : null}

        {errors?.map((error, index) => (
          <span
            key={index}
            className="flex flex-col pt-1 pl-1 text-red-500 text-xs font-semibold"
          >
            {error}
          </span>
        ))}
      </div>
    );
  }
);

export default Input;
