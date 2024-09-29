import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export function useLogout() {
  const router = useRouter();

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://sns-kable.vercel.app"
      : "http://localhost:3000";

  return useMutation(
    async () => {
      const response = await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("로그아웃 실패!");
      }
    },
    {
      onSuccess: () => {
        // 로그아웃 성공 시 홈페이지로 리다이렉트
        router.push("/");
      },
      onError: (error) => {
        console.error("Logout error:", error);
      },
    }
  );
}
