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
import "../../css/post.css";
const Profile = () => {
  const { profile } = useAuth();
  const scrollRef = useRef(null);
  const targetRef = useRef(null);
  const targetRefH = useRef(null);

  const [isPassed, setIsPassed] = useState(false);
  const [height, setHeight] = useState(0);
  // Cập nhật chiều cao
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (targetRefH.current) {
        setHeight(targetRefH.current.offsetHeight);
      }
    });
    // console.log("dawdaw");
    targetRefH.current && observer.observe(targetRefH.current);
    return () => observer.disconnect();
  }, []);
  // Cuộn đến phần tử khi render
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const violetRef = useRef(null);
  const [heightBG, setHeightBG] = useState(0);

  useEffect(() => {
    if (violetRef.current) {
      setHeightBG(violetRef.current.offsetHeight);
    }
  }, []);
  // Xử lý sự kiện cuộn
  const handleScroll = useCallback(() => {
    if (targetRef.current && height != 0) {
      const rect = targetRef.current.getBoundingClientRect();
      setIsPassed(rect.bottom - window.innerHeight < 0);
    }
  }, [height]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const followersInfo = useMemo(
    () => <div className="text-center">0 followers ❁ 9 following</div>,
    []
  );

  return (
    <div className="NavbarUser ">
      <div className="w-full  flex-col relative min-h-screen ">
        <div className="w-full  flex items-center flex-col bg-white shadow-sm  shadow-slate-300"> 
          <div className="profileW w-full z-10 px-2 ">
            <button className="relative h-[40vh] bg-red-400 w-full rounded-b-lg profileW flex-shrink z-0">
              <div ref={scrollRef}></div>
              <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 hover:opacity-5"></span>
            </button>
            <div className=" flex flex-col md:flex-row md:justify-between justify-center mx-10 pb-3 border-b">
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
                  Edit
                </button>
                <button className="hover:bg-violet-50 min-w-16 justify-center px-2 py-1 rounded-md flex items-center">
                  <ChevronDownIcon className="w-8 h-8 text-gray-500 transition-transform duration-200 hover:scale-125 hover:text-violet-400" />
                </button>
              </div>
            </div>
            <div className="w-full shadow-gray-400 z-10 flex justify-between items-center">
              <div className="w-full py-1 flex justify-between">
                <div className="flex flex-row space-x-2">
                  {["Posts", "About", "Friends", "Videos", "Groups"].map(
                    (item, index) => (
                      <button
                        key={index}
                        className={`hover:bg-gray-100 p-3 rounded-xl  ${
                          index > 2 ? "hidden md:block" : ""
                        } `}
                      >
                        {item}
                      </button>
                    )
                  )}
                  <Menu
                    as="div"
                    className="relative inline-block text-left sm:hidden"
                  >
                    <Menu.Button className="hover:bg-gray-200 p-3 rounded-xl flex items-center">
                      More <ChevronDownIcon className="w-5 h-5 ml-1" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-[100]  transition-opacity ">
                      {["Videos", "Groups"].map((item, index) => (
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
          </div>
        </div>

        {/* left lăn hết mới được lăn right*/}
        <div
          className="relative flex w-full justify-center  " //bg-black
          style={{ minHeight: heightBG }}
        >
          {/* left */}
          <div className={`h-full  w-full min-h-screen  flex justify-center `}>
            <div
              ref={targetRefH}
              className={`pb-4 space-y-4 hidden  w-full md:flex profileW py-4 flex-row ${
                isPassed ? "fixed bottom-0" : ""
              }`}
            >
              <div className="flex flex-col  w-2/5 space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    className={`border border-gray-200 bg-white rounded-lg Post p-2 ShadowContent `}
                    key={index}
                  >
                    HÌNH ẢNH VÀ VIDEO BẠN ĐANG XEM LÀ 100% TỪ GAME Tặng VIPcode:
                    VIP666 l DGDL999 l RONGTHAN Webgame chơi Online ngay trên PC
                    Game MMO Fantasy phép thuật, cơ giáp và luyện rồng Luyện
                    BOSS tay to, rơi đồ kín màn hình Bản đồ siêu lớn, khám phá
                    miễn phí Auto tiện ích miễn phí, treo máy dễ dàng, cân bằng
                    học tập và làm việc.{index}
                  </div>
                ))}
              </div>
              <div className="  min-h-screen w-3/5 hidden md:block"></div>
            </div>
          </div>
          <div className="absolute">
            <div
              className="bg-violet-600 "
              style={{ height: `${height}px` }}
            ></div>
            <div className="w-full" ref={targetRef}></div>
          </div>
          {/* right */}
          <div
            ref={violetRef}
            className="absolute py-4"
            style={{ pointerEvents: "none" }}
          >
            <div className="  w-full flex profileW justify-center md:pl-8">
              <div className="flex flex-row justify-center">
                {/* // độn div left */}
                <div className="  min-h-screen w-2/5 hidden md:block"></div>
                <div
                  className="flex flex-col space-y-4   md:w-3/5 px-6 md:px-0"
                  style={{ pointerEvents: "auto" }}
                >
                  {[...Array(20)].map((_, index) => (
                    <div
                      className="border border-gray-200 bg-white rounded-lg Post p-2 w-full ShadowContent"
                      key={index}
                    >
                      HÌNH ẢNH VÀ VIDEO BẠN ĐANG XEM LÀ 100% TỪ GAME Tặng
                      VIPcode: VIP666 l DGDL999 l RONGTHAN Webgame chơi Online
                      ngay trên PC Game MMO Fantasy phép thuật, cơ giáp và luyện
                      rồng Luyện BOSS tay to, rơi đồ kín màn hình Bản đồ siêu
                      lớn, khám phá miễn phí Auto tiện ích miễn phí, treo máy dễ
                      dàng, cân bằng học tập và làm việc.
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
