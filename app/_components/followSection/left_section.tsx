"use client";

import { useFollowingList } from "@/app/hooks/following_list";
import { useUserInfo } from "@/app/hooks/user_info";
import Image from "next/image";
import FollowButton from "../common/follow_button";
import Button from "../common/button";
import { getOrCreateChat } from "../chats/chat_service";
import { useRouter } from "next/navigation";

export default function LeftSection() {
  const router = useRouter();
  const { data: logInUser } = useUserInfo();

  const {
    data: followingList = [], // 초기값을 빈 배열로 설정
    isLoading,
    error,
  } = useFollowingList(logInUser?.id);

  if (isLoading) {
    return <p className="mt-6">로딩 중...</p>;
  }

  if (error) {
    return (
      <p className="mt-6">
        팔로우 목록을 불러오는 중 <br /> 오류가 발생했습니다.
      </p>
    );
  }

  if (followingList?.length === 0) {
    return <p className="mt-6">팔로우한 유저가 없습니다. 👀</p>;
  }

  // 채팅하기 함수
  const onClickChat = async (userProfile: {
    id: number;
    username: string;
    profile_img?: string;
  }) => {
    if (logInUser) {
      const chatId = await getOrCreateChat(
        logInUser.id.toString(),
        userProfile.id.toString(),
        logInUser.username,
        logInUser.profile_img,
        userProfile.username,
        userProfile.profile_img!
      );
      router.push(`/chats/${chatId}`); // 채팅 페이지로 이동
    }
  };

  return (
    <div className="mt-6 w-full flex flex-col gap-2">
      <span className="bg-slate-300 flex justify-center items-center rounded-lg py-2 text-sm">
        팔로우 목록
      </span>

      <div className="flex flex-col gap-2">
        {followingList?.map((user) => (
          <div
            key={user.id}
            className="bg-slate-100 p-2 gap-2 flex flex-col rounded-xl"
          >
            <div className="flex justify-start items-center gap-2">
              <div className="relative bg-slate-300 w-8 h-8 rounded-full">
                <Image
                  src={user.profile_img!}
                  alt="user_profileImg"
                  fill
                  className="rounded-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <span className="flex text-xs ">
                {user.username.substring(0, 5)}
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-2 text-[10px]">
              <FollowButton
                userId={user.id}
                initialIsFollowing={user.isFollowing}
                className="h-6 justify-center items-center flex"
              />

              <Button
                type="itemModify"
                onClick={() => onClickChat(user)}
                text="채팅하기"
                className="h-6 justify-center items-center flex"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
