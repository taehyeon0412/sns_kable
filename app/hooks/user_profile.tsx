import { useQuery } from "react-query";

export interface UserProfileProps {
  id: number;
  username: string;
  email: string;
  profile_img: string;
  bio: string;
}

export function useUserProfile(id: number) {
  return useQuery<UserProfileProps>({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) {
        throw new Error("유저 정보를 불러오는데 실패했습니다.");
      }
      /* await new Promise((resolve) => setTimeout(resolve, 200000)); // 지연 */
      return response.json() as Promise<UserProfileProps>;
    },
    enabled: !!id, // username이 있을 때만 쿼리를 실행
  });
}
