import React from 'react';

const ConversationList = ({ conversations, onOpen, activeConvo, currentUserId }) => {
  return (
    <div>
      <h4>Conversations</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {conversations.map(c => {
          const other = c.participants.find(p => p._id !== currentUserId) || {};
          return (
            <li key={c._id} style={{ padding: 8, borderBottom: '1px solid #eee', cursor: 'pointer', background: activeConvo && activeConvo._id === c._id ? '#fafafa' : 'transparent' }}
                onClick={() => onOpen(c)}>
              <div style={{ fontWeight: '600' }}>{other.name || 'Unknown'}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{c.lastMessage || 'No messages yet'}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationList;
