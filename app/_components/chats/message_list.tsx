"use client";

import { userInfo } from "@/app/hooks/user_info";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sendMessage, subscribeToMessages } from "./chat_service";

interface Message {
  id: string;
  content: string;
  senderId: string;
  sentAt: Date;
}

export default function MessagesList({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams(); // URL에서 chatId 가져오기
  const chatId = Array.isArray(id) ? id[0] : id; // 배열일 경우 첫 번째 값을 사용
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (messages) => {
      setMessages(messages);
      scrollToBottom(); // 새로운 메시지가 도착하면 스크롤을 맨 아래로 이동
    });

    return () => unsubscribe();
  }, [chatId]);

  const onClickSendMessage = async () => {
    if (chatId && newMessage.trim()) {
      await sendMessage(chatId, currentUserId, newMessage);
      setNewMessage(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClickBack = () => {
    router.push("/chats");
  };

  return (
    <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
      {/* 왼쪽 div */}
      <div className="bg-slate-300 hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center">
        <button
          onClick={onClickBack}
          className="mt-6 text-white border-transparent w-[80%] bg-blue-400 hover:bg-blue-600 border-2 rounded-md py-2"
        >
          뒤로 가기
        </button>
      </div>

      {/* 중앙 메인 div */}
      <div className="col-span-full md:col-span-8 flex flex-col gap-6 my-8 px-2">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 flex ${
                msg.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  msg.senderId === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs text-gray-500">
                  {msg.sentAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4"
          />
          <button
            onClick={onClickSendMessage}
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            전송
          </button>
        </div>
      </div>

      {/* 오른쪽 div */}
      <div className="bg-slate-300 hidden md:flex flex-col md:col-span-3 gap-3 ml-2" />
    </div>
  );
}
