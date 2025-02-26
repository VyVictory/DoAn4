import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "../../components/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  Bars3Icon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import avt from "../../img/DefaultAvatar.jpg";
import "../../css/post.css";
import Post from "./post/ContentProfile";
import pictureBG from "../../img/sky.webp";
import MenuProfile from "./MenuProfile";

const Profile = () => {
  const { profile, isLoadingProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoadingProfile);
    console.log(profile);
    if (!profile && isLoadingProfile == false) {
      navigate("/login");
    }
  }, [profile, navigate, isLoadingProfile]);

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const followersInfo = useMemo(
    () => <div className="text-center">0 followers ❁ 9 following</div>,
    []
  );

  return (
    <div className="NavbarUser ">
      <div className="w-full  flex-col relative min-h-screen ">
        <div className="w-full  flex items-center flex-col bg-white shadow-sm  shadow-slate-300">
          <div className="profileW w-full z-10 px-4">
            <button
              className="relative h-[40vh] w-full rounded-b-xl profileW flex-shrink z-0"
              style={{
                backgroundImage: `url(${pictureBG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div ref={scrollRef}></div>
              <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-20 rounded-b-xl"></span>
            </button>
            <div className=" flex flex-col md:flex-row md:justify-between justify-center mx-10 md:pb-3 border-b">
              <div className="flex md:flex-row items-center md:space-x-3 flex-col">
                <button className="w-36 h-36 border-4 border-white rounded-full -mt-9 z-10">
                  <img
                    className="w-full rounded-full"
                    src={avt}
                    alt="Profile"
                    loading="lazy"
                  />
                </button>
                <div className="flex flex-col items-center">
                  <strong className="text-3xl text-center md:text-start w-full ">
                    {profile?.firstName + profile?.lastName}
                  </strong>
                  {followersInfo}
                  <div>
                    {[...Array(6)].map((_, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 border-white border rounded-full -ml-2"
                      >
                        <img
                          className="w-full rounded-full"
                          src={avt}
                          alt=""
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row md:flex-col mb-2 md:mb-0 items-center justify-center space-y-2">
                <button className="bg-gray-50 hover:bg-violet-50 px-2 py-2 rounded-md flex items-center transition-transform duration-200 hover:scale-110">
                  <PencilIcon className="h-6 w-6 text-gray-500" />
                  Edit
                </button>
                <button className="bg-gray-50 hover:bg-violet-50 min-w-16 justify-center px-2 py-1 rounded-md flex items-center">
                  <ChevronDownIcon className="w-8 h-8 text-gray-500 transition-transform duration-200 hover:scale-125 hover:text-violet-400" />
                </button>
              </div>
            </div>
            <MenuProfile />
          </div>
        </div>

        {/* left lăn hết mới được lăn right*/}
        <Post />
      </div>
    </div>
  );
};

export default Profile;
