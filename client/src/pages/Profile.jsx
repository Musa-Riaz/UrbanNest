import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { message } from "antd";
const Profile = () => {
  const { isAuthorized } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {isAuthorized ? (
        <>
          <h1 className="text-center text-6xl font-bold my-7">Profile</h1>

          <form className="flex-col flex justify-center items-center ">
            <img
              src={user.avatar}
              alt="user_avatar"
              className="mt-2 h-44 w-44 rounded-full object-cover hover:cursor-pointer "
            />
            <input
              id="name"
              type="text"
              placeholder="username"
              className="border p-3 mt-3 rounded-lg w-96 "
            />
            <input
              id="email"
              type="email"
              placeholder="email"
              className="border p-3 mt-3 rounded-lg w-96"
            />
            <input
              id="password"
              type="text"
              placeholder="password"
              className="border p-3 mt-3 rounded-lg w-96"
            />
            <button className="mt-2 bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95  w-96">
              Update
            </button>
          </form>
          <div className="flex justify-evenly mt-5 ">
            <span className=" font-bold text-red-500 hover:cursor-pointer">Delete Account</span>
            <span className=" font-bold text-red-500 hover:cursor-pointer">Sign Out</span>
          </div>
        </>
      ) : (
        message.error("You are not authorized") && <Navigate to="/signin" />
      )}
    </div>
  );
};

export default Profile;
