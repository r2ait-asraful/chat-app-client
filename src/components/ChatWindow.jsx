import React, { useEffect, useState, useRef } from 'react';
import { getMessagesForConversation } from '../api';

const ChatWindow = ({ socket, conversation, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const convoRoom = `conversation_${conversation._id}`;
  const listRef = useRef();

  useEffect(() => {
    const init = async () => {
      const msgs = await getMessagesForConversation(conversation._id);
      setMessages(msgs);
      // join conversation room
      socket.emit('join_conversation', conversation._id);
    };
    init();

    // handle incoming messages
    const handleNewMessage = (msg) => {
      if (msg.conversation === conversation._id || msg.conversation._id === conversation._id) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on('new_message', handleNewMessage);
    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [conversation._id, socket]);

  useEffect(() => {
    // scroll to bottom on messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const payload = { conversationId: conversation._id, senderId: currentUser._id, text: text.trim() };
    // emit to server — server persists and emits to room
    socket.emit('send_message', payload);
    setText('');
    // optimistic UI: optionally push a local message (but server will emit back)
  };

  const participantsNames = conversation.participants.map(p => p.name).join(', ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ borderBottom: '1px solid #eee', padding: 12 }}>
        <strong>{participantsNames}</strong>
      </div>

      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {messages.map(m => (
          <div key={m._id || Math.random()} style={{ marginBottom: 10, display: 'flex', flexDirection: currentUser._id === (m.sender._id || m.sender) ? 'row-reverse' : 'row' }}>
            <div style={{ maxWidth: '70%', padding: 10, borderRadius: 8, background: currentUser._id === (m.sender._id || m.sender) ? '#DCF8C6' : '#fff', boxShadow: '0 0 0 1px #eee' }}>
              <div style={{ fontSize: 12, color: '#555' }}>{m.sender?.name}</div>
              <div style={{ marginTop: 6 }}>{m.text}</div>
              <div style={{ fontSize: 10, color: '#999', marginTop: 6 }}>{new Date(m.createdAt).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '8px 10px' }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
