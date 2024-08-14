import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/app/hooks/users";
import { useRouter } from "next/navigation";
import ProfileModal from "../profile_modal";
import Kable_name from "@/public/asset/kable.name.png";

interface NavKind {
  kind?: "default" | "upload";
}

export default async function TopNav({ kind = "default" }: NavKind) {
  const user = await getUser();

  return (
    //네비게이션바
    <nav className="layout_px fixed top-0 left-0 w-full h-16 bg-orange-400 flex items-center justify-between px-4 z-50">
      {/* 로고 */}
      <div className="text-white font-bold text-xl md:text-2xl w-32 ">
        <Link
          href="/home"
          className="absolute h-20 md:h-24 -top-3 md:-top-5 py-4 px-20"
        >
          <Image src={Kable_name} alt="KABLE logo" layout="fill" />
        </Link>

        <div className="h-full w-full py-4 px-10" />
      </div>

      {kind === "default" ? (
        <>
          {/* 메뉴 */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 *:px-4">
            <Link href="/home" className="text-white">
              홈
            </Link>

            <Link href="/category" className="text-white">
              카테고리
            </Link>

            <Link href="following" className="text-white">
              팔로윙
            </Link>

            <Link href="#" className="text-white">
              좋아요
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Link href="#" className="text-white">
              메뉴
            </Link>
          </div>

          {/* 검색, 프로필 */}
          <div className="flex items-center space-x-8">
            <div className="text-white w-8 h-8 hover:cursor-pointer">
              {/* 돋보기 */}
              <svg
                className="w-full h-full"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7479 12.8156C17.0072 12.8833 15.4353 13.5043 14.5944 14.3454C14.2039 14.736 13.5707 14.736 13.1802 14.3455C12.7896 13.9551 12.7895 13.3219 13.18 12.9313C14.4774 11.6337 16.5888 10.8981 18.6701 10.8171C20.765 10.7356 23.0521 11.3092 24.6538 12.9112C25.0442 13.3017 25.0442 13.9349 24.6536 14.3254C24.2631 14.7159 23.6299 14.7158 23.2394 14.3253C22.1484 13.234 20.4749 12.7484 18.7479 12.8156Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.9355 27.3841C30.8475 25.1207 32 22.1949 32 19C32 11.8203 26.1797 6 19 6C11.8203 6 6 11.8203 6 19C6 26.1797 11.8203 32 19 32C22.1949 32 25.1207 30.8475 27.3841 28.9355L27 31.1442L34.5137 38.6579L38.6579 34.5137L31.1442 27L28.9355 27.3841ZM19 29C24.5228 29 29 24.5228 29 19C29 13.4772 24.5228 9 19 9C13.4772 9 9 13.4772 9 19C9 24.5228 13.4772 29 19 29Z"
                  fill="white"
                />
                <path
                  d="M35.9279 40.0721L40.0721 35.9279L41.4278 37.2837C42.1907 38.0466 42.1907 39.2835 41.4278 40.0464L40.0464 41.4278C39.2835 42.1907 38.0466 42.1907 37.2837 41.4278L35.9279 40.0721Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* 유저 프로필 이미지 */}

            <div className="relative hover:cursor-pointer">
              <div className="relative w-10 h-10 bg-transparent rounded-full">
                {user?.profile_img ? (
                  <Image
                    src={user?.profile_img}
                    alt="profile image"
                    className="rounded-full w-10 h-10 bg-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-300" />
                )}
              </div>

              {/* 모달창 */}
              <div className="absolute top-0 w-full h-full rounded-full bg-transparent z-50">
                <ProfileModal
                  name={user.username}
                  email={
                    user.email ||
                    (user.kakao_id
                      ? `카카오: ${user.kakao_id}`
                      : user.github_id
                      ? `깃허브: ${user.github_id}`
                      : "")
                  }
                  profileImg={user.profile_img}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex lg:mr-12 xl:mr-16">
          <button className="py-2 px-4 border-2 border-white bg-white text-gray-700 hover:border-gray-700 hover:bg-gray-700 hover:text-white  rounded-lg">
            작성하기
          </button>
          <div className="hidden md:flex w-16"></div>
        </div>
      )}
    </nav>
  );
}
