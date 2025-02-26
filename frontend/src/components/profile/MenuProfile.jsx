import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import CustomizedMenus from "./CustomizedMenus";
import Button from "@mui/material/Button";
import CustomButton from "../button/CustomButton";
const MenuPost = () => {
  return (
    <div className="w-full shadow-gray-400 z-10 flex justify-between items-center">
      <div className="w-full flex justify-between">
        <div className="space-x-2 flex flex-row flex-wrap">
          {["Bài viết", "About", "Bạn bè", "Videos", "Nhóm"].map(
            (item, index) => (
              <div
                key={index}
                className="py-2 pb-1 border-b-4 border-violet-300"
              >
                <button
                  key={index}
                  className={`hover:bg-gray-100 p-3 rounded-xl min-w-24 ${
                    index > 2 ? "hidden md:block" : ""
                  } `}
                >
                  {item}
                </button>
              </div>
            )
          )}
          <CustomizedMenus css="md:hidden min-w-24" />
        </div>
        <button className="md:mr-6 ">
          <Bars3Icon className="h-8 w-8 hover:text-blue-400 hover:scale-125 bg-gray-50 hover:bg-gray-100 hover:rounded-md rounded-md p-1" />
        </button>
      </div>
    </div>
  );
};

export default MenuPost;
