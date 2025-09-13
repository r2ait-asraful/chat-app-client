import React, { useEffect, useState } from "react"; 
import { Outlet } from "react-router";
import { initSocket } from "../socket";

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('hello');
      initSocket(token);  
    }
  }, []);
  return (
   <Outlet />
 );
};

export default App;
