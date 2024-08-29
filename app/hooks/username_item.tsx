import { useInfiniteQuery } from "react-query";

export interface ItemProps {
  id: number;
  title: string;
  image: string;
  description: string;
  category: {
    name: string;
  };
  user: {
    username: string;
    profile_img: string;
  };
  Comment: { id: number }[];
  heartCount: number;
  created_at: Date;
}

//특정 사용자의 아이템만 가져와야 하기 때문에 username 인자를 필요
export function useUserItems(username: string) {
  return useInfiniteQuery<ItemProps[]>({
    queryKey: ["userItems", username],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/items/user/${username}?page=${pageParam}&limit=5`
      );
      if (!response.ok) {
        throw new Error("유저 아이템을 불러오는데 실패했습니다.");
      }
      return response.json() as Promise<ItemProps[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 5 ? undefined : allPages.length + 1;
    },
  });
}
