import Image from "next/image";

export default function ChatList() {
  return (
    <div
      className="flex px-4 cursor-pointer py-3 items-center space-x-3"
    >
      <div className="relative w-14 h-12 rounded-full bg-slate-300">
        <Image
          className="bg-cover rounded-full w-12 h-12"
          src={""}
          alt="profile"
          fill
        />
      </div>

      <div className="w-full">
        <p className=" text-gray-700">유저 닉네임</p>
        <div className="flex justify-between *:text-sm font-medium text-gray-500 ">
          <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px] sm:max-w-[350px]">
            마지막 메세지
          </span>
          <span>업데이트 시간</span>
        </div>
      </div>
    </div>
  );
}
