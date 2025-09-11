import React from 'react'
import { Navigate } from 'react-router';

const Authentication = ({children}) => {
    const token = localStorage.getItem('token');
  return (
    token ? children : <Navigate to='/' />
  )
}

export default Authentication