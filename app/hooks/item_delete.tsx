import { useMutation, useQueryClient } from "react-query";
import { ItemsInfoProps } from "./items_info";

async function deleteItemById(itemId: number): Promise<void> {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "아이템 삭제 중 오류가 발생했습니다.");
  }
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemById,
    onMutate: async (itemId: number) => {
      await queryClient.cancelQueries(["items"]);

      // 무한 스크롤을 고려한 데이터 구조 처리
      const previousData = queryClient.getQueryData<{
        pages: ItemsInfoProps[][];
        pageParams: number[];
      }>(["items"]);

      if (!previousData) return;

      //데이터 업데이트, filter로 삭제할 아이템을 제외하고 새로운 데이터 생성
      const updatedPages = previousData.pages.map((page) =>
        page.filter((item) => item.id !== itemId)
      );

      // 캐시 업데이트, updatedPages를 이용하여 즉시 업데이트 상태 반영
      queryClient.setQueryData(["items"], {
        ...previousData,
        pages: updatedPages,
      });

      return { previousData };
    },
    onError: (err, itemId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["items"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });
}

/* 
낙관적 업데이트: 아이템 삭제를 요청하기 전에 캐시에서 해당 아이템을 제거하여, 
사용자에게 즉시 삭제된 것처럼 보이게 합니다.

오류 처리: 삭제 요청이 실패한 경우, 이전의 캐시 상태로 롤백하여 데이터의 일관성을 유지합니다.

무효화 및 갱신: 삭제 작업이 완료된 후, 관련된 쿼리를 무효화하여 최신 데이터를 다시 가져옵니다.
*/
