import MessagesList from "@/app/_components/chats/message_list";
import TopNav from "@/app/_components/common/top_nav";

export default function ChatRoom() {
  return (
    <>
      <TopNav />

      <div>
        <MessagesList />
      </div>
    </>
  );
}
