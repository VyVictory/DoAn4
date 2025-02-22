import { useEffect, useState, useRef } from "react";
import avt from "../../img/DefaultAvatar.jpg";
import { useAuth } from "../AuthProvider";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import {
  Bars3Icon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function Profile() {
  const [scrollPhase, setScrollPhase] = useState(0);
  const { profile, isLoadingProfile } = useAuth();
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const topHeight = document.getElementById("top").offsetHeight;
      const leftHeight = leftRef.current.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY < topHeight) {
        setScrollPhase(0); // Cuộn trong top
      } else if (scrollY < leftHeight - window.innerHeight) {
        setScrollPhase(2); // Cuộn trong left
      } else {
        setScrollPhase(2); // Cuộn trong right, left giữ nguyên
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="NavbarUser flex flex-col w-full">
      {/* Top Section */}
      <div id="top" className="min-h20   flex justify-center">
        <div className="w-full  h-full flex items-center flex-col  ">
          <div
            className=" bg-red-400 w-full rounded-b-lg profileW flex-shrink-0"
            style={{ height: "50vh" }}
          >
            {/* Lớp phủ màu xám khi hover */}
            <div>a</div>
            <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-5"></span>
          </div>
          <div className="w-full profileW px-10 z-10">
            <div className="w-full  flex flex-col md:flex-row  md:justify-between justify-center ">
              <div className="flex md:flex-row items-center  md:space-x-3 flex-col">
                <button
                  className="w-36 h-36 border-4 border-white rounded-full"
                  style={{ marginTop: "-38px" }}
                >
                  <img className=" w-full rounded-full" src={avt} alt="" />
                </button>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col">
                    <strong className="text-3xl">{profile?.name}</strong>
                    <div className="text-center">0 followers ❁ 9 following</div>
                  </div>
                  <div className="">
                    {[...Array(6)].map((_, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 border-white border rounded-full"
                        style={index > 0 ? { marginLeft: "-8px" } : {}}
                      >
                        <img className="w-full rounded-full" src={avt} alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row md:flex-col mb-2 md:mb-0 items-center justify-center space-y-2">
                <button className="bg-gray-50 hover:bg-violet-50 px-2 py-2 rounded-md flex items-center transition-transform duration-200 hover:scale-110 active:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6 transition-transform duration-200 hover:scale-125 active:scale-125"
                    xmlSpace="preserve"
                    fill="currentColor"
                  >
                    <path
                      transform="rotate(-134.999 213.322 297.091)"
                      fill="#e57225"
                      d="M125.707 151.146h175.23v291.887h-175.23z"
                    />
                    <path
                      transform="rotate(-134.999 256.764 340.521)"
                      fill="#f9ae41"
                      d="M226.956 194.576h59.614v291.887h-59.614z"
                    />
                    <path
                      transform="rotate(-134.999 214.6 298.377)"
                      fill="#f98821"
                      d="M184.792 152.431h59.614v291.887h-59.614z"
                    />
                    <path
                      fill="#f23b3b"
                      d="m445.026 195.43 33.117-33.118c35.066-35.063 35.066-91.912-.002-126.978C443.085.274 386.233.272 351.168 35.34l-33.115 33.115L445.026 195.43z"
                    />
                    <path
                      fill="#f4cf9d"
                      d="M10.336 466.608c.125-.548 37.674-127.729 37.834-128.268l126.463 126.465-130.44 35.659c-15.715 4.604-45.919 7.274-33.857-33.856z"
                    />
                    <path
                      fill="#51504e"
                      d="m62.323 473.6-41.752-41.753c-.159.538-10.11 34.215-10.235 34.76-12.062 41.13 18.142 38.461 33.856 33.857l11.098-3.032 7.033-23.832z"
                    />
                  </svg>
                  Edit
                </button>
                <button className="hover:bg-violet-50 min-w-16 justify-center px-2 py-1 rounded-md flex items-center ">
                  <ChevronDownIcon className="w-8 h-8 text-gray-500 transition-transform duration-200 hover:scale-125 active:scale-125 hover:text-violet-400" />
                </button>
              </div>
            </div>
            <div className="w-full border-b border-gray-300"></div>
          </div>

          <div className="w-full  shadow-gray-400 z-10 flex justify-between items-center profileW ">
            <div className="w-full  z-10 py-1 px-10 flex flex-row justify-between">
              <div className="flex flex-row">
                <button className="hover:bg-gray-100 p-3 rounded-xl whitespace-nowrap">
                  Posts
                </button>
                <button className="hover:bg-gray-100 p-3 rounded-xl whitespace-nowrap">
                  About
                </button>
                <button className="hover:bg-gray-100 p-3 rounded-xl whitespace-nowrap hidden md:block">
                  Friends
                </button>

                {/* Ẩn menu khi thu nhỏ */}
                <button className="hover:bg-gray-100 p-3 rounded-xl whitespace-nowrap hidden md:block">
                  Videos
                </button>
                <button className="hover:bg-gray-100 p-3 rounded-xl whitespace-nowrap hidden md:block">
                  Groups
                </button>

                {/* Dropdown menu */}
                <Menu as="div" className="relative inline-block text-left ">
                  <Menu.Button className="hover:bg-gray-200 p-3 rounded-xl whitespace-nowrap flex items-center md:hidden">
                    More <ChevronDownIcon className="w-5 h-5 ml-1" />
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-1 z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Videos
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Groups
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Friends
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <button className="md:mr-6">
                <Bars3Icon className="h-6 w-6 hover:text-blue-400 hover:scale-125" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div
          ref={leftRef}
          className={` bg-gray-300 min-h-2  transition-all ${
            scrollPhase === 2 ? "fixed bottom-0 w-1/2" : "relative w-full"
          }`}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className=" bg-white border rounded-md w-full p-3 shadowContent"
            >
              Helper text # Add an extra helper text to each checkbox element
              inside the dropdown menu list with this example. Helper text # Add
              an extra helper text to each checkbox element inside the dropdown
              menu list with this example.{index}
            </div>
          ))}
        </div>
        <div className="flex w-full">
          <div
            ref={rightRef}
            className={`w-full bg-blue-300 h-[1500px]  ${
              scrollPhase === 2 ? "w-full" : ""
            }`}
          >
            Right Section (Scrolls last)
            {[...Array(13)].map((_, index) => (
              <div
                key={index}
                className=" bg-white border rounded-md w-full p-3 shadowContent"
              >
                Helper text # Add an extra helper text to each checkbox element
                inside the dropdown menu list with this example. Helper text #
                Add an extra helper text to each checkbox element inside the
                dropdown menu list with this example.
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
