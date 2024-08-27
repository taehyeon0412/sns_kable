import { useMutation, useQueryClient } from "react-query";

export interface CommentProps {
  commentId: number;
  itemId: number;
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ itemId, commentId }: CommentProps) => {
      const response = await fetch(
        `/api/items/${itemId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        let errorMessage = "댓글 삭제에 실패했습니다.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        throw new Error(errorMessage);
      }

      return response.json();
    },
    {
      onSuccess: (_, { itemId }) => {
        queryClient.invalidateQueries(["itemDetail", itemId]);
      },
      onError: (error) => {
        if (error instanceof Error) {
          console.error("댓글 삭제 실패:", error.message);
        } else {
          console.error("알 수 없는 오류 발생");
        }
      },
    }
  );
}
