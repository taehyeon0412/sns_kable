import { useState } from "react";
import { useHeartAction } from "@/app/hooks/heart_action";

interface HeartButtonProps {
  itemId: number;
  initialIsHearted: boolean;
  initialHeartCount: number;
}

export default function HeartButton({
  itemId,
  initialIsHearted,
  initialHeartCount,
}: HeartButtonProps) {
  const [isHearted, setIsHearted] = useState(initialIsHearted);
  const [heartCount, setHeartCount] = useState(initialHeartCount);

  const { mutate } = useHeartAction(itemId);

  const onClickHeart = () => {
    //ui 낙관적 업데이트
    setIsHearted((prev) => !prev);
    setHeartCount((prev) => prev + (isHearted ? -1 : 1));

    // mutation 실행(서버에 하트 상태를 변경하는 요청을 보냄)
    mutate();
  };

  /*   console.log(isHearted);
  console.log(heartCount); */

  return (
    <div
      onClick={onClickHeart}
      className={`flex gap-1 justify-center items-center text-white py-2 px-2 md:px-4 rounded-lg hover:cursor-pointer hover:bg-blue-700 ${
        isHearted ? "bg-blue-400" : "bg-blue-500 "
      }`}
    >
      <svg
        className={`stroke-current ${
          isHearted ? "text-red-400 fill-red-400" : "text-white fill-none"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 21C11.8618 21.0008 11.7249 20.9741 11.597 20.9214C11.469 20.8687 11.3527 20.791 11.2546 20.6929L3.09719 12.455C2.07396 11.4123 1.5 10.0044 1.5 8.5373C1.5 7.07018 2.07396 5.66233 3.09719 4.61954C4.12843 3.58241 5.52534 3 6.98167 3C8.438 3 9.83492 3.58241 10.8662 4.61954L12 5.7631L13.1338 4.61954C14.1651 3.58241 15.562 3 17.0183 3C18.4747 3 19.8716 3.58241 20.9028 4.61954C21.926 5.66233 22.5 7.07018 22.5 8.5373C22.5 10.0044 21.926 11.4123 20.9028 12.455L12.7454 20.6929C12.6473 20.791 12.531 20.8687 12.403 20.9214C12.2751 20.9741 12.1382 21.0008 12 21Z"
          strokeWidth="1.5"
        ></path>
      </svg>

      <span className="text-white text-sm">{heartCount}</span>
    </div>
  );
}
