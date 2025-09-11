import React from 'react'
import { Navigate } from 'react-router';

const Unauth = ({children}) => {
const token = localStorage.getItem('token');
  return (
    !token  ?  children : <Navigate to='/conversations' />
  )
}

export default Unauth