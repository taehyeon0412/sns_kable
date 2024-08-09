"use client";

import { useFormStatus } from "react-dom";
import { cls } from "../_libs/_client/utils";
import Link from "next/link";

interface ButtonProps {
  large?: boolean;
  text: string;
  type?: string;
  [key: string]: any;
}

export default function Button({
  large = false, //기본값
  onClick,
  type,
  text,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();
  //useFormStatus를 이용하여 부모 form의 pending상태를 알아냄
  //useFormStatus는 form의 자식만 쓸 수 있음

  return type === "google" ? (
    <Link
      href=""
      className="flex gap-2 justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <svg
        enable-background="new 0 0 32 32"
        version="1.1"
        className="w-5 h-5"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Layer_6" />
        <g id="Layer_4_copy_2">
          <g>
            <circle cx="16" cy="16" fill="#D3D3D3" r="16" />
            <circle cx="16" cy="16" fill="#FFFFFF" r="13.809" />
            <circle cx="16" cy="16" r="11.597" />
          </g>
        </g>
        <g id="Official_copy_3">
          <path
            d="M22.876,14.658c0.09,0.479,0.138,0.98,0.138,1.503c0,4.089-2.738,6.997-6.872,6.997   c-3.955,0-7.158-3.203-7.158-7.158s3.203-7.158,7.158-7.158c1.933,0,3.548,0.711,4.787,1.866l-2.018,2.018v-0.005   c-0.751-0.716-1.704-1.083-2.769-1.083c-2.362,0-4.281,1.995-4.281,4.358c0,2.362,1.919,4.362,4.281,4.362   c2.143,0,3.601-1.226,3.902-2.908h-3.902v-2.792L22.876,14.658L22.876,14.658z"
            fill="#FFFFFF"
          />
        </g>
      </svg>
      {text}
    </Link>
  ) : type === "kakao" ? (
    <Link
      href=""
      className="flex gap-2 justify-center items-center py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z" />
        </g>
      </svg>
      {text}
    </Link>
  ) : type === "login" ? (
    <button
      disabled={pending}
      {...rest}
      className={cls(
        "mt-3 w-full text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm",
        pending ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
      )}
    >
      {pending ? "로그인 중.." : text}
    </button>
  ) : type === "upload" ? (
    <button
      disabled={pending}
      {...rest}
      className={cls(
        "mt-3 w-full text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm",
        pending ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
      )}
    >
      {pending ? "업로드 중.." : text}
    </button>
  ) : (
    <button
      {...rest}
      className={cls(
        "mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
}
