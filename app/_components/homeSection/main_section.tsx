import { useItemsInfo } from "@/app/hooks/items_info";
import InfiniteScroll from "../common/infiniteScroll/infinite_scroll";
import Loading from "../common/infiniteScroll/loading";

export default function MainSection() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useItemsInfo();

  /* if (isLoading) {
    return <Loading />;
  } */

  return (
    <InfiniteScroll
      data={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  ); /* null; */
}

/*isFetchingNextPage =  다음 페이지 데이터를 불러오는 중인지 확인하는 것
    이게 있으면 불러오는 중일 때는 중복으로 요청하지 않음*/
