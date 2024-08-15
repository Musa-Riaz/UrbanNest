import { FaSearch } from "react-icons/fa";
import {NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
const NavBar = () => {

  const {user} = useSelector((state) => state.user);

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
        <form className="bg-slate-200 p-3 rounded-xl flex justify-evenly items-center">
          <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
          <FaSearch className="text-slate-400"/>
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
