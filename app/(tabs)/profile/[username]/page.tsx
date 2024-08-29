"use client";

import TopNav from "@/app/_components/common/top_nav";
import { userInfo } from "@/app/hooks/user_info";
import { useUserProfile } from "@/app/hooks/user_profile";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "./loading";
import { useUserItems } from "@/app/hooks/username_item";

export default function Profile() {
  const params = useParams();
  const username = params.username as string; //url에서 username 추출 & string이라고 명시해줌
  const { data: userProfile, error, isLoading } = useUserProfile(username);
  const { data: logInUser } = userInfo();
  const { data: userItem } = useUserItems(username);

  /* console.log("user닉네임 : ", username);
  console.log("로그인 유저 정보 : ", logInUser);
  console.log("프로필 유저 정보 : ", userProfile); */

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 보여줄 UI
  }

  if (error || !userProfile) {
    return <div>프로필 정보를 불러오는데 실패했습니다.</div>; // 오류 발생 시 또는 userProfile이 없을 때
  }

  const isMyProfile = logInUser?.username === username; // 같은 username이면 내 프로필 다르면 상대 프로필

  //이미지가 있는지 여부
  const profileImgSrc = isMyProfile
    ? logInUser?.profile_img
    : userProfile.profile_img;

  return (
    <>
      <TopNav />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
        {/* 왼쪽 사이드 */}
        <div className="bg-gray-300 hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-2 items-center xl:items-start xl:justify-center" />

        {/* 중앙 메인 */}
        <div className="col-span-full md:col-span-10 flex flex-col gap-6 my-8 px-2">
          <div className="grid grid-cols-12 w-full min-h-32 mx-auto bg-slate-100">
            <div className=" col-span-3 flex flex-col justify-center items-center py-4 gap-2">
              <div className="relative bg-slate-300 w-16 h-16 rounded-full hover:cursor-pointer">
                {profileImgSrc ? (
                  <Image
                    src={profileImgSrc}
                    alt="user_profileImg"
                    layout="fill"
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 rounded-full" />
                )}
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-xs">{userProfile.username}</span>

                <div className="flex gap-2 justify-center items-start">
                  <span className="text-[11px] text-gray-400 font-light">
                    팔로워 4.2K
                  </span>
                  <span className="h-[16px] w-px bg-gray-300"></span>
                  <span className="text-[11px] text-gray-400">팔로잉 6</span>
                </div>
              </div>
            </div>

            <div className=" col-span-9 flex flex-col justify-center items-start p-4 gap-3">
              <div className="flex justify-between w-full h-full">
                <div className="w-full border-2 border-blue-400 rounded-md text-sm text-gray-700 p-2 whitespace-pre-line">
                  <span>{userProfile.bio || "자기소개를 입력해 주세요!"}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex justify-center items-center h-8 text-xs bg-blue-400 hover:bg-blue-600 text-white py-2 px-3 rounded-lg hover:cursor-pointer">
                  <span>{isMyProfile ? "프로필 편집" : "팔로우"}</span>
                </div>

                {isMyProfile ? null : (
                  <div className="flex justify-center items-center h-8 text-xs bg-blue-400 hover:bg-blue-600 text-white py-2 px-3 rounded-lg hover:cursor-pointer">
                    <span>채팅하기</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 본문 선 */}
          <div className="border-b border-gray-300" />
        </div>

        {/* 오른쪽 사이드 */}
        <div className="bg-gray-300 hidden md:flex flex-col md:col-span-2 " />
      </div>
    </>
  );
}
