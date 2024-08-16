"use client";

import CategoryDiv from "@/app/_components/common/category_div";
import Input from "@/app/_components/common/input";
import TextArea from "@/app/_components/common/textarea";
import TopNav from "@/app/_components/common/top_nav";
import { useState } from "react";

export default function Upload() {
  const [preview, setPreview] = useState("");

  return (
    <>
      <TopNav kind="upload" />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-12 w-full min-h-screen">
        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 bg-red-100"></div>

        {/* 본문 */}
        <div className="col-span-full md:col-span-8 ">
          <form
            /* action={action} */ className="relative px-4 pt-4 mb-5 h-full"
          >
            <div>
              <div>
                {/* label로 input을 감싸고 hidden으로 input을 감춰주면 이쁜 input이 된다 */}
                <label
                  className="w-full text-gray-600 hover:cursor-pointer hover:border-orange-500 hover:text-orange-500 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-60 sm:h-96  rounded-md bg-contain bg-center bg-no-repeat"
                  /* style={{ backgroundImage: `url(${preview})` }} */
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
                      {/* {state?.fieldErrors.photo} */}
                    </>
                  ) : null}

                  <input
                    /*  onChange={onImageChange} */
                    name="photo"
                    className="hidden z-30"
                    type="file"
                    accept="image/*"
                    required
                  />
                </label>

                {preview === "" ? null : (
                  <button
                    /*  onClick={removeImage} */
                    className="z-40 absolute top-4 right-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-6 h-6 bg-black rounded-full"
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

              <CategoryDiv />

              <Input
                /* required */
                label="제목"
                name="title"
                type="text"
                placeholder="제목"
                /* errors={state?.fieldErrors.title} */
              />

              <div className="mt-5 pb-20 block text-sm font-medium">
                <TextArea
                  /* required */
                  name="description"
                  label="내용"
                  labelName="textArea"
                  /* errors={state?.fieldErrors.description} */
                />
              </div>
            </div>
          </form>
        </div>

        {/* 사이드 */}
        <div className="hidden md:flex flex-col md:col-span-2 bg-gray-400"></div>
      </div>
    </>
  );
}
