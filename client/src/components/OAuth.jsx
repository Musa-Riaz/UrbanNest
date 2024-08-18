import React from 'react'
import {message} from 'antd';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase/firebase';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuth} from '../redux/features/userSlice';
import {  useNavigate } from "react-router-dom";
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () =>{
        try{

            const provider = new GoogleAuthProvider(); // Create a new instance of the Google provider object
            const auth = getAuth(app); // Get the Auth service for the default app
            const result  = await signInWithPopup(auth, provider); // Sign in with a popup
            console.log(result)

            const res = await axios.post("http://localhost:3500/api/v1/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                googleId: result.user.uid,
                avatar: result.user.photoURL
            }, {withCredentials: true});
            if(res.data.success){
                dispatch(setUser(res.data.user));
                dispatch(setAuth(true));
                localStorage.setItem("token", res.data.token);
                message.success("Successfully signed in with Google");
                navigate("/")
            }

        }
        catch(err){
            console.log(err);
            message.error("An error occurred. Please try again later.");
        }
    }

  return (
    <button className='mt-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600' type='button' onClick={handleGoogleClick}>
      Continue With Google
    </button>
  )
}

export default OAuth
