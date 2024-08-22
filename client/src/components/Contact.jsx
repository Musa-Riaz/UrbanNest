import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Contact = ({ listing }) => {
  const [landLord, setLandLord] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/v1/user/get-user/${listing.userId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setLandLord(res.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [listing.userId]);

  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-bold">{landLord.name}</span> for{" "}
            <span className="font-bold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-lg "
          ></textarea>
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}$body=${message}`}
            className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
