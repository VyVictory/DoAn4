import React, { useState } from 'react';
import {
  VideoCameraIcon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const NavBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
dawdawddawdwadad
  return (
    <nav className="bg-white p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-center relative">
        {/* Left: Logo and Search */}
        <div className="absolute left-0 flex items-center space-x-4">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
          <div className={`flex items-center ${isSearchVisible ? 'block' : 'hidden'} md:block`}>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="md:hidden flex items-center justify-center h-10 w-10"
            onClick={toggleSearch}
          >
            <MagnifyingGlassIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
          </button>
        </div>

        {/* Center: Navigation Links */}
        <ul className={`flex flex-row justify-center gap-3 ${isMenuVisible ? 'block' : 'hidden'} md:flex`}>
          <li className="flex items-center">
            <button className="flex items-center justify-center h-10 w-10">
              <HomeIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
            </button>
          </li>
          <li className="flex items-center">
            <button className="flex items-center justify-center h-10 w-10">
              <VideoCameraIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
            </button>
          </li>
          <li className="flex items-center">
            <button className="flex items-center justify-center h-10 w-10">
              <UsersIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
            </button>
          </li>
          <li className="flex items-center">
            <button className="flex items-center justify-center h-10 w-10">
              <ShoppingBagIcon className="h-6 w-6 stroke-blue-500 fill-transparent" />
            </button>
          </li>
        </ul>

        {/* Right: Profile and Menu */}
        <div className="absolute right-0 flex items-center space-x-4">
          <button className="md:hidden flex items-center justify-center h-10 w-10" onClick={toggleMenu}>
            <Bars3Icon className="h-6 w-6 stroke-blue-500 fill-transparent" />
          </button>
          <button>
            <img src="/path/to/profile-pic.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>
        </div>
      </div>

      {/* Dropdown Search */}
      {isSearchVisible && (
        <div className="absolute top-16 left-0 w-full max-w-sm bg-white shadow-md p-4 mr-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={toggleSearch}
            >
              Close
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p>Search results will be displayed here...</p>
            {/* Add search results here */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;