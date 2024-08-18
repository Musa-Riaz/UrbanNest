import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {isAuthorized} = useSelector((state) => state.user);
    if(isAuthorized){
        return children;
    }
  return (
    <Navigate to = "/signin" />
  )
}

export default PrivateRoute
