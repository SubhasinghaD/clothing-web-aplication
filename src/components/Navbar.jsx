import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, SetCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    SetCartItems({})

  }

  return (
    <div className="flex items-center justify-between py-5 font-medium shadow-lg px-4">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-lg text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
            }
          >
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
            }
          >
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
            }
          >
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
            }
          >
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <div className="group relative">
          <img onClick={() => token ? null : navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
          {/*Dropdown Menu*/}
          {token && 
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-5 z-50">
            <div className="flex flex-col gap-2 w-30 py-3 px-5 bg-white text-gray-500 rounded shadow-lg">
              <p className="cursor-pointer hover:text-black whitespace-nowrap">My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Order</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">LogOut</p>
            </div>
          </div> 
          }
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="Cart" />
          {getCartCount() > 0 && (
            <div className="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs">{getCartCount()}</span>
            </div>
          )}
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setVisible(false)}>
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setVisible(false)} className="text-2xl">×</button>
            </div>
            <nav className="flex flex-col gap-4">
              <NavLink to="/" onClick={() => setVisible(false)} className="hover:text-gray-800">
                Home
              </NavLink>
              <NavLink to="/collection" onClick={() => setVisible(false)} className="hover:text-gray-800">
                Collection
              </NavLink>
              <NavLink to="/about" onClick={() => setVisible(false)} className="hover:text-gray-800">
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setVisible(false)} className="hover:text-gray-800">
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;