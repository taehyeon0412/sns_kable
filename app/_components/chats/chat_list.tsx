"use client";

import { db } from "@/app/_libs/config/firebaseConfig";
import Image from "next/image";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage: string;
  lastChatTime: Date;
  userInfo: Record<string, { userName: string; userImage: string }>;
  otherUserInfo: { userName: string; userImage: string } | null;
}

export default function ChatList({ currentUserId }: { currentUserId: string }) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUserId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => {
        const data = doc.data();
        const otherUserId = data.participants.find(
          (id: string) => id !== currentUserId
        );
        const otherUserInfo = otherUserId ? data.userInfo[otherUserId] : null;

        return {
          id: doc.id,
          participants: data.participants,
          lastMessage: data.lastMessage,
          lastChatTime: data.lastChatTime?.toDate() || new Date(),
          userInfo: data.userInfo, // 내 정보
          otherUserInfo, //상대 정보
        };
      });
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  const goToChat = (chatId: string) => {
    router.push(`/chats/${chatId}`);
  };

  return (
    <>
      {chatRooms.length > 0 ? (
        <div className="pb-4 border-b">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className="flex px-4 cursor-pointer py-3 items-center space-x-3 "
              onClick={() => goToChat(room.id)}
            >
              <div className="relative w-14 h-12 rounded-full bg-slate-300">
                {room.otherUserInfo?.userImage ? (
                  <Image
                    src={room.otherUserInfo.userImage}
                    alt={room.otherUserInfo.userName}
                    className="w-14 h-12 rounded-full"
                    fill
                  />
                ) : (
                  <div className="relative w-14 h-12 rounded-full bg-slate-300"></div>
                )}
              </div>

              <div className="w-full">
                <p className="text-gray-700 text-sm">
                  {room.otherUserInfo?.userName}
                </p>

                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px] sm:max-w-[350px]">
                    {room.lastMessage}
                  </span>

                  <span className="text-xs">
                    {room.lastChatTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full justify-center items-center border-2 h-28 rounded-md">
          채팅 내역이 없습니다. 👀
        </div>
      )}
    </>
  );
}
