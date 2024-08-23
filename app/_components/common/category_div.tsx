"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryInfo } from "@/app/hooks/category_info";

interface CategoryDivProps {
  errors?: string[];
  initCategory?: string;
}

export default function CategoryDiv({
  errors,
  initCategory,
}: CategoryDivProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategory, setIsCategory] = useState(`${initCategory}` || "");
  const [isDisabled, SetIsDisabled] = useState(false); //버튼 활성화
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data: category } = useCategoryInfo();

  /* useRef로 버튼의 위치를 파악하고 모달의 위치를 업데이트 하는 함수 */
  const updateModalPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top + window.scrollY - 2,
        left: rect.left + rect.width + 10,
      });
    }
  };

  /* 모달의 상태(isOpen)가 변경될 때마다 모달의 위치를 초기화, 창크기 변경될 때 위치 업데이트 */
  useEffect(() => {
    if (isOpen) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition); // 리사이즈 이벤트 리스너 추가
    }
    return () => {
      window.removeEventListener("resize", updateModalPosition); // 클린업: 리사이즈 이벤트 리스너 제거
    };
  }, [isOpen]);

  const categorySelect = (categoryName: string) => {
    // isDisabled가 false일 때만 실행
    if (!isDisabled) {
      setIsCategory(categoryName);
      SetIsDisabled(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 100);

      setTimeout(() => {
        SetIsDisabled(false);
      }, 300);
    }
  };

  //page.tsx에서 수정 버튼 눌렀을 때 initCategory가 변경 되면 상태 업데이트
  useEffect(() => {
    if (initCategory) {
      setIsCategory(initCategory);
    }
  }, [initCategory]);

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center shadow-sm rounded-md border border-gray-300 py-4 mt-5 w-[18%] h-8 text-sm font-medium text-gray-500 hover:cursor-pointer">
        <AnimatePresence>
          <div className="absolute w-full h-full rounded-full bg-transparent z-50">
            {/* formData로 제출하기 위해 input을 만들고 hidden을 설정, name과 value를 주었음 */}
            <input type="hidden" name="category" value={isCategory} />
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(true)}
              type="button"
              className="w-full h-full"
            >
              {isCategory ? isCategory : "카테고리"}
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed flex inset-0 items-center justify-center bg-transparent"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={(e) => {
                    e.stopPropagation(); // 내부 컨텐츠 클릭시 이벤트 버블링 방지 (기존 로직)
                  }}
                  className="fixed grid grid-cols-2 items-center justify-center  w-[200px] gap-2 border-2 bg-white p-4 rounded-lg z-50"
                  style={{
                    top: `${modalPosition.top}px`,
                    left: `${modalPosition.left}px`,
                  }}
                >
                  {category?.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => categorySelect(category.name)}
                      className="flex items-center justify-center border-2 rounded-xl p-1 hover:border-blue-400"
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {errors?.map((error, index) => (
        <span
          key={index}
          className="flex flex-col pt-4 pl-1 text-red-500 text-xs font-semibold"
        >
          {error}
        </span>
      ))}
    </div>
  );
}
