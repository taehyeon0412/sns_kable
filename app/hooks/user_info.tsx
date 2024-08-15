import { useQuery } from "react-query";

export interface User {
  id: number;
  username: string;
  email: string;
  profile_img: string;
  kakao_id?: string;
  github_id?: string;
}

export function userInfo() {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("유저를 불러오는데 실패했습니다. hook 오류");
      }
      return response.json() as Promise<User>;
    },
  });
}
