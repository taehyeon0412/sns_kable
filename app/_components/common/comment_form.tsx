import { useState } from "react";
import TextArea from "./textarea";
import Image from "next/image";
import { formatToTimeAgo } from "@/app/_libs/_client/utils";

interface Comment {
  id: number;
  payload: string;
  created_at: Date;
  user: {
    username: string;
    profile_img: string;
  };
}

interface CommentFormProps {
  comments: Comment[];
}

export default function CommentForm({ comments }: CommentFormProps) {
  const [value, setValue] = useState("");

  console.log(comments);

  return (
    <>
      <div>
        <div className="w-full flex flex-col gap-2">
          <span>댓글 [ {comments.length} ]</span>
          <span className="w-full h-px bg-gray-300" />
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="px-4">
            <div className="flex items-start space-x-3 border-b mb-2">
              {comment.user.profile_img ? (
                <Image
                  src={`${comment.user.profile_img}`}
                  alt="profile image"
                  className="rounded-full w-8 h-8 bg-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="rounded-full size-8 bg-slate-400"></div>
              )}

              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {comment.user.username}
                </span>
                <span className="text-xs text-gray-500 block">
                  {formatToTimeAgo(comment.created_at.toString())}
                </span>
                <p className="text-gray-700 my-2">{comment.payload}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="my-5">
        <TextArea
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          name="comment"
          required
          placeholder="궁금한 점을 질문해 보세요!"
        />

        <button className="mt-2 w-full bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          댓글 입력 하기
        </button>
      </form>
    </>
  );
}
