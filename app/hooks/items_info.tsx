import { useInfiniteQuery, useQuery } from "react-query";

export interface ItemsInfoProps {
  id: number;
  title: string;
  image: string;
  description: string;
  categoryId: string;
  category: {
    name: string;
  };
  user: {
    username: string;
    profile_img: string;
  };
  created_at: Date;
  views: number;
  heartCount: number;
  isHearted: boolean;
}

export function useItemsInfo() {
  return useInfiniteQuery<ItemsInfoProps[]>({
    queryKey: ["items"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/items?page=${pageParam}&limit=5`);
      if (!response.ok) {
        throw new Error("아이템을 불러오는데 실패했습니다. hook 오류");
      }
      /*  await new Promise((resolve) => setTimeout(resolve, 3000)); */
      return response.json() as Promise<ItemsInfoProps[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 만약 불러온 데이터가 limit보다 작다면 다음 페이지가 없다고 판단
      return lastPage.length < 5 ? undefined : allPages.length + 1;
    },
  });
}
