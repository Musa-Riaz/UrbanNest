import React from "react";

const Search = () => {
  return (
    <div className=" flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 sm:border-r-2 md:h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-bold ">Search Term:</label>
            <input
              type="text"
              placeholder="Search"
              className="border rounded-xl p-3 w-full"
            />
          </div>
          <div>
            <label className="font-bold ">Type:</label>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Offer</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Rent & Sale</span>
            </div>
          </div>
          <div>
            <label className="font-bold ">Amenities:</label>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 my-3 flex-wrap  items-center">
              <input type="checkbox" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <label className="font-bold ">Sort</label>
            <select className="border rounded-lg p-3">
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white hover:opacity-95 h-14 rounded-lg text-xl">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold border-b p-3 text-slate-700 mt-5">Listing Results</h1>
      </div>
    </div>
  );
};

export default Search;
