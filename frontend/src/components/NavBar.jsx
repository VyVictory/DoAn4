import React, { useState, useEffect, useRef } from 'react';
import {
  VideoCameraIcon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  Bars3Icon,

} from "@heroicons/react/24/solid";
import { ArrowLeftIcon, ChatBubbleLeftIcon, BellIcon } from "@heroicons/react/24/outline"; // Import icon
import logo from '../logo.webp';
import avt from '../img/DefaultAvatar.jpg'
import LinkTo from './LinkTo';
import { useAuth } from './AuthProvider';

const NavBar = () => {
  const { showLogin, setShowLogin } = useAuth();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const inputSearchRef = useRef(null);
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
    { icon: HomeIcon, label: "Home", namepage: 'home' },
    { icon: VideoCameraIcon, label: "Videos", namepage: 'videos' },
    { icon: UsersIcon, label: "Friends", namepage: 'groups' },
    { icon: ShoppingBagIcon, label: "Marketplace", namepage: 'store' },
  ];
  const [width, setWidth] = useState(235); // State to hold the current width

  // Update width on render
  useEffect(() => {
    if (inputSearchRef.current) {
      setWidth(inputSearchRef.current.offsetWidth); // Set the initial width dynamically
    }
  }, []);
  console.log(showLogin)
  return (
    <nav className="HighNavbar bg-white shadow-md fixed w-screen flex justify-items-center z-40"
      style={{ minWidth: 'screen' }}
    >
      <div className="flex w-[100%] ">
        {/* Left: Logo and Search bg */}
        <div ref={searchRef} className={`z-10  left-0 top-0 flex flex-col w-full max-w-[300px]  ${isSearchVisible && 'border-r-2 absolute bg-white shadow-lg rounded-br-lg'} `}>
          {/* Phần trên: Logo và ô tìm kiếm */}
          <div className="HighNavbar flex items-center justify-end h-full px-2 space-x-2 w-full">
            {/* Logo hoặc nút quay lại */}
            {isSearchVisible ? (
              <button
                onClick={() => setIsSearchVisible(false)}
                className="h-10 w-6 flex items-center">
                <ArrowLeftIcon className="h-6 w-6 text-blue-500 hover:scale-125" />
              </button>
            ) : (
              <button className='w-10 h-10 mx-1'>
                <img className=' w-10 rounded-full' src={logo} alt="" />
              </button>
            )}
            {/* Ô tìm kiếm */}
            <div
              ref={inputSearchRef}
              className={`flex w-full items-center flex-grow transition-all duration-300 ease-in-out`}
              style={{
                maxWidth: isSearchVisible ? '350px' : width, // Transition from 0px to 350px
                overflow: 'hidden', // Hide overflow during transition
              }}
            >
              <button onClick={() => setIsSearchVisible(true)}>
                <MagnifyingGlassIcon className={`h-10 w-10 stroke-gray-300 p-2 bg-slate-100 hover:stroke-violet-400
        ${isSearchVisible ? 'rounded-l-full ' : 'rounded-full lg:rounded-r-none'}
         `} />
              </button>
              <div
                className={`  ${isSearchVisible ? 'block ' : 'hidden lg:block'}   relative w-full bg-slate-100 border-gray-300 rounded-r-full `}>
                <input
                  type="text"
                  onClick={() => setIsSearchVisible(true)}
                  placeholder="Tìm kiếm trên ZaFaCook"
                  className="w-full py-2 h-10 border rounded-md focus:outline-none focus:ring-0 bg-transparent border-none"
                />
              </div>
            </div>
          </div>


          {/* Phần dưới: Hiển thị kết quả tìm kiếm */}
          {isSearchVisible && (
            <div className="p-2">
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
        <div className="flex items-center space-x-3 pr-4">
          <button
            className="md:hidden bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:ring-2 hover:ring-blue-200 transition duration-300"
            onClick={toggleMenu}
          >
            <Bars3Icon className="h-7 w-7 text-gray-700 hover:text-blue-500 transition" />
          </button>
          <LinkTo namepage="messages">
            <button
              className="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:ring-2 hover:ring-blue-200 transition duration-300">
              <ChatBubbleLeftIcon className="h-7 w-7 text-gray-700 hover:text-blue-500 transition" />
            </button>
          </LinkTo>
          <LinkTo namepage="notification" css="bg-gray-100 p-2 rounded-full hover:bg-blue-100 hover:ring-2 hover:ring-blue-200 transition duration-300">
            <BellIcon className="h-7 w-7 text-gray-700 hover:text-blue-500 transition" />
          </LinkTo>
          <button
            onClick={() => setShowLogin(true)}
            className="h-12 w-full aspect-square border-2 border-gray-300 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-200 transition duration-300">
            <img src={avt} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>

        <ul style={{ height: '40px' }}></ul>
      </div>
      {/* Center: Navigation Links */}
      <div className="h-[64px] absolute left-1/2 transform -translate-x-1/2 top-0 w-fit flex justify-center">
        <ul className="HighNavbar hidden md:flex flex-row justify-center gap-3">
          {menuItems.map(({ icon: Icon, namepage }, index) => (
            <div className='h-full py-1 flex items-center'>  {/*border-b-4 border-blue-500*/}
              <LinkTo key={index} namepage={namepage} css='group flex items-center hover:bg-gray-200 w-24 h-full justify-center rounded-md transition-colors duration-200'>
                <div className="flex items-center justify-center h-full w-full aspect-square">
                  <Icon className="h-6 w-6 text-gray-600 transition-colors duration-200 group-hover:text-blue-500 stroke-[1.5]" />
                </div>
              </LinkTo>
            </div>

          ))}
        </ul>
      </div >

      {/* Dropdown Menu */}
      {
        isDropdownVisible && !isSearchVisible && (
          <div ref={dropdownRef} className="absolute top-12 right-0 w-48 bg-white shadow-md p-4 rounded-md transition-opacity duration-200">
            <ul className="flex flex-col gap-1">
              {menuItems.map(({ icon: Icon, label, namepage }, index) => (
                <LinkTo key={index} namepage={namepage} css='flex items-center gap-2 p-2 hover:bg-blue-200 rounded-md transition-colors'>
                  <Icon className="h-6 w-6 " />
                  <span className="text-gray-700">{label}</span>
                </LinkTo>
              ))}
            </ul>
          </div>
        )
      }
    </nav >
  );
};

export default NavBar;