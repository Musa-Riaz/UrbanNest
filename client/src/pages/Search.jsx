import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from "react-redux";
import {setLoading, hideLoading} from '../redux/features/loadingSlice'
const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listing, setListing] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("all");
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [sort, setSort] = useState("created-at");
  const [order, setOrder] = useState("desc");

  const handleSort = (e) => {
    setSort(e.target.value.split("_")[0]) || "created_at";
    setOrder(e.target.value.split("_")[1]) || "desc";
  };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     const typeFromUrl = urlParams.get("type");
//     const parkingFromUrl = urlParams.get("parking");
//     const furnishedFromUrl = urlParams.get("furnished");
//     const offerFromUrl = urlParams.get("offer");
//     const sortFromUrl = urlParams.get("sort");
//     const orderFromUrl = urlParams.get("order");

//     if(offerFromUrl,
//         sortFromUrl ,
//         orderFromUrl,
//         furnishedFromUrl,
//         parkingFromUrl,
//         typeFromUrl,
//         searchTermFromUrl 
//     ){
//         setSearchTerm(searchTermFromUrl);
//         setParking(parkingFromUrl);
//         setFurnished(furnishedFromUrl);
//         setOffer(offerFromUrl);
//         setSort(sortFromUrl);
//         setOrder(orderFromUrl);
//         setType(typeFromUrl);
//     }

//   }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("type", type);
    urlParams.set("parking", parking);
    urlParams.set("furnished", furnished);
    urlParams.set("offer", offer);
    urlParams.set("sort", sort);
    urlParams.set("order", order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };


  const handleClear = ()=>{
    setSearchTerm("");
    setFurnished(false);
    setParking(false);
    setOffer(false);
    setSort("created-at");
    setOrder("desc");
    setType('all');
  }

  const fetchListings = async() => {
    try{
        dispatch(setLoading());
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.toString();
        const res = await axios.get(`http://localhost:3500/api/v1/listing/get-listings?${searchQuery}`);
        dispatch(hideLoading());
        if(res.data.success){
            console.log(res.data.listings);
            setListing(res.data.listings);
        }
        
    }
    catch(err){
        dispatch(hideLoading());
        console.log(err);
        message.error(err.response.data.message);
    }
  }

  useEffect(()=>{

    fetchListings();
    dispatch(hideLoading());
  }, [location.search])

  return (
    <div className=" flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 sm:border-r-2 md:h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-bold ">Search Term:</label>
            <input
              type="text"
              placeholder="Search"
              className="border rounded-xl p-3 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="font-bold ">Type:</label>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                value={type}
                checked={type === "all"}
                onChange={() => setType("all")}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                value={type}
                checked={type === "rent"}
                onChange={() => setType("rent")}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                checked={type === "sale"}
                value={type}
                onChange={() => setType("sale")}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                value={offer}
                checked = {offer}
                onChange={(e) => setOffer(e.target.checked)}
              />
              <span>Offer</span>
            </div>
          </div>
          <div>
            <label className="font-bold ">Amenities:</label>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input
                type="checkbox"
                className="w-5"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <label className="font-bold ">Sort</label>
            <select
              className="border rounded-lg p-3"
              defaultValue={"created_at_desc"}
              onChange={handleSort}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white hover:opacity-95 h-14 rounded-lg text-xl">
            Search
          </button>
          <button type="button" onClick={handleClear} className="bg-slate-200 text-slate-700 hover:opacity-90 h-14 rounded-lg text-xl">
            Clear Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold border-b p-3 text-slate-700 mt-5">
          Listing Results
        </h1>
      </div>
    </div>
  );
};

export default Search;
