import { useQuery } from "react-query";

export interface ItemsInfo {
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
  return useQuery<ItemsInfo[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch("/api/items");
      if (!response.ok) {
        throw new Error("아이템을 불러오는데 실패했습니다. hook 오류");
      }
      /*  await new Promise((resolve) => setTimeout(resolve, 3000)); */
      return response.json() as Promise<ItemsInfo[]>;
    },
  });
}
