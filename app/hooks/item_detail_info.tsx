import { useQuery } from "react-query";

export interface ItemDetailInfo {
  id: number;
  title: string;
  image: string;
  description: string;
  categoryId: string;
  category: {
    name: string;
  };
  user: {
    id: number;
    username: string;
    profile_img: string;
  };
  created_at: Date;
  views: number;
  heartCount: number;
  isHearted: boolean;
}

export function useItemDetailInfo(itemId: number) {
  return useQuery<ItemDetailInfo>({
    queryKey: ["itemDetail", itemId],
    queryFn: async () => {
      const response = await fetch(`/api/items/${itemId}`);
      if (!response.ok) {
        throw new Error("아이템을 불러오는데 실패했습니다. hook 오류");
      }
      /*  await new Promise((resolve) => setTimeout(resolve, 2000)); // 지연 */
      return response.json() as Promise<ItemDetailInfo>;
    },
  });
}
