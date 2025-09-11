import axios from "axios";
const BASE = "http://localhost:8000/api/v1";


const token = localStorage.getItem('token');

export const loginUser = (payload) =>
  axios.post(`${BASE}/users/login`,payload).then((r) => r.data);

export const searchUsers = (query) =>
  axios.get(`${BASE}/users/search?query=${query}`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      },
    }).then((r) => r.data);

export const createConversation = (userId) =>
  axios.post(`${BASE}/conversations`, { userId },{
      headers: {
        Authorization: `Bearer ${token}`,   
      }}).then((r) => r.data);



export const getConversationsForUser = () =>
  axios.get(`${BASE}/conversations`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      }}).then((r) => r.data);

export const getMessagesForConversation = (conversationId) =>
  axios
    .get(`${BASE}/messages/conversation/${conversationId}`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      }})
    .then((r) => r.data);
