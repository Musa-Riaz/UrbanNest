import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CreateListing from "./pages/CreateListing";
import NavBar from "./components/NavBar";
import Search from './pages/Search'
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./pages/Profile";
import { setLoading } from "./redux/features/loadingSlice";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

const App = () => {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route path = "/search" element={<Search />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-listing"
              element={
                <PrivateRoute>
                  <CreateListing />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-listing/:id"
              element={
                <PrivateRoute>
                  <UpdateListing />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
