import React, { useState, useRef } from 'react';
import { Bars3Icon, ExclamationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import UseClickOutside from '../components/UseClickOutside';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"; // Import icon
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import icon
const Messages = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRightbarOpen, setRightbarOpen] = useState(false);
  const [isRightbarOpen1, setRightbarOpen1] = useState(true);
  const MessMenuLeft = useRef(null);
  const MessMenuRight = useRef(null);

  const divs = [];
  for (let i = 0; i < 30; i++) {
    divs.push(
      <>
        <div key={i} className="flex space-x-4 justify-end">
          <div className="bg-gray-200 p-2 rounded-md max-w-xs">
            Đơn hàng #12345, tôi không thấy được trạng thái giao hàng.
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="bg-blue-500 text-white p-2 rounded-md max-w-xs">
            Để tôi kiểm tra giúp bạn nhé!
          </div>
        </div>
      </>
    );
  }

  const [message, setMessage] = useState(" ");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setMessage(newValue);

    // Automatically adjust the textarea height
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height to auto to shrink on content deletion
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content

    // Ensure textarea doesn't grow beyond 3 lines
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
    const maxHeight = lineHeight * 3;
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto'; // Show scrollbar when exceeding 3 lines
    } else {
      textarea.style.overflowY = 'hidden'; // Hide scrollbar if within 3 lines
    }
  };

  // Use the custom hook to close sidebar and rightbar when clicked outside
  UseClickOutside(MessMenuLeft, () => setSidebarOpen(false));
  UseClickOutside(MessMenuRight, () => setRightbarOpen(false));

  const sidebarClass = `NavbarUser z-20 bg-white  transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-64 h-full ' : 'w-0 h-full'} lg:w-[360px] absolute lg:relative`;
  const rightbarClass = `NavbarUser z-20 bg-white transition-all duration-500 ease-in-out right-0 ${isRightbarOpen ? 'w-64 h-full ' : 'w-0 h-full'} lg:w-[360px] absolute lg:relative`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div ref={MessMenuLeft} className={sidebarClass}>
        <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} border-r shadow-xl h-full `}>
          <div className='p-2'>
            <h2 className="text-2xl font-semibold ">Đoạn chat</h2>
          </div>
          {/* Phần trên: Logo và ô tìm kiếm */}
          <div className="flex items-center max-h-12  justify-center pl-2 pr-4 space-x-2 w-full rounded-lg shadow-md pb-1">
            <button className="h-10 w-10 px-2  flex items-center justify-center hover:bg-violet-100 rounded-full transition duration-200 ease-in-out">
              <ArrowLeftIcon className="h-6 w-6 hover:scale-125 text-blue-500" />
            </button>

            {/* Ô tìm kiếm */}
            <div className="flex items-center w-full max-w-lg bg-violet-100 rounded-2xl shadow-sm ">
              <button className="h-10 w-10 flex items-center hover:scale-125 justify-center text-violet-300 hover:text-violet-700 rounded-full transition duration-200 ease-in-out">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <input
                type="text"
                placeholder="Tìm kiếm trên ZaFaCook"
                className="w-full h-10 pr-2 pl-1 text-gray-700 bg-transparent outline-none rounded-full focus:ring-0 transition duration-200 ease-in-out"
              />

            </div>
          </div>
          <div className="p-2 flex space-x-2 bg-white shadow-sm rounded-lg overflow-x-auto ">
            {/* Nút menu */}
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-3xl px-4 py-2 shadow-sm 
                     hover:bg-violet-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <g data-name="14-Mail">
                  <path d="M11 24H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v9a1 1 0 0 1-2 0V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a1 1 0 0 1 0 2z" />
                  <path d="M16 14a1 1 0 0 1-.618-.214l-14-11a1 1 0 0 1 1.236-1.572L16 11.728 29.382 1.214a1 1 0 1 1 1.236 1.572l-14 11A1 1 0 0 1 16 14z" />
                  <path d="M2 23a1 1 0 0 1-.707-1.707l11-11a1 1 0 0 1 1.414 1.414l-11 11A1 1 0 0 1 2 23zM23 32a9 9 0 1 1 9-9 9.011 9.011 0 0 1-9 9zm0-16a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7z" />
                  <path d="M23 26a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
                  <path d="M27 30a1 1 0 0 1-.9-.553l-.239-.485C24.936 27.07 24.344 26 23 26s-1.936 1.07-2.866 2.962l-.239.485a1 1 0 1 1-1.79-.894l.235-.473c.94-1.913 2-4.08 4.66-4.08s3.72 2.167 4.66 4.08l.235.473A1 1 0 0 1 27 30z" />
                </g>
              </svg>
              <span className="text-sm font-medium text-nowrap">Bạn bè</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-3xl px-4  shadow-sm 
                     hover:bg-blue-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <svg className='h-8 w-8 text-gray-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <defs>  <style> {` .cls-1{fill:#192835} .cls-2{fill:#4891d3} .cls-3{fill:#2d72bc} .cls-4{fill:#a1d51c}  `} </style></defs>
                <g id="Group">
                  <path className="cls-1" d="M28.24 12.75A6 6 0 0 0 18 17v2a6 6 0 0 0 1.1 3.46 6.21 6.21 0 0 0 .9 1l.08.06a4 4 0 0 0 .34.27l.22.15.19.13a5.22 5.22 0 0 0 1 .47l.49.17a5.56 5.56 0 0 0 1 .2 5.13 5.13 0 0 0 1.24 0 6 6 0 0 0 1.09-.2l.48-.17.49-.21.2-.11a.78.78 0 0 0 .18-.11l.2-.12.17-.11.12-.09c.12-.09.24-.18.35-.28l.08-.06a6.21 6.21 0 0 0 .9-1A6 6 0 0 0 30 19v-2a6 6 0 0 0-1.76-4.25zm-1.66 9.31a.28.28 0 0 1-.08.06l-.13.1-.31.21-.12.06-.1.05.47.88-.56-.84-.29.13-.31.11a4.64 4.64 0 0 1-.76.14 3.09 3.09 0 0 1-.8 0 3.45 3.45 0 0 1-.7-.13 2.39 2.39 0 0 1-.32-.11l-.29-.13-.44.9.35-.95a.94.94 0 0 1-.22-.12l-.09-.05-.12-.08-.13-.1h-.06l-.12-.1-.15-.09a4 4 0 0 1-1.3-3v-2a4 4 0 0 1 6.83-2.84A4 4 0 0 1 28 17v2a4 4 0 0 1-1.3 3 .63.63 0 0 0-.12.06z" />
                  <path className="cls-2" d="M28 17v2a4 4 0 0 1-1.3 3 .63.63 0 0 0-.12.11.28.28 0 0 1-.08.06l-.13.1-.31.21-.12.06-.1.05h-.09l-.29.13-.31.11a4.64 4.64 0 0 1-.76.14 3.09 3.09 0 0 1-.8 0 3.45 3.45 0 0 1-.7-.13l-.32-.11-.29-.13h-.08a.94.94 0 0 1-.22-.12l-.09-.05-.12-.08-.13-.1h-.06l-.12-.1-.16-.15a4 4 0 0 1-1.3-3v-2a4 4 0 0 1 6.83-2.84A4 4 0 0 1 28 17z" />
                  <path className="cls-1" d="M39.53 15.46A5 5 0 0 0 31 19v2a4.93 4.93 0 0 0 .58 2.32 4.66 4.66 0 0 0 .64.95A5 5 0 0 0 33 25a3 3 0 0 0 .37.25 1.13 1.13 0 0 0 .21.12 4.92 4.92 0 0 0 4.82 0l.21-.12A3 3 0 0 0 39 25a5 5 0 0 0 .79-.73 4.66 4.66 0 0 0 .64-.95A4.93 4.93 0 0 0 41 21v-2a5 5 0 0 0-1.47-3.54zM33 19a3 3 0 1 1 6 0v2a3 3 0 0 1-6 0z" />
                  <path className="cls-3" d="M39 19v2a3 3 0 0 1-6 0v-2a3 3 0 1 1 6 0z" />
                  <path className="cls-1" d="M40.42 23.32a6.07 6.07 0 0 0-1-.59 1 1 0 0 0-1.21.24 3 3 0 0 1-4.52 0 1 1 0 0 0-1.21-.24 7.16 7.16 0 0 0-1 .59 6.33 6.33 0 0 0-1.69 1.92 1 1 0 0 0 0 1A7 7 0 0 1 31 30v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3.5a6.4 6.4 0 0 0-2.58-5.18zM41 31h-8v-1a9 9 0 0 0-1.06-4.24 4 4 0 0 1 .9-.88A1.77 1.77 0 0 0 33 25a3 3 0 0 0 .37.25 1.13 1.13 0 0 0 .21.12 5.26 5.26 0 0 0 4.82 0l.21-.12A3 3 0 0 0 39 25l.17-.13A4.46 4.46 0 0 1 41 28.5z" />
                  <path className="cls-3" d="M41 28.5V31h-8v-1a9 9 0 0 0-1.06-4.24 4 4 0 0 1 .9-.88A1.77 1.77 0 0 0 33 25a3 3 0 0 0 .37.25 1.13 1.13 0 0 0 .21.12 4.92 4.92 0 0 0 4.82 0l.21-.12A3 3 0 0 0 39 25l.17-.13A4.46 4.46 0 0 1 41 28.5z" />
                  <path className="cls-1" d="M31.62 25.21a8.43 8.43 0 0 0-1.25-1.58 8.21 8.21 0 0 0-1.47-1.17 7.73 7.73 0 0 0-1.16-.64 1 1 0 0 0-1 .12.63.63 0 0 0-.12.11.28.28 0 0 1-.08.06l-.13.1-.31.21-.12.06-.1.06h-.09l-.29.13-.31.11a4.64 4.64 0 0 1-.76.14 3.09 3.09 0 0 1-.8 0 3.45 3.45 0 0 1-.7-.13l-.32-.11-.29-.13h-.08a.94.94 0 0 1-.22-.12l-.09-.05-.12-.08-.13-.1h-.06l-.12-.1-.2-.1a1 1 0 0 0-1-.12 9.13 9.13 0 0 0-3.87 3.37A9 9 0 0 0 15 30v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a8.94 8.94 0 0 0-1.38-4.79zM31 33H17v-3a7.06 7.06 0 0 1 1.09-3.75 6.89 6.89 0 0 1 2.46-2.34l.09.05.19.13a5.22 5.22 0 0 0 1 .47l.49.17a5.56 5.56 0 0 0 1 .2 5.13 5.13 0 0 0 1.24 0 6 6 0 0 0 1.09-.2l.46-.17.49-.21.2-.11a.78.78 0 0 0 .18-.11l.2-.12.17-.11A6.33 6.33 0 0 1 29 25.05a6.27 6.27 0 0 1 1 1.22A7 7 0 0 1 31 30z" />
                  <path className="cls-2" d="M31 30v3H17v-3a7.06 7.06 0 0 1 1.09-3.75 6.89 6.89 0 0 1 2.46-2.34l.28.18a5.22 5.22 0 0 0 1 .47l.49.17a5.56 5.56 0 0 0 1 .2 5.13 5.13 0 0 0 1.24 0 6 6 0 0 0 1.09-.2l.46-.17.49-.21.2-.11a.78.78 0 0 0 .18-.11l.2-.12.17-.11A6.33 6.33 0 0 1 29 25.05a6.27 6.27 0 0 1 1 1.22A7 7 0 0 1 31 30z" />
                  <path className="cls-1" d="M15.53 15.46A5 5 0 0 0 7 19v2a4.93 4.93 0 0 0 .58 2.32 4.66 4.66 0 0 0 .64.95A5 5 0 0 0 9 25a3 3 0 0 0 .37.25l.21.12a4.92 4.92 0 0 0 4.82 0l.21-.12A3 3 0 0 0 15 25a5 5 0 0 0 .79-.73 4.66 4.66 0 0 0 .64-.95A4.93 4.93 0 0 0 17 21v-2a5 5 0 0 0-1.47-3.54zM9 19a3 3 0 1 1 6 0v2a3 3 0 0 1-6 0z" />
                  <path className="cls-3" d="M15 19v2a3 3 0 0 1-6 0v-2a3 3 0 1 1 6 0z" />
                  <path className="cls-1" d="M18.11 25.22a6.39 6.39 0 0 0-2.64-2.49 1 1 0 0 0-1.21.24 3 3 0 0 1-4.52 0 1 1 0 0 0-1.21-.24 6.07 6.07 0 0 0-.95.59A6.43 6.43 0 0 0 5 28.5V32a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2a7.06 7.06 0 0 1 1.09-3.75 1 1 0 0 0 .02-1.03zM15 30v1H7v-2.5a4.46 4.46 0 0 1 1.84-3.63L9 25a3 3 0 0 0 .37.25l.21.12a5.26 5.26 0 0 0 4.82 0l.21-.12A3 3 0 0 0 15 25l.17-.13a4.42 4.42 0 0 1 .9.88A9.13 9.13 0 0 0 15 30z" />
                  <path className="cls-3" d="M16.06 25.75A9.13 9.13 0 0 0 15 30v1H7v-2.5a4.46 4.46 0 0 1 1.84-3.63L9 25a3 3 0 0 0 .37.25l.21.12a4.92 4.92 0 0 0 4.82 0l.21-.12A3 3 0 0 0 15 25l.17-.13a4.42 4.42 0 0 1 .89.88z" />
                  <path className="cls-4" d="M24 42a17.88 17.88 0 0 1-12.73-5.27 1 1 0 1 1 1.42-1.42 16 16 0 0 0 22.62 0 1 1 0 0 1 1.42 1.42A17.88 17.88 0 0 1 24 42zM12 13a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42 18 18 0 0 1 25.46 0 1 1 0 0 1-1.42 1.42 16 16 0 0 0-22.62 0A1 1 0 0 1 12 13z" />
                </g>
              </svg>
              <span className="text-sm font-medium">Nhóm</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-3xl px-4  shadow-sm 
            hover:bg-orange-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <svg className='h-8 w-8 text-gray-600' xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 2048 2048">
                <defs> <style> {`  .fil0{fill:none}  .fil3{fill:#e53935;fill-rule:nonzero}   .fil2,.fil4,.fil5{fill:#ef5350;fill-rule:nonzero}  .fil4,.fil5{fill:#f9a825} .fil4{fill:#fbc02d}  `}</style></defs><g id="Layer_x0020_1">
                  <path className="fil0" d="M0 0h2048v2048H0z" />
                  <path className="fil0" d="M255.999 255.999h1536v1536h-1536z" />
                  <path className="fil0" d="M256.001 256.001h1536v1536h-1536z" />
                  <path className="fil0" d="M256.001 256.001h1536v1536h-1536z" />
                  <g id="_347540600">
                    <path id="_347542640" d="M1535.5 942.256c-19.572-123.386-84.247-232.264-176.356-310.122-91.19-77.078-209.345-123.639-337.298-123.639-127.553 0-244.201 46.252-334.05 122.87-91.347 77.89-155.167 187.073-174.806 310.891l-67.296-10.684c22.253-140.291 94.453-263.91 197.776-352.014 101.96-86.947 234.105-139.432 378.376-139.432 144.561 0 278.155 52.691 381.368 139.929 104.18 88.058 177.37 211.464 199.585 351.516l-67.298 10.684z" style={{ fill: '#00796b', fillRule: 'nonzero' }} />
                    <path id="_347542496" className="fil2" d="M1024.24 1219.34c-66.149-.021-127.967-26.47-173.85-74.71l-5.525-5.7-6.878 3.991c-97.19 56.149-161.004 154.158-179.565 276.48l-.863 4.506 2.994 3.526c97.012 116.44 226.154 180.418 363.688 180.443V1219.34z" />
                    <path id="_347542280" className="fil3" d="m1210.48 1142.92-6.912-3.991-5.493 5.7c-45.833 48.151-107.467 74.59-173.32 74.707l-.437.003h-.083v388.536H1024.388c137.372-.022 266.528-64 363.493-180.443l3.053-3.526-.872-4.506c-18.61-122.322-82.435-220.33-179.582-276.48z" />
                    <path id="_347542160" className="fil3" d="m1024.24 1170.23.568-.008c120.012-.358 217.671-98.214 217.671-218.297 0-119.922-97.305-217.743-217.258-218.326-.328-.001-.653-.012-.981-.012v436.643z" />
                    <path id="_347541944" className="fil2" d="m1024.15 1170.23.092-.001V733.586l-.092-.001c-120.312 0-218.147 98.058-218.147 218.339 0 120.304 97.836 218.307 218.147 218.307z" />
                    <g>
                      <path id="_347541824" className="fil4" d="M479.312 1144.56c-40.284-.014-77.933-16.122-105.875-45.5l-3.365-3.47-4.19 2.43c-59.188 34.195-98.052 93.883-109.356 168.379l-.526 2.744 1.824 2.147c59.08 70.913 137.73 109.876 221.489 109.892V1144.56z" />
                      <path id="_347541608" className="fil5" d="m592.737 1098.02-4.21-2.43-3.344 3.47c-27.913 29.325-65.449 45.426-105.553 45.498l-.267.002h-.051v236.622h.094c83.66-.013 162.317-38.976 221.37-109.892l1.86-2.147-.532-2.744c-11.334-74.495-50.204-134.184-109.368-168.379z" />
                      <path id="_347541488" className="fil5" d="m479.312 1114.66.347-.005c73.088-.218 132.563-59.813 132.563-132.946 0-73.033-59.26-132.607-132.313-132.962-.2 0-.397-.008-.597-.008v265.921z" />
                      <path id="_347541272" className="fil4" d="m479.256 1114.66.056-.001V848.738h-.056c-73.27 0-132.854 59.719-132.854 132.97 0 73.267 59.583 132.952 132.854 132.952z" />
                    </g>
                    <g>
                      <path id="_347541152" className="fil4" d="M1568.68 1144.56c-40.285-.014-77.933-16.122-105.876-45.5l-3.365-3.47-4.19 2.43c-59.188 34.195-98.052 93.883-109.356 168.379l-.526 2.744 1.824 2.147c59.08 70.913 137.73 109.876 221.49 109.892V1144.56z" />
                      <path id="_347540936" className="fil5" d="m1682.1 1098.02-4.21-2.43-3.346 3.47c-27.911 29.325-65.448 45.426-105.553 45.498l-.266.002h-.05v236.622h.093c83.66-.013 162.318-38.976 221.37-109.892l1.86-2.147-.532-2.744c-11.334-74.495-50.204-134.184-109.367-168.379z" />
                      <path id="_347540816" className="fil5" d="m1568.68 1114.66.346-.005c73.088-.218 132.563-59.813 132.563-132.946 0-73.033-59.26-132.607-132.312-132.962-.2 0-.398-.008-.598-.008v265.921z" />
                      <path id="_347540696" className="fil4" d="m1568.62 1114.66.057-.001V848.738h-.057c-73.27 0-132.854 59.719-132.854 132.97 0 73.267 59.583 132.952 132.854 132.952z" />
                    </g>
                  </g>
                </g>
              </svg>
              <span className="text-sm font-medium">Tin</span>
            </button>
          </div>


          <ul className=" space-y-2">
            <li>
              <div>
                
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Z-INDEX Chat Section */}
      <div className="NavbarUser flex flex-1 flex-col">
        <div className="shadow-sm border-b px-3 z-10 flex">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(prevState => !prevState)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex flex-row justify-center items-center p-4 w-full">
            <h2 className="text-lg font-semibold">Tên người dùng</h2>
            <p className="">Trạng thái</p>
          </div>
          {/* lớn thì hiện */}
          <div className="flex items-center justify-center">
            <button
              className="lg:hidden"


            >
              <ExclamationCircleIcon
                onClick={() => {
                  setRightbarOpen1(true);
                  if (!isRightbarOpen1) {
                    setTimeout(() => {
                      setRightbarOpen(prevState => !prevState);
                    }, 1);
                  } else {
                    setRightbarOpen(prevState => !prevState);
                  }
                }}
                className="h-8 w-8 p-1 hover:bg-gray-200 hover:text-blue-700 rounded-full text-blue-500" />
            </button>
          </div>
          {/* nhỏ thì hiện */}
          <div className="flex items-center justify-center">
            <button
              className="lg:block hidden"


            >
              <ExclamationCircleIcon
                onClick={() => setRightbarOpen1(!isRightbarOpen1)}
                className="h-8 w-8 p-1 hover:bg-gray-200 hover:text-blue-700 rounded-full text-blue-500" />
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {/* Tin nhắn thử */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="bg-blue-500 text-white p-2 rounded-md max-w-xs">
                Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?
              </div>
            </div>
            {divs}
          </div>
        </div>
        {/* Chat input */}
        <div className="shadow-sm border-t flex items-center p-2 bg-white">
          <div className='flex items-center flex-row space-x-1 pr-2'>
            <button >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#6ee7b7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  fill="url(#grad1)"
                  stroke="#ffffff"  // White border for a sticker effect
                  strokeWidth="2"   // Slightly thicker border
                  filter="drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.15))" // Drop shadow for a lifted look
                />
              </svg>

            </button>

            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                <defs>
                  <style>{'.b{fill:#864e20}'}</style>
                </defs>
                <rect x="1" y="1" width="22" height="22" rx="7.656" style={{ fill: '#f8de40' }} />
                <path className="b" d="M14 11.207a.32.32 0 0 0-.313.327 2.1 2.1 0 0 1-.5 1.33A1.593 1.593 0 0 1 12 13.3a1.6 1.6 0 0 1-1.187-.43 2.088 2.088 0 0 1-.5-1.334.32.32 0 1 0-.64-.012 2.712 2.712 0 0 0 .679 1.791 2.211 2.211 0 0 0 1.648.623 2.211 2.211 0 0 0 1.647-.626 2.718 2.718 0 0 0 .679-1.791.322.322 0 0 0-.326-.314z" />
                <path d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" style={{ fill: '#e7c930' }} />
                <path className="b" d="M9.6 8.833 9.021 8.6a22.797 22.797 0 0 0-2.138-.774 18.44 18.44 0 0 0-1.1-.3h-.012a.246.246 0 0 0-.186.448l.01.006c.325.2.656.392.991.573q.281.15.564.291a.245.245 0 0 1 0 .439q-.285.141-.564.292c-.335.18-.667.369-.992.573l-.016.01a.246.246 0 0 0 .187.447h.018c.374-.088.741-.19 1.105-.3s.723-.234 1.079-.362c.179-.064.355-.134.532-.2l.526-.213.573-.232a.246.246 0 0 0 .002-.465zM18.81 9.844a.182.182 0 0 1-.331.1 2.026 2.026 0 0 0-.568-.567 1.732 1.732 0 0 0-1.916 0 2.016 2.016 0 0 0-.571.569.182.182 0 0 1-.331-.1 1.632 1.632 0 0 1 .346-1.023 1.927 1.927 0 0 1 3.026 0 1.64 1.64 0 0 1 .345 1.021z" />
              </svg>
            </button>
          </div>
          <div className="flex-grow space-x-1 flex items-center h-full ">
            <div className=' w-full h-full flex items-center'>
              <div className='w-full h-full border border-gray-300 px-2 rounded-2xl shadow-inner shadow-slate-300 pt-1'>
                <textarea
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={handleChange}
                  className=" text-gray-700 pt-1 text-sm w-full h-full shadow-inner focus:outline-none focus:ring-0 focus:ring-none 
                  resize-none focus:ring-none "
                  rows="1"
                  style={{ overflowY: 'hidden' }}
                />
              </div>
            </div>
            <button className="group relative">
              <PaperAirplaneIcon
                title="Gửi tin nhắn"
                className="h-10 w-10 p-1 rounded-full text-blue-400 hover:scale-110 hover:shadow-sm hover:shadow-blue-400/50 transition-all duration-300 hover:bg-blue-100 hover:text-blue-700 active:scale-95 active:transition-all"
              />
              <span className="absolute z-30 right-0 bottom-full w-max p-2 bg-gray-500 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Gửi tin nhắn
              </span>
            </button>
          </div>

        </div>

      </div>
      {/* Rightbar */}
      {
        isRightbarOpen1 && (
          <div ref={MessMenuRight} className={rightbarClass}>
            <div className={`${isRightbarOpen ? 'block' : 'hidden lg:block'} border-l shadow-xl h-full`}>
              <h2 className="text-lg font-semibold">Thông tin</h2>
              <p className="mt-4">Chi tiết người dùng...</p>
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Messages;