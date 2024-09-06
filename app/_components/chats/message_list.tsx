"use client";

import { userInfo } from "@/app/hooks/user_info";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sendMessage, subscribeToMessages } from "./chat_service";
import { enterKeyPress } from "@/app/_libs/_client/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  sentAt: Date;
  showDate?: boolean;
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

    const unsubscribe = subscribeToMessages(chatId, (fetchedMessages) => {
      //메세지 날짜 계산 로직
      //첫번째 메세지일 때, 날짜가 변경됐을 때 true가 나옴
      const processedMessages = fetchedMessages.map((msg, index) => {
        const showDate =
          index === 0 ||
          formatDate(fetchedMessages[index - 1].sentAt) !==
            formatDate(msg.sentAt);

        return { ...msg, showDate };
      });

      setMessages(processedMessages);
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

  //채팅 시작해면 스크롤 밑으로 내려가 있게 함 useRef 추적
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClickBack = () => {
    router.push("/chats");
  };

  //Date를 yyyy-mm-dd 형식으로 표시
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  //Date를 HH:MM 형식으로 표시
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="nav_h layout_px grid grid-cols-1 md:grid-cols-14 w-full min-h-screen">
      {/* 왼쪽 div */}
      <div className=" hidden gap-2 px-2 md:flex md:flex-col xl:flex-row md:col-span-3 items-center xl:items-start xl:justify-center">
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
            <div key={msg.id}>
              {/* 날짜 계산해서 변경되었으면 showDate = true */}
              {msg.showDate && (
                <div className="relative pt-4">
                  {/* 중간 라인 선 */}
                  <div className="absolute w-full border-b border-gray-300" />
                  <div className="relative flex justify-center -top-4 text-center">
                    <span className="text-gray-500 bg-white text-xs my-2 px-2">
                      {formatDate(msg.sentAt)}
                    </span>
                  </div>
                </div>
              )}
              <div
                className={`mb-2 flex ${
                  msg.senderId === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.senderId === currentUserId
                      ? "bg-blue-400 text-gray-50"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div
                    className={`flex text-xs w-full ${
                      msg.senderId === currentUserId
                        ? "justify-end text-gray-700"
                        : "justify-start text-gray-500"
                    }`}
                  >
                    {formatTime(msg.sentAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative flex mt-auto justify-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요."
            onKeyDown={(e) => enterKeyPress(e, onClickSendMessage)}
            className="h-10 px-6 shadow-sm w-[90%] md:w-full rounded-2xl border-2 border-gray-300 focus:ring-blue-500 focus:outline-none focus:border-blue-500 pr-12 placeholder:text-sm"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-8 md:right-0">
            <button
              onClick={onClickSendMessage}
              className="flex focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none items-center bg-blue-500 rounded-full px-3 hover:bg-blue-600 cursor-pointer text-sm text-white"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽 div */}
      <div className=" hidden md:flex flex-col md:col-span-3 gap-3 ml-2" />
    </div>
  );
}
