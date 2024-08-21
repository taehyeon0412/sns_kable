import { useMutation, useQueryClient } from "react-query";

interface HeartActionProps {
  heartCount: number;
  isHearted: boolean;
}

export function heartAction(itemId: number) {
  const queryClient = useQueryClient();

  return useMutation<HeartActionProps>(
    async () => {
      const response = await fetch(`/api/items/${itemId}/heart`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("하트 액션에 실패했습니다.");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        // 쿼리 캐시를 업데이트하여 UI를 갱신합니다.
        queryClient.setQueryData(["itemDetail", itemId], (oldData: any) => ({
          ...oldData,
          heartCount: data.heartCount,
          isHearted: data.isHearted,
        }));
      },
    }
  );
}
