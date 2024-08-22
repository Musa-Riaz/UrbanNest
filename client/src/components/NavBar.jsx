import { FaSearch } from "react-icons/fa";
import {NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
const NavBar = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);

  const handleSearch = (e) =>{
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);
    url.set('searchTerm', search);
    const searchQuery = url.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(()=>{

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearch(searchTermFromUrl);
    }

  }, [location.search])

  return (
    <header className="bg-slate-300 shadow-xl  ">
      <div className="flex justify-between items-center  mx-auto p-4">
        <h1 className="text-bold  sm:text-xl flex flex-wrap">
          <Link to="/">
          <span className="text-slate-600 text-4xl">Urban</span>
          <span className="text-slate-700 text-4xl">Nest</span>
          </Link>
        </h1>
    
        <ul className="flex gap-5 font-bold text-[22px]  items-center">
        <form onSubmit={handleSearch} className="bg-slate-200 p-3 rounded-xl flex justify-evenly items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
          <button><FaSearch className="text-slate-400"/></button>
        </form>
          <NavLink className="hidden sm:inline hover:underline hover:cursor-pointer " to="/">Home</NavLink>
          <NavLink className="hidden sm:inline hover:underline hover:cursor-pointer " to ="/about">About</NavLink>
          {user ? <NavLink to="/profile"> <img className="rounded-full h-7 w-7 object-cover" src={user.avatar} alt="profile" /> </NavLink> :  <NavLink className=" sm:inline hover:underline hover:cursor-pointer "  to="signin">Sign in</NavLink> }
         
        </ul>
      </div>
    </header>

  );
};

export default NavBar;
