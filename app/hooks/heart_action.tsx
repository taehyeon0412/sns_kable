import { useMutation, useQueryClient } from "react-query";

interface HeartActionProps {
  heartCount: number;
  isHearted: boolean;
}

interface MutationContext {
  prevItemDetail?: HeartActionProps;
}

export function useHeartAction(itemId: number) {
  const queryClient = useQueryClient();

  return useMutation<HeartActionProps, unknown, void, MutationContext>(
    async () => {
      const response = await fetch(`/api/items/${itemId}/heart`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("하트 액션에 실패했습니다.");
      }

      return response.json();
    },
    //낙관적 업데이트 적용
    {
      onMutate: async () => {
        //요청 발생하기 전에 캐시 업데이트 - 기존 데이터를 가져옴
        await queryClient.cancelQueries(["itemDetail", itemId]);

        const prevItemDetail = queryClient.getQueryData<HeartActionProps>([
          "itemDetail",
          itemId,
        ]);

        // 새로운 하트 상태를 낙관적 업데이트 적용
        queryClient.setQueryData<HeartActionProps>(
          ["itemDetail", itemId],
          (oldData) => ({
            ...oldData!,
            heartCount: oldData!.heartCount + (oldData!.isHearted ? -1 : 1),
            isHearted: !oldData!.isHearted,
          })
        );

        // 에러 발생 시 롤백할 수 있도록 이전 데이터를 반환
        return { prevItemDetail };
      },
      onError: (err, variables, context) => {
        if (context?.prevItemDetail) {
          queryClient.setQueryData(
            ["itemDetail", itemId],
            context.prevItemDetail
          );
        }
      },
      onSettled: () => {
        // 성공 또는 실패 후에 캐시 무효화하여 최신 데이터를 가져옴
        queryClient.invalidateQueries(["itemDetail", itemId]);
        queryClient.invalidateQueries("items");
      },
    }
  );
}
