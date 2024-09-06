import { useMutation, useQueryClient } from "react-query";

export function useCreateComment(itemId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    async (newComment: { payload: string; userId: number }) => {
      const response = await fetch(`/api/items/${itemId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("댓글 작성에 실패했습니다.");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["itemDetail", itemId]);
      },
    },
  );
}
