import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import CustomizedMenus from "./CustomizedMenus";

const MenuPost = () => {
  const location = useLocation(); // Lấy đường dẫn URL hiện tại

  const menuItems = [
    { name: "Bài viết", link: "/profile/posts" },
    { name: "About", link: "/profile/about" },
    { name: "Bạn bè", link: "/profile/friends" },
    { name: "Videos", link: "/profile/videos" },
    { name: "Nhóm", link: "/profile/groups" },
  ];

  return (
    <div className="w-full shadow-gray-400 z-10 flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="space-x-2 flex flex-row flex-wrap">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link; // Kiểm tra trang hiện tại
            return (
              <div
                key={index}
                className={`py-2 ${
                  isActive ? "pb-1 border-b-4 border-violet-300" : ""
                }`}
              >
                <Link
                  to={`${item.link}${location.search}`} // Giữ nguyên query parameters
                  className={`hover:bg-gray-100 p-3 rounded-xl min-w-24 block text-center ${
                    index > 2 ? "hidden md:block" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
          <CustomizedMenus menu={menuItems} css="md:hidden min-w-24" />
        </div>
        <button className="md:mr-6">
          <Bars3Icon className="h-8 w-8 hover:text-blue-400 hover:scale-125 bg-gray-50 hover:bg-gray-100 hover:rounded-md rounded-md p-1" />
        </button>
      </div>
    </div>
  );
};

export default MenuPost;
