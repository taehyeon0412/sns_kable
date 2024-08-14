"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileInfo {
  name: string;
  email: string | null | undefined;
  profileImg: string | null | undefined;
}

export default function ProfileModal({ name, email, profileImg }: ProfileInfo) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onClickLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        // 로그아웃 성공 시 홈페이지로 리다이렉트
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const onClickUpload = () => {
    router.push("/items/upload");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full h-full" />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed flex inset-0 items-center justify-center bg-transparent"
        >
          <div
            onClick={(e) => e.stopPropagation()} // 내부 컨텐츠 클릭시 이벤트 버블링 방지
            className="flex flex-col w-[250px] gap-2 border-2 bg-white p-4 pr-2 rounded-lg absolute top-16 right-0 md:right-[3%] xl:right-[10%] 2xl:right-[15%]"
          >
            <div className="flex gap-4">
              <div
                onClick={() => {
                  "프로필 페이지 가는 것 넣기";
                }}
              >
                {profileImg ? (
                  <Image
                    src={profileImg}
                    alt="profile image"
                    className="rounded-full w-10 h-10 bg-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-300" />
                )}

                <div className="flex justify-center items-center">
                  <div className="text-[10px] border-gray-300 border-2 rounded-md px-1">
                    내 정보
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[160px] items-start justify-center gap-1 pr-4">
                <div className="flex w-full items-center justify-start gap-2">
                  <p className="text-sm">{name.substring(0, 6)}님</p>
                </div>

                <div className="w-full flex justify-start items-center">
                  <p className="text-[10px] text-gray-500">{email}</p>
                </div>
              </div>
            </div>

            {/* 중간 줄 */}
            <div className="w-full border-t border-gray-300" />

            <div className="flex gap-4 justify-center items-center *:px-4">
              <button
                onClick={onClickUpload}
                className="text-white border-transparent bg-orange-400 hover:bg-orange-500 border-2 rounded-md"
              >
                새 글쓰기
              </button>

              <button
                onClick={onClickLogout}
                className="text-gray-600 border-gray-300 hover:bg-slate-300 border-2 rounded-md"
              >
                로그 아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
