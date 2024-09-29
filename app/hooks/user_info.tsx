import { useQuery } from "react-query";

export interface User {
  id: number;
  username: string;
  email: string;
  profile_img: string;
  kakao_id?: string;
  github_id?: string;
}

export function useUserInfo() {
  //베이스 url 설정
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sns-kable.vercel.app"
      : "http://localhost:3000";

  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/user`, {
        credentials: "include", // 인증 정보를 포함하여 요청
      });
      if (!response.ok) {
        throw new Error("유저를 불러오는데 실패했습니다. hook 오류");
      }
      return response.json() as Promise<User>;
    },
  });
}
