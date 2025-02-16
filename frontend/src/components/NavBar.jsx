import React, { useState, useEffect, useRef } from 'react';
import {
  VideoCameraIcon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  Bars3Icon,

} from "@heroicons/react/24/solid";
import { ArrowLeftIcon, } from "@heroicons/react/24/outline"; // Import icon
import logo from '../logo.webp';


const NavBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isDropdownVisible) {
      setIsDropdownVisible(false);
    }
  };

  const toggleMenu = () => {
    setIsDropdownVisible(!isDropdownVisible);
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible || isSearchVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible, isSearchVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const menuItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: VideoCameraIcon, label: "Videos" },
    { icon: UsersIcon, label: "Friends" },
    { icon: ShoppingBagIcon, label: "Marketplace" },
  ];
  return (
    <nav className="bg-white shadow-md relative flex justify-items-center h-[64px]">
      <div className="flex w-[100%] ">
        {/* Left: Logo and Search bg */}
        <div ref={searchRef} className={`left-0 top-0 flex flex-col  w-full max-w-[300px] ${isSearchVisible && 'border-r'} `}>
          {/* Phần trên: Logo và ô tìm kiếm */}
          <div className="flex items-center py-3 px-2 space-x-2 w-full">
            {/* Logo hoặc nút quay lại */}
            {isSearchVisible ? (
              <button
                onClick={() => setIsSearchVisible(false)}
                className="h-10 w-6 flex items-center">
                <ArrowLeftIcon className="h-6 w-6 text-blue-500" />
              </button>
            ) : (
              <button>
                <img className='h-10 w-10 rounded-full' src={logo} alt="" />
              </button>
            )}

            {/* Ô tìm kiếm */}
            <div className=" flex items-center  flex-grow">
              <button onClick={() => setIsSearchVisible(true)}>

                <MagnifyingGlassIcon className={`h-10 w-10 stroke-gray-500 p-2 bg-slate-100
                  ${isSearchVisible ? 'rounded-l-full ' : 'rounded-full md:rounded-r-none'}
                   `} />
              </button>
              <div
                className={`  ${isSearchVisible ? 'block' : 'hidden md:block'} relative w-full pr-2 bg-slate-100 border-gray-300 rounded-r-full `}>
                <input
                  type="text"
                  onClick={() => setIsSearchVisible(true)}
                  placeholder="Search..."
                  className="w-full py-2 h-10 border rounded-md focus:outline-none focus:ring-0 bg-transparent border-none"
                />
              </div>
            </div>
          </div>


          {/* Phần dưới: Hiển thị kết quả tìm kiếm */}
          {isSearchVisible && (
            <div className="bg-white shadow-md p-2 border-r">
              <ul>
                <li>Search Result 1</li>
                <li>Search Result 2</li>
                <li>Search Result 3</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex-grow"></div>
        {/* Right: Profile and Menu */}
        <div className="right-0 flex items-center space-x-4 pr-4">
          <button className="md:hidden flex items-center justify-center h-10 w-10" onClick={toggleMenu}>
            <Bars3Icon className="h-6 w-6 stroke-blue-500 fill-transparent" />
          </button>
          <button>
            <img src="/path/to/profile-pic.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>
        </div>
        <ul style={{ height: '40px' }}></ul>
      </div>
      {/* Center: Navigation Links */}
      <div className="h-[64px] absolute left-1/2 transform -translate-x-1/2 top-0 w-fit py-2 flex justify-center">
        <ul className="hidden md:flex flex-row justify-center gap-3">
          {menuItems.map(({ icon: Icon }, index) => (
            <button key={index} className="group flex items-center hover:bg-gray-200 w-16 justify-center rounded-md transition-colors duration-200">
              <div className="flex items-center justify-center h-10 w-10">
                <Icon className="h-6 w-6 text-gray-600 transition-colors duration-200 group-hover:text-blue-500 stroke-[1.5]" />
              </div>
            </button>
          ))}
        </ul>
      </div>

      {/* Dropdown Menu */}
      {isDropdownVisible && !isSearchVisible && (
        <div ref={dropdownRef} className="absolute top-12 right-0 w-48 bg-white shadow-md p-4 rounded-md transition-opacity duration-200">
          <ul className="flex flex-col gap-1">
            {menuItems.map(({ icon: Icon, label }, index) => (
              <li key={index} className="flex items-center gap-2 p-2 hover:bg-blue-200 rounded-md transition-colors">
                <Icon className="h-6 w-6 " />
                <span className="text-gray-700">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;