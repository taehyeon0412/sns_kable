"use client";

import CategoryDiv from "@/app/_components/common/category_div";
import Input from "@/app/_components/common/input";
import TextArea from "@/app/_components/common/textarea";
import TopNav from "@/app/_components/common/top_nav";
import { cls, MB } from "@/app/_libs/_client/utils";
import { useRef, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { uploadItem } from "./action";
import Button from "@/app/_components/common/button";

export default function Upload() {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, action] = useFormState(uploadItem, null);

  //파일 크기 검사
  const isOversizeImage = (file: File): boolean => {
    if (file.size > 5 * MB) {
      alert("파일 크기가 5MB를 초과했습니다.");
      return true;
    }
    return false;
  };

  //사진 추가 로직
  // 이벤트에서 파일 목록을 가져옴
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (!files) {
      return;
    }
    // 파일 목록에서 첫 번째 파일을 가져옴
    const file = files[0];

    // 파일 타입 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (isOversizeImage(file)) {
      return;
    }

    //파일을 임시 URL로 만들어줌
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  //이미지 미리보기 삭제 로직
  const removeImage = () => {
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //form의 pending 상태를 감지
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    startTransition(() => {
      action(new FormData(event.currentTarget)); // 폼 데이터로 action 실행
    });
  };

  console.log("image Errors:", state?.fieldErrors.image);

  return (
    <>
      <TopNav kind="upload" />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-12 w-full min-h-screen">
        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 "></div>

        {/* 본문 */}
        <div className="col-span-full md:col-span-8 ">
          <form
            id="uploadForm"
            onSubmit={handleSubmit}
            action={action}
            className="relative px-4 pt-4 mb-5 h-full"
          >
            <button
              type="submit"
              disabled={isPending}
              className={cls(
                "absolute right-2 md:-right-8 -top-14 py-2 px-4 border-2 border-gray-700 bg-gray-700 text-white rounded-lg  z-[51]",
                isPending
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-900 hover:border-blue-900"
              )}
            >
              {isPending ? "업로드 중.." : "작성 하기"}
            </button>

            <div>
              <div>
                {/* label로 input을 감싸고 hidden으로 input을 감춰주면 이쁜 input이 된다 */}
                <label
                  className="w-full text-gray-600 hover:cursor-pointer hover:border-blue-400 hover:text-blue-500 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-60 sm:h-96  rounded-md bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${preview})` }}
                >
                  {preview === "" ? (
                    <>
                      <svg
                        className="h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>사진을 추가해주세요.</span>
                      <span className="text-red-500">
                        {state?.fieldErrors.image}
                      </span>
                    </>
                  ) : null}

                  <input
                    onChange={onImageChange}
                    name="image"
                    className="hidden z-30"
                    type="file"
                    accept="image/*"
                  />
                </label>

                {preview === "" ? null : (
                  <button
                    onClick={removeImage}
                    className="z-40 absolute top-4 right-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-6 h-6 bg-slate-700 rounded-full hover:bg-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <CategoryDiv errors={state?.fieldErrors.category} />

              <Input
                label="제목"
                name="title"
                type="text"
                placeholder="제목"
                errors={state?.fieldErrors.title}
              />

              <div className="mt-5 pb-20 block text-sm font-medium">
                <TextArea
                  name="description"
                  label="내용"
                  labelName="textArea"
                  errors={state?.fieldErrors.description}
                />
              </div>
            </div>

            {isPending ? (
              <div className="fixed flex inset-0 items-center justify-center bg-black opacity-50 z-[99]">
                <span className="text-white">업로드 중...</span>
              </div>
            ) : null}
          </form>
        </div>

        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 ">
          <div className="flex flex-col">
            <span>글 작성 Tip!</span>
            <span>1.카테고리에 맞는 사진을 추가하세요</span>
            <span>2.제목을 입력하세요</span>
            <span>3.내용을 입력하세요</span>
          </div>
        </div>
      </div>
    </>
  );
}
