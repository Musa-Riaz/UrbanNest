  import React from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { Navigate } from "react-router-dom";
  import { message } from "antd";
  import { useRef, useState, useEffect } from "react";
  import { setUser } from "../redux/features/userSlice";
  import {setAuth} from "../redux/features/userSlice";
  import {useNavigate} from "react-router-dom";
  import {
    getStorage,
    uploadBytesResumable,
    ref,
    getDownloadURL,
  } from "firebase/storage";
  import { app } from "../Firebase/firebase";
  import axios from "axios";
  import { FaWindows } from "react-icons/fa";




  const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(undefined);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const fileRef = useRef(null);
    const { isAuthorized } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});
    const [username, setUsername] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState();
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name; //we are adding the current time to the file name to make it unique
      const storageRef = ref(storage, fileName); //creating a reference to the storage
      const uploadTask = uploadBytesResumable(storageRef, file); //uploading the file to the storage

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercentage(Math.round(progress));
          setUploadPercentage(progress);
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
        }
      );
    };

    useEffect(() => {
      if (file) {
        handleFileUpload(file);
      }
    }, [file]);

    

    const handleFormUpdate = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `http://localhost:3500/api/v1/user/update/${user._id}`,
          {
            name: username,
            email,
            password,
            avatar: formData?.avatar || user.avatar,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
          console.log(res.data.user);
          dispatch(setUser(res.data.user));
        

          //not including password because it will be hashed and automatically updated in the databaser
        } else {
          message.error(res.data.message);
        }
      } catch (err) {
        console.log(err);
        message.error(err.response.data.message);
      }
    };



    const handleSignOut = async () => {
      try {
        const res = await axios.post("http://localhost:3500/api/v1/auth/signout", {
          withCredentials: true,
        });
        if (res.data.success) {
          message.success(res.data.message);
          dispatch(setUser(null));
          dispatch(setAuth(false));
          localStorage.removeItem("token");
          localStorage.removeItem("persist:root");
          navigate("/signin");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div>
        {isAuthorized ? (
          <>
            <h1 className="text-center text-6xl font-bold my-7">Profile</h1>

            <form
              onSubmit={handleFormUpdate}
              className="flex-col flex justify-center items-center "
            >
              <img
                src={formData?.avatar || user.avatar}
                alt="user_avatar"
                className="mt-2 h-44 w-44 rounded-full object-cover hover:cursor-pointer "
                onClick={() => fileRef.current.click()}
              />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                className="hidden"
                accept="image/*"
              />
              <p>
                {console.log(uploadPercentage)}
                {fileUploadError ? (
                  <span className="text-red-700">Error Image upload</span>
                ) : (uploadPercentage > 0) & (uploadPercentage < 100) ? (
                  <span className="text-green-600">{`Uploading ${uploadPercentage}%`}</span>
                ) : uploadPercentage === 100 ? (
                  <span className="text-green-600">Uploaded</span>
                ) : (
                  ""
                )}
              </p>
              <input
                id="name"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-3 mt-3 rounded-lg w-96 "
              />
              <input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 mt-3 rounded-lg w-96"
              />
              <input
                id="password"
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-3 mt-3 rounded-lg w-96"
              />
              <button
                type="submit"
                className="mt-2 bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95  w-96"
              >
                Update
              </button>
            </form>
            <div className="flex justify-evenly mt-5 ">
              <span className=" font-bold text-red-500 hover:cursor-pointer">
                Delete Account
              </span>
              <span onClick={handleSignOut} className=" font-bold text-red-500 hover:cursor-pointer">
                Sign Out
              </span>
            </div>
          </>
        ) : (
          message.error("You are not authorized") && navigate("/signin")
        )}
      </div>
    );
  };

  export default Profile;