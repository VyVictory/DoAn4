import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "../../components/AuthProvider";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import avt from "../../img/DefaultAvatar.jpg";

const Profile = () => {
  const { profile } = useAuth();
  const scrollRef = useRef(null);
  const targetRef = useRef(null);
  const targetRefH = useRef(null);

  const [isPassed, setIsPassed] = useState(true);
  const [height, setHeight] = useState(0);

  // Cuộn đến phần tử khi render (mượt hơn với delay)
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  // Xử lý sự kiện cuộn một cách mượt mà với requestAnimationFrame
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setIsPassed(rect.bottom - window.innerHeight > 0);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Cập nhật chiều cao với ResizeObserver
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    if (targetRefH.current) observer.observe(targetRefH.current);
    return () => observer.disconnect();
  }, []);

  const followersInfo = useMemo(
    () => <div className="text-center">0 followers ❁ 9 following</div>,
    []
  );

  return (
    <div className="NavbarUser flex overflow-auto">
      <div className="w-full h-full flex items-center flex-col">
        <button className="relative h-[40vh] bg-red-400 w-full rounded-b-lg profileW flex-shrink-0">
          <div ref={scrollRef}></div>
          <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-5"></span>
        </button>

        <div className="w-full profileW px-10 z-10">
          <div className="flex flex-col md:flex-row md:justify-between justify-center">
            <div className="flex md:flex-row items-center md:space-x-3 flex-col">
              <button className="w-36 h-36 border-4 border-white rounded-full -mt-9">
                <img
                  className="w-full rounded-full"
                  src={avt}
                  alt="Profile"
                  loading="lazy"
                />
              </button>
              <div className="flex flex-col items-center">
                <strong className="text-3xl text-start w-full">
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
                Edit
              </button>
              <button className="hover:bg-violet-50 min-w-16 justify-center px-2 py-1 rounded-md flex items-center">
                <ChevronDownIcon className="w-8 h-8 text-gray-500 transition-transform duration-200 hover:scale-125 hover:text-violet-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-gray-300"></div>

        <div className="w-full shadow-gray-400 z-10 flex justify-between items-center profileW">
          <div className="w-full py-1 px-10 flex justify-between">
            <div className="flex flex-row space-x-2">
              {["Posts", "About", "Friends", "Videos", "Groups"].map(
                (item, index) => (
                  <button
                    key={index}
                    className="hover:bg-gray-100 p-3 rounded-xl hidden md:block"
                  >
                    {item}
                  </button>
                )
              )}
              <Menu
                as="div"
                className="relative inline-block text-left md:hidden"
              >
                <Menu.Button className="hover:bg-gray-200 p-3 rounded-xl flex items-center">
                  More <ChevronDownIcon className="w-5 h-5 ml-1" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-1 z-50">
                  {["Videos", "Groups", "Friends"].map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 rounded-md ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          {item}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <button className="md:mr-6">
              <Bars3Icon className="h-6 w-6 hover:text-blue-400 hover:scale-125" />
            </button>
          </div>
        </div>
        <div className="w-full shadow-lg h-1"></div>

        <div className="flex w-full ">
          <div className={`md:flex flex-col hidden md:w-1/2 items-end `}>
            <div
              ref={targetRefH}
              className={`${
                !isPassed ? "fixed bottom-0 w-1/2" : "w-full"
              } bg-violet-300 min-h-screen `}
            >
              {[...Array(12)].map((_, index) => (
                <div key={index}>
                  HÌNH ẢNH VÀ VIDEO BẠN ĐANG XEM LÀ 100% TỪ GAME Tặng VIPcode:
                  VIP666 l DGDL999 l RONGTHAN Webgame chơi Online ngay trên PC
                  Game MMO Fantasy phép thuật, cơ giáp và luyện rồng Luyện BOSS
                  tay to, rơi đồ kín màn hình Bản đồ siêu lớn, khám phá miễn phí
                  Auto tiện ích miễn phí, treo máy dễ dàng, cân bằng học tập và
                  làm việc.
                </div>
              ))}
            </div>
          </div>
          <div className="absolute">
            <div
              className="bg-violet-600"
              style={{ height: `${height}px` }}
            ></div>
            <div className="w-full" ref={targetRef}></div>
          </div>
          <div className="md:w-1/2 w-full items-start">
            <div className="profileContentW bg-gray-500 pr-2">
              {[...Array(200)].map((_, index) => (
                <div key={index}>
                  HÌNH ẢNH VÀ VIDEO BẠN ĐANG XEM LÀ 100% TỪ GAME Tặng VIPcode:
                  VIP666 l DGDL999 l RONGTHAN Webgame chơi Online ngay trên PC
                  Game MMO Fantasy phép thuật, cơ giáp và luyện rồng Luyện BOSS
                  tay to, rơi đồ kín màn hình Bản đồ siêu lớn, khám phá miễn phí
                  Auto tiện ích miễn phí, treo máy dễ dàng, cân bằng học tập và
                  làm việc.
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="fixed bottom-0 right-0">
          Trạng thái: {isPassed ? "True" : "False"} {height}
        </p>
      </div>
    </div>
  );
};

export default Profile;
