import React from "react";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {setLoading, hideLoading} from "../redux/features/loadingSlice";
import cookie from 'cookie-parser';
import {setUser, setAuth} from "../redux/features/userSlice";
import OAuth from "../components/OAuth";

import {useNavigate } from "react-router-dom";
const SignIn = () => {

  const { user } = useSelector((state) =>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const res = await axios.post("http://localhost:3500/api/v1/auth/signin", {
        email,
        password,
      }, {withCredentials: true}); //With credentials allow the server to set cookies in the browser
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        dispatch(setAuth(true));
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      dispatch(setAuth(false));
      console.log(err);
      message.error(err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  border border-slate-200 p-5 rounded-2xl shadow-xl  ">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignIn}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
            <OAuth />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Click here to Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
