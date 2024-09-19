import { useQuery } from "react-query";

interface User {
  id: number;
  username: string;
  profile_img?: string;
  isFollowing: boolean;
}

export function useFollowingList(userId?: number) {
  return useQuery<User[]>(
    ["followingList", userId],
    async () => {
      const response = await fetch(`/api/user/${userId}/follow`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "팔로우 목록을 불러오는 데 실패했습니다."
        );
      }

      const data = await response.json();
      return data.map((user: any) => ({
        ...user,
        isFollowing: user.isFollowing || false, // 팔로우 상태 초기화
      }));
    },
    {
      enabled: !!userId, // userId가 있을 때만 쿼리 실행
      initialData: [], // 초기값 설정
    }
  );
}
