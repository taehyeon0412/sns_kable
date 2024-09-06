import { useInfiniteQuery } from "react-query";
import { ItemsInfoProps } from "./items_info";

//특정 사용자의 아이템만 가져와야 하기 때문에 id 인자를 필요
export function useUserItems(id: number) {
  return useInfiniteQuery<ItemsInfoProps[]>({
    queryKey: ["userItems", id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/items/user/${id}?page=${pageParam}&limit=5`,
      );
      if (!response.ok) {
        throw new Error("유저 아이템을 불러오는데 실패했습니다.");
      }
      return response.json() as Promise<ItemsInfoProps[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 5 ? undefined : allPages.length + 1;
    },
  });
}
