"use client";

import TopNav from "@/app/_components/common/top_nav";
import { formatToTimeAgo } from "@/app/_libs/_client/utils";
import { useItemDetailInfo } from "@/app/hooks/item_detail_info";
import Image from "next/image";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const itemId = parseInt(params.id, 10); // URL에서 id를 가져오고 10진수로 바꿈
  const { data: item } = useItemDetailInfo(itemId);

  console.log(itemId);

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
                  <div className="flex justify-center items-center bg-blue-500 py-3 px-3 rounded-lg hover:cursor-pointer hover:bg-blue-700 ">
                    <span className="inline-flex gap-1 text-xs text-white ">
                      <svg
                        className="fill-none stroke-current text-gray-450 size-[18px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 21C11.8618 21.0008 11.7249 20.9741 11.597 20.9214C11.469 20.8687 11.3527 20.791 11.2546 20.6929L3.09719 12.455C2.07396 11.4123 1.5 10.0044 1.5 8.5373C1.5 7.07018 2.07396 5.66233 3.09719 4.61954C4.12843 3.58241 5.52534 3 6.98167 3C8.438 3 9.83492 3.58241 10.8662 4.61954L12 5.7631L13.1338 4.61954C14.1651 3.58241 15.562 3 17.0183 3C18.4747 3 19.8716 3.58241 20.9028 4.61954C21.926 5.66233 22.5 7.07018 22.5 8.5373C22.5 10.0044 21.926 11.4123 20.9028 12.455L12.7454 20.6929C12.6473 20.791 12.531 20.8687 12.403 20.9214C12.2751 20.9741 12.1382 21.0008 12 21Z"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                      50
                    </span>
                  </div>

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
