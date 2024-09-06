"use client";

import MessagesList from "@/app/_components/chats/message_list";
import TopNav from "@/app/_components/common/top_nav";
import { useUserInfo } from "@/app/hooks/user_info";

export default function ChatRoom() {
  const { data: user, isLoading, error } = useUserInfo();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !user) {
    return <p>Error loading user information.</p>;
  }

  return (
    <>
      <TopNav />

      <div>
        <MessagesList currentUserId={user.id.toString()} />
      </div>
    </>
  );
}
