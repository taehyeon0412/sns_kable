import { useDeleteItem } from "@/app/hooks/item_delete";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteDiv({ itemId }: { itemId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteItemMutation = useDeleteItem();
  const router = useRouter();

  //삭제 로직
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

  return (
    <AnimatePresence>
      <div
        onClick={() => setIsOpen(true)}
        className=" bg-red-400 hover:bg-red-500  text-white py-2 px-3 rounded-lg hover:cursor-pointer"
      >
        삭제
      </div>

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
            className="fixed flex flex-col items-center justify-center  w-[200px] gap-2 border-2 bg-white p-4 rounded-lg z-50"
          >
            <span>삭제하시겠습니까?</span>
            <div className="flex w-full gap-2 mt-4 justify-center *:hover:cursor-pointer">
              <div
                onClick={deleteItem}
                className="bg-red-400 text-white border-2 border-red-400 hover:bg-red-500 px-6 py-1 rounded-lg"
              >
                예
              </div>

              <div
                onClick={() => setIsOpen(false)}
                className="border-2 border-gray-400 px-5 py-1 rounded-lg hover:bg-gray-400 hover:text-white"
              >
                취소
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
