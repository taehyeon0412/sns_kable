import { useMutation, useQueryClient } from "react-query";

interface ItemViewsProps {
  id: number;
  views: number;
}

export function useViewsIncrement() {
  const queryClient = useQueryClient();

  return useMutation(
    async (itemId: number) => {
      const response = await fetch(`/api/items/${itemId}/views`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("조회수 증가 오류 발생 (hook오류)");
      }

      return response.json();
    },
    {
      onMutate: async (itemId: number) => {
        await queryClient.cancelQueries(["itemDetail", itemId]); //item_detail_info.tsx와 쿼리키 통일

        const prevItem = queryClient.getQueryData<ItemViewsProps>([
          "itemDetail",
          itemId,
        ]);

        // 낙관적 업데이트: 기존 데이터를 기반으로 조회수 증가
        if (prevItem) {
          queryClient.setQueryData<ItemViewsProps>(["itemDetail", itemId], {
            ...prevItem,
            views: prevItem.views + 1,
          });
        }

        // 오류 발생 시 복구를 위한 데이터 반환
        return { prevItem };
      },
      onError: (error, itemId, context?: { prevItem?: ItemViewsProps }) => {
        // 오류가 발생하면 이전 상태로 복구
        if (context?.prevItem) {
          queryClient.setQueryData<ItemViewsProps>(
            ["itemDetail", itemId],
            context.prevItem,
          );
        }
      },
      onSettled: (data, error, itemId) => {
        // 성공 또는 실패 후 데이터를 무효화하여 최신 상태를 가져옴
        queryClient.invalidateQueries(["itemDetail", itemId]);
      },
    },
  );
}
