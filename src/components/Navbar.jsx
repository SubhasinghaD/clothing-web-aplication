import React from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between py-5 font-medium shadow-lg'>
            <img src={assets.logo} className='w-36' alt='Logo' />
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <li>
                    <NavLink 
                        to='/' 
                        className={({ isActive }) => 
                            `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
                        }
                        aria-label="Home"
                    >
                        <p>Home</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to='/collection' 
                        className={({ isActive }) => 
                            `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
                        }
                        aria-label="Collection"
                    >
                        <p>Collection</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to='/about' 
                        className={({ isActive }) => 
                            `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
                        }
                        aria-label="About"
                    >
                        <p>About</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/contact'
                        className={({ isActive }) =>
                             `flex flex-col items-center gap-1 ${isActive ? 'active text-black-500' : ''}`
                        }
                        aria-label="Contact"
                    >
                        <p>Contact</p>
                        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                    </NavLink>
                </li>
            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt="/"/>

                <div className='group relative'>
                    <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="/"/>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-5 bg-gray-100 shadow-lg'>
                        <div className='flex flex-col gap-2 w-30 py-3 px-5 bg-state-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black whitespace-nowrap'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Order</p>
                            <p className='cursor-pointer hover:text-black'>LogOut</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                     <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="/"/>
                     <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg'></p>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
