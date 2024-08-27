import { useState } from "react";
import TextArea from "./textarea";
import Image from "next/image";
import { cls, formatToTimeAgo } from "@/app/_libs/_client/utils";
import { useCreateComment } from "@/app/hooks/comment_action";
import Button from "@/app/_components/common/button";
import DeleteDiv from "./delete_div";

interface Comment {
  id: number;
  payload: string;
  created_at: Date;
  user: {
    id: string;
    username: string;
    profile_img: string;
  };
}

interface CommentFormProps {
  comments: Comment[];
  itemId: number;
  userId: number;
}

export default function CommentForm({
  comments,
  itemId,
  userId,
}: CommentFormProps) {
  const [value, setValue] = useState("");
  const createComment = useCreateComment(itemId);
  const [isPending, setIsPending] = useState(false);

  const onClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim()) {
      setIsPending(true); // 버튼을 비활성화
      createComment.mutate(
        { payload: value, userId: userId },
        {
          onSuccess: () => {
            setValue("");
          },
          onSettled: () => {
            setIsPending(false); // 버튼 다시 활성화
          },
        }
      );
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex flex-col gap-2">
          <span>댓글 [ {comments.length} ]</span>
          <span className="w-full h-px bg-gray-300" />
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="px-4 pt-6">
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

              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm block font-medium text-gray-700">
                    {comment.user.username}
                  </span>

                  {Number(comment.user.id) === userId && (
                    <div className="flex gap-2">
                      <Button type="itemModify" text="수정" />
                      <DeleteDiv
                        type="comment"
                        itemId={itemId}
                        commentId={comment.id}
                      />
                    </div>
                  )}
                </div>

                <span className="text-xs text-gray-500 block">
                  {formatToTimeAgo(comment.created_at.toString())}
                </span>
                <p className="text-gray-700 my-2 whitespace-pre-line">
                  {comment.payload}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onClick={onClick} className="my-5">
        <TextArea
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          name="comment"
          required
          placeholder="궁금한 점을 질문해 보세요!"
        />

        <button
          type="submit"
          disabled={isPending}
          className={cls(
            "mt-3 w-full h-10 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none",
            isPending ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-600"
          )}
        >
          {isPending ? "댓글 입력 중.." : "댓글 입력 하기"}
        </button>
      </form>
    </>
  );
}
