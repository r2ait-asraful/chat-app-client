import axios from "axios";
const BASE = "http://localhost:8000/api/v1";



export const loginUser = (payload) =>
  axios.post(`${BASE}/users/login`,payload).then((r) => r.data);

export const searchUsers = (query) =>
{  

    const token = localStorage.getItem('token');
    return axios.get(`${BASE}/users/search?query=${query}`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      },
    }).then((r) => r.data);}

export const createConversation = (userId) =>
  {
    
const token = localStorage.getItem('token');
    return axios.post(`${BASE}/conversations`, { userId },{
      headers: {
        Authorization: `Bearer ${token}`,   
      }}).then((r) => r.data);}



export const getConversationsForUser = () =>{ 
    const token = localStorage.getItem('token');
    return axios.get(`${BASE}/conversations`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      }}).then((r) => r.data);
}

export const getMessagesForConversation = (conversationId) =>
 {
    
const token = localStorage.getItem('token');
    return axios
    .get(`${BASE}/messages/conversation/${conversationId}`,{
      headers: {
        Authorization: `Bearer ${token}`,   
      }})
    .then((r) => r.data);}
