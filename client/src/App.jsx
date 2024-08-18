import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/Spinner";
import {useSelector, useDispatch} from 'react-redux'
import Profile from "./pages/Profile";
import { setLoading } from "./redux/features/loadingSlice";

const App = () => {

  const {isLoading} = useSelector((state) => state.loading);
  const {isAuthorized} = useSelector((state) => state.user);

  return (
    <>
  {isLoading ? <Spinner /> : 
   <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          {isAuthorized && <Route path="/profile" element= {<Profile />} />}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> }

     
    </>
  );
};

export default App;
