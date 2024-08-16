import { useQuery } from "react-query";

export interface CategoryInfo {
  id: number;
  name: string;
}

export function useCategoryInfo() {
  return useQuery<CategoryInfo[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error("카테고리를 불러오는데 실패했습니다. hook 오류");
      }
      return response.json() as Promise<CategoryInfo[]>;
    },
  });
}
