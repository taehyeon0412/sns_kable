import { db } from "@/app/_libs/config/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

//채팅방을 생성하거나 가져오는 함수
export async function getOrCreateChat(
  currentUserId: string,
  otherUserId: string,
  currentUserName: string,
  currentUserImage: string,
  otherUserName: string,
  otherUserImage: string,
) {
  // 사용자 ID를 정렬하여 일관된 채팅 ID 생성
  const chatId = [currentUserId, otherUserId].sort().join("_");
  const chatRef = doc(db, "chats", chatId);

  try {
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      // 채팅방이 존재하지 않으면 새로 생성
      await setDoc(chatRef, {
        participants: [currentUserId, otherUserId],
        createdAt: serverTimestamp(),
        lastMessage: "",
        lastChatTime: serverTimestamp(),
        // 사용자 정보 저장
        userInfo: {
          [currentUserId]: {
            userName: currentUserName,
            userImage: currentUserImage,
          },
          [otherUserId]: {
            userName: otherUserName,
            userImage: otherUserImage,
          },
        },
      });
    }

    return chatId;
  } catch (error) {
    console.error("채팅을 가져오거나 만드는 중 오류 발생:", error);
    throw error;
  }
}

// 메시지를 실시간으로 구독하는 함수
export function subscribeToMessages(
  chatId: string,
  callback: (messages: any[]) => void,
) {
  const q = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("sentAt", "asc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        sentAt: doc.data().sentAt?.toDate() || new Date(), // Firebase 타임스탬프를 JS Date 객체로 변환
      }));
      callback(messages);
    },
    (error) => {
      console.error("메시지 실시간 구독 오류:", error);
    },
  );
}

// 메시지를 전송하는 함수
export async function sendMessage(
  chatId: string,
  senderId: string,
  content: string,
) {
  if (content.trim() === "") return; // 빈 메시지는 무시

  // 메시지를 Firestore에 추가
  try {
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      content,
      senderId,
      sentAt: serverTimestamp(),
    });

    // 채팅 문서의 lastMessage와 lastChatTime 업데이트
    await setDoc(
      doc(db, "chats", chatId),
      {
        lastMessage: content,
        lastChatTime: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
