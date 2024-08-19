import { useQuery } from "react-query";

export interface ItemsInfo {
  id: number;
  title: string;
  image: string;
  description: string;
  categoryId: string;
  user: string;
}

export function useItemsInfo() {
  return useQuery<ItemsInfo[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch("/api/items");
      if (!response.ok) {
        throw new Error("아이템을 불러오는데 실패했습니다. hook 오류");
      }
      return response.json() as Promise<ItemsInfo[]>;
    },
  });
}
