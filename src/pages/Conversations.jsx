import React, { useState, useEffect } from "react";
import SearchUsers from "./SearchUsers";
import { useNavigate } from "react-router";
import { getConversationsForUser } from "../api";
import { getSocket } from "../../socket";



const ConversationsPage = () => {
  const [convos, setConvos] = useState([]);

  const navigate = useNavigate();

  const conversations = async () => {
    try {
      const data = await getConversationsForUser()
      setConvos(data?.list)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    conversations()
  }, []);

  const socket = getSocket();
  
  // useEffect(() => {
  //   const socket = getSocket();
  //   if (!socket) return;

  //   // Ask server for my conversations
  //   socket.emit("get_conversations");

  //   // Listen for updated list
  //   socket.on("conversations_list", (list) => {
  //     console.log('list',list);
  //     // setConvos(list);
  //   });

  //   return () => {
  //     socket.off("conversations_list");
  //   };
  // }, []);


  // 🔹 Listen for new conversation from server
  
  useEffect(() => {
    if (!socket) return;
    socket.on("conversation_created", (convo) => {
      setConvos((prev) => {
        const exists = prev.find((c) => c._id === convo._id);
        return exists ? prev : [convo.data, ...prev];
      });
    });

    return () => socket.off("conversation_created");
  }, [socket]);



  return (
    <div>

      <SearchUsers />
      {/* Conversations List */}
      <h3 className="text-sm font-semibold mb-3 text-gray-600 px-2">
        Conversations
      </h3>
      <ul className="space-y-1">
        {convos.map((c) => {

          return (
            <li
              key={c?.conversation}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition"
              onClick={() => navigate(`/conversations/messages/${c.conversation}`)}

            >
              {/* Avatar */}
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {c?.friend?.name || "U"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 truncate">
                    {c?.friend?.name}
                  </span>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">
                    {new Date(c.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {c?.lastMessage || "No messages yet"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationsPage;
