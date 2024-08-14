import TopNav from "@/app/_components/common/top_nav";

export default function Upload() {
  return (
    <>
      <TopNav kind="upload" />

      <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-12 w-full min-h-screen">
        <div className="hidden md:flex flex-col md:col-span-2 bg-red-100">
          <span>첫번째 칼럼입니다.</span>
          <span>첫번째 칼럼입니다.</span>
        </div>
        <div className="col-span-full md:col-span-8 ">
          <span>두번째 칼럼입니다.</span>
          <span>두번째 칼럼입니다.</span>
        </div>
        <div className="hidden md:flex flex-col md:col-span-2 bg-gray-400">
          <span>세번째 칼럼입니다.</span>
          <span>세번째 칼럼입니다.</span>
        </div>
      </div>
    </>
  );
}
