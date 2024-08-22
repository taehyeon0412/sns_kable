import { useMutation, useQueryClient } from "react-query";

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
    // 낙관적 업데이트 구현
    onMutate: async (itemId: number) => {
      // 이전 상태 스냅샷을 저장
      await queryClient.cancelQueries(["items"]);
      const previousItems = queryClient.getQueryData<
        { id: number; title: string }[]
      >(["items"]);

      // 낙관적으로 UI 업데이트 (아이템을 즉시 제거)
      queryClient.setQueryData(["items"], (oldItems: any) =>
        oldItems?.filter((item: { id: number }) => item.id !== itemId)
      );

      // 이전 상태를 반환하여 onError에서 복원할 수 있도록 함
      return { previousItems };
    },
    onError: (err, itemId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(["items"], context?.previousItems);
    },
    onSettled: () => {
      // 요청이 완료되면(성공 또는 실패) 캐시를 무효화하여 최신 데이터를 가져옴
      queryClient.invalidateQueries(["items"]);
    },
  });
}
