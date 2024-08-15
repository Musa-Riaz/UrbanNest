import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
const Profile = () => {

    const { isAuthorized } = useSelector((state) => state.user);
  return (<div>

        {isAuthorized ? <div>Profile</div> : <Navigate to= "/signin"/>}

         </div>
  )
}

export default Profile
