import { useDeleteItem } from "@/app/hooks/item_delete";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./button";
import { useDeleteComment } from "@/app/hooks/comment_delete";
import { useFormStatus } from "react-dom";

interface DeleteDivProps {
  itemId: number;
  commentId?: number;
  type: "item" | "comment"; // 삭제 타입을 정의
}

export default function DeleteDiv({ itemId, commentId, type }: DeleteDivProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteItemMutation = useDeleteItem();
  const deleteCommentMutation = useDeleteComment();
  const router = useRouter();

  //아이템 삭제 로직
  const deleteItem = () => {
    deleteItemMutation.mutate(itemId, {
      onSuccess: () => {
        setIsOpen(false); // 삭제 성공 시 모달 닫기

        router.push("/home");
      },
      onError: (error) => {
        // 에러가 'unknown' 형식일 때 처리
        if (error instanceof Error) {
          console.error("삭제 실패:", error.message);
        } else {
          console.error("삭제 실패: 알 수 없는 오류 발생");
        }
      },
    });
  };

  //댓글 삭제 로직
  const deleteComment = () => {
    if (!commentId) return;

    deleteCommentMutation.mutate(
      { itemId, commentId },
      {
        onSuccess: () => {
          setIsOpen(false); // 삭제 성공 시 모달 닫기
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
  };

  /* console.log(itemId, commentId); */

  // 삭제 로직 type 선택
  const DeleteType = () => {
    if (type === "item") {
      deleteItem();
    } else if (type === "comment") {
      deleteComment();
    }
  };

  return (
    <AnimatePresence>
      <Button onClick={() => setIsOpen(true)} type="itemDelete" text="삭제" />

      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed flex inset-0 items-center justify-center bg-[rgba(0,0,0,0.3)]"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={(e) => {
              e.stopPropagation(); // 내부 컨텐츠 클릭시 이벤트 버블링 방지 (기존 로직)
            }}
            className="fixed flex flex-col items-center justify-center  w-[220px] gap-2 border-2 bg-white p-4 rounded-lg z-50"
          >
            <span>
              {type === "item"
                ? "글을 삭제하시겠습니까?"
                : type === "comment"
                ? "댓글을 삭제하시겠습니까?"
                : null}
            </span>
            <div className="flex w-full gap-2 mt-4 justify-center *:hover:cursor-pointer">
              <button
                onClick={DeleteType}
                className="bg-red-400 text-white border-2 border-red-400 hover:bg-red-500 px-6 py-1 rounded-lg"
              >
                예
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="border-2 border-gray-400 px-5 py-1 rounded-lg hover:bg-gray-400 hover:text-white"
              >
                취소
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
