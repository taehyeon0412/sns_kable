import { useRankedItems } from "@/app/hooks/ranked_items";
import { useRouter } from "next/navigation";

export default function RightSection() {
  const { data: rankedItems } = useRankedItems();
  const router = useRouter();

  const rankClicked = (itemId: number) => {
    router.push(`items/${itemId}`);
  };

  return (
    <>
      <span className="flex mt-10 w-full justify-center">
        지금 인기있는 글 🔥
      </span>

      <div className="flex gap-2 justify-start">
        <div className="flex flex-col gap-2 justify-center *:text-sm">
          {rankedItems?.map((item, index) => (
            <div
              key={item.id}
              onClick={() => rankClicked(item.id)}
              className="flex gap-2 border-2 p-2 rounded-lg border-blue-200 hover:cursor-pointer"
            >
              <span className="text-xs text-gray-600">{index + 1}. </span>
              <span className="line-clamp-3 text-gray-800">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
