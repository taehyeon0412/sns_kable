"use client";

import TopNav from "@/app/_components/common/top_nav";
import { formatToTimeAgo } from "@/app/_libs/_client/utils";
import { useItemDetailInfo } from "@/app/hooks/item_detail_info";
import Image from "next/image";
import Loading from "./loading";
import HeartButton from "@/app/_components/common/heart_button";
import { userInfo } from "@/app/hooks/user_info";
import DeleteDiv from "@/app/_components/common/delete_div";
import Link from "next/link";
import CommentForm from "@/app/_components/common/comment_form";
import Button from "@/app/_components/common/button";
import { useRouter } from "next/navigation";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const { data: item, isLoading } = useItemDetailInfo(itemId);
  const { data: user } = userInfo();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  const onClickProfile = () => {
    router.push(`/profile/${item?.user.username}`);
  };

  /*console.log(item?.image); */

  return (
    <>
      <TopNav />

      {item && (
        <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
          {/* 왼쪽 사이드 */}
          <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-2 items-center xl:items-start xl:justify-center" />

          {/* 중앙 메인 */}
          <div className="col-span-full md:col-span-10 flex flex-col gap-6 my-8 px-2">
            <div className="relative bg-black w-full aspect-[16/9] rounded-xl ">
              <Image
                src={item.image}
                alt="user_profileImg"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div>
              <span className="text-xs text-gray-500 px-2 py-1 rounded-md border-none bg-slate-200">
                {item.category.name}
              </span>

              <div className="mt-2">
                <span className="text-3xl break-all">{item.title}</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div
                    onClick={onClickProfile}
                    className="relative bg-slate-300 w-8 h-8 rounded-full hover:cursor-pointer"
                  >
                    <Image
                      src={item.user.profile_img}
                      alt="user_profileImg"
                      layout="fill"
                      className="rounded-full"
                    />
                  </div>

                  <div className="flex gap-1 items-center">
                    <span className="pr-2 text-sm">{item?.user.username}</span>
                    <span className="text-xs text-slate-500">
                      {formatToTimeAgo(item.created_at.toString())}
                    </span>
                    <span className="text-xs text-slate-500">ㆍ</span>
                    <span className="text-xs text-slate-500">
                      읽음 {item.views}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  {/* 하트 */}
                  <HeartButton
                    itemId={item.id}
                    initialIsHearted={item.isHearted}
                    initialHeartCount={item.heartCount}
                  />

                  {/* 팔로우 */}
                  {user?.id === item.user.id ? (
                    <div className="flex justify-center items-center gap-1">
                      <Link href={`/items/upload?id=${item.id}`}>
                        <Button type="itemModify" text="수정" />
                      </Link>

                      <DeleteDiv type="item" itemId={item.id} />
                    </div>
                  ) : (
                    <div className="bg-blue-400 text-white py-2 px-3 rounded-lg hover:cursor-pointer">
                      팔로우
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 본문 선 */}
            <div className="border-b border-gray-300"></div>

            <div className="w-full break-all whitespace-pre-line">
              {item.description}
            </div>

            {/* 작성자 카드 */}
            <div className="grid grid-cols-12 w-full min-h-32 mx-auto bg-slate-100">
              <div className=" col-span-2 flex justify-center items-start py-4">
                <div
                  onClick={onClickProfile}
                  className="relative bg-slate-300 w-16 h-16 rounded-full hover:cursor-pointer"
                >
                  <Image
                    src={item.user.profile_img}
                    alt="user_profileImg"
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className=" col-span-10 flex flex-col justify-center items-start p-4 gap-3">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm">{item.user.username}</span>
                    <div className="flex gap-2 justify-center items-center">
                      <span className="text-xs text-gray-400 font-light">
                        팔로워 4.2K
                      </span>
                      <span className="h-[16px] w-px bg-gray-300"></span>
                      <span className="text-xs text-gray-400">팔로잉 6</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center h-10 text-sm bg-blue-400 hover:bg-blue-600 text-white py-2 px-3 rounded-lg hover:cursor-pointer">
                    <span>채팅하기</span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 whitespace-pre-line">
                  <span>{item.user.bio || "자기소개 문구가 없습니다."}</span>
                </div>
              </div>
            </div>

            {/* 아이템 댓글 */}
            <div className="mt-10">
              <CommentForm
                comments={item.Comment}
                itemId={item.id}
                userId={user!.id}
              />
            </div>
          </div>

          {/* 오른쪽 사이드 */}
          <div className="hidden md:flex flex-col md:col-span-2 " />
        </div>
      )}
    </>
  );
}
