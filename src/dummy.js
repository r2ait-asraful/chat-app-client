// dummyConversations.js
export const dummyConversations = [
  {
    _id: "c1",
    participants: [
      { _id: "u1", name: "Alice Johnson", email: "alice@example.com" },
      { _id: "u2", name: "Bob Smith", email: "bob@example.com" },
    ],
    lastMessage: "Hey, are you coming to the meeting?",
    updatedAt: "2025-09-11T09:30:00Z",
  },
  {
    _id: "c2",
    participants: [
      { _id: "u1", name: "Alice Johnson", email: "alice@example.com" },
      { _id: "u3", name: "Charlie Brown", email: "charlie@example.com" },
    ],
    lastMessage: "Let’s finalize the report today.",
    updatedAt: "2025-09-10T18:45:00Z",
  },
  {
    _id: "c3",
    participants: [
      { _id: "u1", name: "Alice Johnson", email: "alice@example.com" },
      { _id: "u4", name: "Diana Prince", email: "diana@example.com" },
    ],
    lastMessage: "Sure, I’ll send it over.",
    updatedAt: "2025-09-09T13:10:00Z",
  },
];


export const dummyMessages = [
  {
    _id: "m1",
    conversation: "c1",
    sender: { _id: "u1", name: "Alice Johnson" },
    text: "Hey Bob! How are you?",
    createdAt: "2025-09-11T09:05:00Z",
  },
  {
    _id: "m2",
    conversation: "c1",
    sender: { _id: "u2", name: "Bob Smith" },
    text: "Hi Alice 👋 I’m good, just working on the project.",
    createdAt: "2025-09-11T09:06:30Z",
  },
  {
    _id: "m3",
    conversation: "c1",
    sender: { _id: "u1", name: "Alice Johnson" },
    text: "That’s great! Did you finish the report?",
    createdAt: "2025-09-11T09:07:10Z",
  },
  {
    _id: "m4",
    conversation: "c1",
    sender: { _id: "u2", name: "Bob Smith" },
    text: "Almost, I’ll send it over by this afternoon.",
    createdAt: "2025-09-11T09:08:45Z",
  },
  {
    _id: "m5",
    conversation: "c1",
    sender: { _id: "u1", name: "Alice Johnson" },
    text: "Perfect. Thanks a lot 🙌",
    createdAt: "2025-09-11T09:09:20Z",
  },
];
