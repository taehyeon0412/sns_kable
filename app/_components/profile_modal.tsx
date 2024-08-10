"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileInfo {
  name: string;
  email: string | null | undefined;
  profileImg: string | null | undefined;
}

export default function ProfileModal({ name, email, profileImg }: ProfileInfo) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const overlayClicked = () => {};

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full h-full" />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div
            onClick={(e) => e.stopPropagation()} // 내부 컨텐츠 클릭시 이벤트 버블링 방지
            className="modal-content bg-white p-4 rounded"
          >
            <p>{name}님</p>
            <p>{email}</p>
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
          </div>
        </div>
      )}
    </>
  );
}
