import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/v1/listing/get-listings?offer=true&limit=4`,
          { withCredentials: true }
        );
        setOfferListings(res.data.listings);

        fetchRentListings();
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/v1/listing/get-listings?type=rent&limit=4`,
          { withCredentials: true }
        );
        setRentListings(res.data.listings);
        fetchSaleListings();
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/api/v1/listing/get-listings?type=sale&limit=4`,
          { withCredentials: true }
        );
        setSaleListings(res.data.listings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-400"> perfect </span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          UrbanNest is the next best place to find your next perfect place to
          live. <br />
          We have a wide range of properties for you to choose from
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets get started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing?._id}>
              <div
                style={{
                  background: `url(${listing?.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover"
                }}
                className="h-[500px] "
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div >
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">Recent Offers</h2>
              <Link className="text-sm text-blue-700 hover:underline" to={`/search?offer=true`}>Show More Offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div >
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">Recent Places for Rent</h2>
              <Link className="text-sm text-blue-700 hover:underline" to={`/search?offer=true`}>Show More Places for Rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div >
            <div className="my-3">
              <h2 className="text-2xl font-bold text-slate-600 ">Recent Places for Sale</h2>
              <Link className="text-sm text-blue-700 hover:underline" to={`/search?offer=true`}>Show More Places for Sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
