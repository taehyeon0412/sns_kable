import { useFollowAction } from "@/app/hooks/follow_action";
import { useState } from "react";
import Button from "./button";

interface FollowButtonProps {
  userId: number;
  initialIsFollowing: boolean;
}

export default function FollowButton({
  userId,
  initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { mutate } = useFollowAction(userId);

  /* console.log(isFollowing); */

  const onClickFollow = () => {
    // UI 낙관적 업데이트
    setIsFollowing((prev) => !prev);

    // mutation 실행 (서버에 팔로우 상태 변경 요청)
    mutate();
  };

  return (
    <Button
      onClick={onClickFollow}
      type="follow"
      text={`${isFollowing ? "팔로잉" : "팔로우"}`}
      className={`${isFollowing ? "bg-blue-900" : "bg-blue-400"}`}
    />
  );
}
