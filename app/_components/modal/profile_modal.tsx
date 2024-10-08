"use client";

import Image from "next/image";
import { useState } from "react";
import { useLogout } from "../../hooks/logout";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileInfo {
  id: number | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  profileImg: string | null | undefined;
}

export default function ProfileModal({
  id,
  name,
  email,
  profileImg,
}: ProfileInfo) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const logout = useLogout();

  const onClickLogout = () => {
    logout.mutate(); //로그아웃 요청
  };

  const onClickUpload = () => {
    router.push("/items/upload");
  };

  const onClickProfile = () => {
    router.push(`/profile/${id}`);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full h-full" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed flex inset-0 items-center justify-center bg-transparent"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()} // 내부 컨텐츠 클릭시 이벤트 버블링 방지
              className="flex flex-col w-[250px] gap-2 border-2 bg-white p-4 pr-2 rounded-lg absolute top-16 right-0 md:right-[3%] xl:right-[10%] 2xl:right-[15%]"
            >
              <div className="flex gap-4" onClick={onClickProfile}>
                <div className="flex flex-col gap-1">
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
                    <p className="text-sm">{name?.substring(0, 6)}님</p>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
