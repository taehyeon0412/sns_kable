import { useRouter } from "next/navigation";

export default function LeftSection() {
  const router = useRouter();

  const onClickUpload = () => {
    router.push("/items/upload");
  };

  const onClickChats = () => {
    router.push("/chats");
  };

  return (
    <>
      <button
        onClick={onClickUpload}
        className="mt-6 text-white border-transparent w-[80%] bg-blue-400 hover:bg-blue-600 border-2 rounded-md py-2"
      >
        새 글쓰기
      </button>
      <button
        onClick={onClickChats}
        className="xl:mt-6 text-white border-transparent w-[80%] bg-blue-400 hover:bg-blue-600 border-2 rounded-md py-2"
      >
        채팅 하기
      </button>
    </>
  );
}
