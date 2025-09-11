import { createBrowserRouter } from "react-router";
import App from "../App"; 
import Login from "../pages/Login";
import Conversations from "../pages/Conversations";
import ChatWindow from "../pages/ChatWindow";
import Unauth from "../middlewares/Unauth";
import Authentication from "../middlewares/authentication";
 



const Router = createBrowserRouter([
    {
        path : '/',
        Component : App,
        children :[
            { 
               index : true,
               element : <Unauth > <Login /> </Unauth> ,
            },
            { 
               path : 'conversations',
               element : <Authentication > <Conversations /> </Authentication> ,
            },
            { 
               path : 'conversations/messages/:id',
               element :<Authentication > <ChatWindow /> </Authentication>,
            },

        ]
    }
]) 
export default Router;