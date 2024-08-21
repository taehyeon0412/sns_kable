"use client";

import TopNav from "@/app/_components/common/top_nav";
import { formatToTimeAgo } from "@/app/_libs/_client/utils";
import { useItemDetailInfo } from "@/app/hooks/item_detail_info";
import Image from "next/image";
import Loading from "./loading";
import HeartButton from "@/app/_components/common/heart_button";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const { data: item, isLoading } = useItemDetailInfo(itemId);

  if (isLoading) {
    return <Loading />;
  }

  //console.log(itemId);

  /*  console.log(item?.isHearted);
  console.log(item?.heartCount); */

  return (
    <>
      <TopNav />

      {item && (
        <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
          <div className="hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-2 items-center xl:items-start xl:justify-center"></div>

          <div className="col-span-full md:col-span-10 flex flex-col gap-6 my-8 px-2">
            <div className="relative bg-black w-full aspect-[16/9] rounded-xl">
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
                  <div className="relative bg-slate-300 w-8 h-8 rounded-full">
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
                  <div className="bg-blue-400 text-white py-2 px-3 rounded-lg hover:cursor-pointer">
                    팔로우
                  </div>
                </div>
              </div>
            </div>
            {/* 본문 선 */}
            <div className="border-b border-gray-300"></div>

            <div className="w-full break-all">{item.description}</div>

            <div></div>
          </div>

          <div className="hidden md:flex flex-col md:col-span-2 "></div>
        </div>
      )}
    </>
  );
}
