import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export function useLogout() {
  const router = useRouter();

  return useMutation(
    async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
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
