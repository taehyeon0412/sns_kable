"use client";

import MessagesList from "@/app/_components/chats/message_list";
import TopNav from "@/app/_components/common/top_nav";
import { userInfo } from "@/app/hooks/user_info";

export default function ChatRoom() {
  const { data: user, isLoading, error } = userInfo();

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
        <MessagesList currentUserId={user.id.toString()}/>
      </div>
    </>
  );
}
