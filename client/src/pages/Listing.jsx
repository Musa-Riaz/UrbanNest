import React from "react";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoading, hideLoading } from "../redux/features/loadingSlice";
import { useParams } from "react-router-dom";
import Contact  from '../components/Contact'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import "swiper/css/bundle";
const Listing = () => {
  const { user } = useSelector((state) => state.user);
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);


  useEffect(() => {
    async function getListing() {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/v1/user/single-listing/${id}`,
          { withCredentials: true }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          setListing(res.data.listing);
        } else {
          message.error("The listing could not be found");
        }
      } catch (err) {
        console.log(err);
        message.error(err.response.data.message);
      }
    }

    getListing();
  }, []);

  return (
    <main>
      {listing && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((img) => (
              <SwiperSlide key={img}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${img}) center no-repeat `,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                message.info("Text copied to clipboard");
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {user && listing.userId !== user._id && !contact && (
              <button className="bg-slate-700 text-white rounded-xl hover:opacity-95 p-3" onClick={() => setContact(true)}>
                Contact Landlord  
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
