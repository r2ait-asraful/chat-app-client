import React, { useEffect, useState, useRef } from "react";
import { getMessagesForConversation } from "../api";
import { useParams } from "react-router";
import { dummyConversations, dummyMessages } from "../dummy";
import { getSocket } from "../../socket";



const ChatWindow = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef();

  const [conversation, setConversation] = useState({});


  const messagesFunc = async (conversationId) => {
    const data = await getMessagesForConversation(conversationId);
    setConversation(data?.data)
    console.log(data.messages);
    setMessages(data?.messages)
  }

const socket = getSocket();
  // get previous messages and join room
  useEffect(() => {
    // fetch old messages + join room
    messagesFunc(id)

    if (socket) {
      socket.emit("join_conversation", id);
    }
  }, [id]);

// Listen for new messages
useEffect(() => {
  if (!socket) return;

  const handler = (msg) => {
    console.log("new message:", msg);

    // ✅ update UI when message comes
    if (msg.conversation.toString() === id.toString()) {
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("new_message", handler);
  return () => socket.off("new_message", handler);
}, [socket, id]);

console.log(messages);

// Send message
const sendMessage = (e) => {
  e.preventDefault();
  if (!text.trim()) return;

  socket.emit("send_message", {
    conversationId: id,
    text: text.trim(),
  });

  setText("");
};


  // const other =
  //   conver.participants.find((p) => p._id !== currentUser._id) || {};

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white shadow-sm">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {conversation?.name || "U"}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{conversation?.name}</div>
          <div className="text-xs text-gray-500">{conversation?.email}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
        {messages.map((m) => (
          <div
            key={m?._id || Math.random()}
            // className={`flex ${m?.sender?._id === currentUser?._id ? "justify-end" : "justify-start"
            //   }`}
          >
            <div
              // className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${m?.sender?._id === currentUser?._id
              //     ? "bg-blue-600 text-white rounded-br-none"
              //     : "bg-white text-gray-800 rounded-bl-none"
              //   }`}
            >
              <p className="text-sm">{m.text}</p>
              <div className="text-[10px] mt-1 text-gray-400 text-right">
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 border-t bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>

  );
};

export default ChatWindow;
