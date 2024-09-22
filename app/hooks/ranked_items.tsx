import { useQuery } from "react-query";

interface RankedItemProps {
  title: string;
  id: number;
}

export function useRankedItems() {
  return useQuery<RankedItemProps[]>({
    queryKey: ["rankedItems"],
    queryFn: async () => {
      const response = await fetch("/api/items/popular");

      if (!response.ok) {
        throw new Error("인기순 아이템을 불러오는데 실패했습니다.(hook error)");
      }

      return response.json() as Promise<RankedItemProps[]>;
    },
    staleTime: 1000 * 60 * 5, //5분 동안 데이터 최신 상태 유지
  });
}
