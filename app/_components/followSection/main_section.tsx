"use client";

import { useItemsInfo } from "@/app/hooks/items_info";
import InfiniteScroll from "../common/infiniteScroll/infinite_scroll";
import { useSearchParams } from "next/navigation";

export default function MainSection() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "";
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useItemsInfo(categoryId);

  console.log(data);

  // 모든 페이지 데이터를 합친 배열
  const allItems = data?.pages.flat() || [];

  if (allItems.length === 0) {
    return (
      <div className="w-full bg-slate-50 flex justify-center items-center border-2 rounded-lg h-40 mt-6">
        게시물이 없습니다. 팔로우를 해보세요! 👀
      </div>
    );
  }

  return (
    <InfiniteScroll
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}

/*isFetchingNextPage =  다음 페이지 데이터를 불러오는 중인지 확인하는 것
    이게 있으면 불러오는 중일 때는 중복으로 요청하지 않음*/
