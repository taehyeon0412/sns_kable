import { cls, formatToTimeAgo } from "@/app/_libs/_client/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ItemsInfoProps } from "@/app/hooks/items_info";
import Loading from "./loading";

interface InfiniteScrollProps {
  data:
    | {
        pages: Array<ItemsInfoProps[]>;
      }
    | undefined;
  isLoading?: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export default function InfiniteScroll({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollProps) {
  const router = useRouter();

  //유저가 스크롤 내리면 자동으로 api를 불러오기 위해 useRef 사용
  const observerRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  //무한 스크롤 함수
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);

  //데이터 평탄화 : 데이터가 여러 페이지로 나뉘어 관리되기 때문에 하나의 단일 배열로 변환
  const flattenedItems = data?.pages.flat() || [];

  if (isLoading) {
    return <Loading />;
  }

  const onClickItem = (items: number) => {
    router.push(`/items/${items}`);
  };

  return (
    <>
      {flattenedItems.map((item, itemIndex) => (
        <div
          key={item.id}
          onClick={() => onClickItem(item.id)}
          className={cls(
            `wrapper flex flex-col gap-2 md:gap-4 md:grid md:grid-cols-10 md:py-4 px-2 md:px-0 hover:cursor-pointer ${
              itemIndex !== flattenedItems.length - 1
                ? "border-b border-gray-300"
                : ""
            }`
          )}
        >
          {/* 왼쪽 div 이미지, 하트,댓글 박스 */}
          <div className="h-full col-span-3 p-1 flex flex-col gap-6">
            <div className="relative bg-black w-full aspect-[16/9] md:h-32 rounded-xl">
              <Image
                src={item.image}
                alt="item_image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="hidden md:flex gap-2 mt-auto pl-2 justify-start items-center">
              <div>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="fill-none stroke-current text-gray-450 size-[18px]"
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
                  {item.heartCount}
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="fill-none stroke-current text-gray-450 size-[18px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.94756 19.0904L9.75061 18.9477L9.50736 18.9477L4.79985 18.9479C3.22579 18.948 1.94971 17.672 1.94971 16.0979L1.94974 4.80007C1.94974 3.22606 3.22573 1.95007 4.79974 1.95007L19.1997 1.95008C20.7737 1.95008 22.0497 3.22607 22.0497 4.80008L22.0497 16.0979C22.0497 17.672 20.7736 18.948 19.1995 18.9479L16.271 18.9477L15.5209 18.9476V19.6977V22.2482C15.5209 22.6157 15.1043 22.8282 14.8068 22.6126L9.94756 19.0904Z"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                  {item.Comment.length}
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽 div 본문 내용 */}
          <div className="px-1 h-full col-span-7 flex flex-col gap-4 md:gap-2">
            <div className="flex">
              <span className="text-xs text-gray-500 px-2 py-1 rounded-md border-none bg-slate-200">
                {item.category.name}
              </span>
            </div>

            <div>
              <span className="text-xl break-all line-clamp-2">
                {item.title}
              </span>
            </div>

            <div>
              <span className="text-gray-500 break-all line-clamp-3 whitespace-pre-line">
                {item.description}
              </span>
            </div>

            <div className="flex gap-2 mt-2 justify-start items-center">
              <div className="relative bg-slate-300 w-8 h-8 rounded-full">
                <Image
                  src={item.user.profile_img}
                  alt="user_profileImg"
                  fill
                  className="rounded-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex gap-1 justify-center items-center">
                <span className="text-sm text-gray-700">
                  {item.user.username}
                </span>
                <span className="text-xs text-slate-500">
                  {formatToTimeAgo(item.created_at.toString())}
                </span>
                <span className="text-xs text-slate-500">ㆍ</span>
                <span className="text-xs text-slate-500">
                  읽음 {item.views}
                </span>
              </div>
            </div>

            {/* 하트, 댓글 */}
            <div className="md:hidden flex gap-4 mt-auto justify-end items-center">
              <div>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="fill-none stroke-current text-gray-450 size-[18px]"
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
                  {item.heartCount}
                </span>
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="fill-none stroke-current text-gray-450 size-[18px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.94756 19.0904L9.75061 18.9477L9.50736 18.9477L4.79985 18.9479C3.22579 18.948 1.94971 17.672 1.94971 16.0979L1.94974 4.80007C1.94974 3.22606 3.22573 1.95007 4.79974 1.95007L19.1997 1.95008C20.7737 1.95008 22.0497 3.22607 22.0497 4.80008L22.0497 16.0979C22.0497 17.672 20.7736 18.948 19.1995 18.9479L16.271 18.9477L15.5209 18.9476V19.6977V22.2482C15.5209 22.6157 15.1043 22.8282 14.8068 22.6126L9.94756 19.0904Z"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                  {item.Comment.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* useRef로 참조한 요소 */}
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage ? <div>로딩중....</div> : null}
      </div>
    </>
  );
}

/*isFetchingNextPage =  다음 페이지 데이터를 불러오는 중인지 확인하는 것
    이게 있으면 불러오는 중일 때는 중복으로 요청하지 않음*/
