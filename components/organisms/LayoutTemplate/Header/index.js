import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineLightMode, MdDarkMode, MdEmail } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { ThemContext } from "common/context";
import { dataMenu } from "common/data";
import Social from "components/atoms/Social";
import ProfileMenu from "./Profile/index";
import useOnClickOutside from "common/useOnClickOutside";
import { FiPhone } from "react-icons/fi";

export default function Header({ socialLayoutLeft }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemContext);
  const [isToggleOn, setIsToggleOn] = useState(true);
  const router = useRouter();
  const [tokenAndUser, setTokenAndUser] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokenAndUser(localStorage.getItem("login"));
    }
  }, []);
  // slice '/' url
  const routerAsPath = () => {
    let result;
    if (router.asPath.length > 2 && router.asPath.endsWith("/")) {
      result = router.asPath.slice(0, -1);
    } else {
      result = router.asPath;
    }
    return result;
  };
  const onSwitchAction = () => {
    setTheme(!theme);
    setIsToggleOn(!isToggleOn);
  };
  const ref = useRef();
  useOnClickOutside(ref, setOpen);
  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 z-50 w-full dark:bg-[#272b44] bg-white text-gleads-oxfordBlue-900 shadow-md  "
      id="header"
    >
      <nav className="container">
        <div className="row py-4 items-center">
          <div className="lg:col-1 col-3 h-10">
            <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
          </div>
          <div className=" lg:col-11 col-9 flex justify-end items-center h-10">
            <div className="lg:col-7 hidden lg:block ">
              <ul className="flex items-center">
                {dataMenu.map((item, index) => {
                  return (
                    <li key={index} className="mr-14 last:mr-0 ">
                      <Link
                        href={item.href}
                        className={` transition-all duration-300 ease-in-out ${
                          routerAsPath() === item.href
                            ? "dark:text-main text-blue-700 "
                            : "dark:text-white "
                        }  "  block cursor-pointer font-semibold hover:text-main  before:transition-all before:delay-150 before:duration-150 before:ease-in-out 
                         relative before:absolute before:left-0 before:-bottom-1 before:w-0 hover:before:w-full before:h-0.5  before:bg-main`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <!-- dark and light mode toggle --> */}
            <div className=" lg:col-3 h-full ">
              <div className="flex justify-between items-center h-full">
                {/* dark mode */}
                <button
                  onClick={() => onSwitchAction()}
                  type="button"
                  className=" bg-white rounded-full p-2 lg:mr-4 mr-10 shadow-xl text-black hover:bg-main  transition-all hover:duration-150 delay-200 ease-in-out"
                >
                  {isToggleOn ? (
                    <MdDarkMode className=" transition ease-in-out" />
                  ) : (
                    <MdOutlineLightMode className=" transition ease-in-out" />
                  )}
                </button>
                <div className="flex items-center"></div>
                {/* list */}
                <div
                  className=" hidden md:block  mr-10  relative font-poppins font-semibold  before:content-[''] before:h-0.5 before:w-3
             dark:before:bg-main before:bg-blue-700 before:absolute before:bottom-[11.5px] before:-left-6"
                >
                  <a
                    className="dark:text-main transition-all duration-300 ease-in-out font-medium cursor-pointer text-blue-700"
                    href="tel:0337 368 371"
                  >
                    0337 368 371
                  </a>
                </div>
                {/* button menu */}
                <button
                  className="w-8 h-8 relative block lg:hidden"
                  onClick={() => setOpen(!open)}
                >
                  <div
                    className={`${
                      open ? "rotate-45 absolute top-[15px] " : "mb-2"
                    } h-0.5 dark:bg-white bg-black w-full transition-all duration-200 ease-in-out`}
                  ></div>
                  <div
                    className={`${
                      open ? "hidden" : "block mb-2"
                    } h-0.5 dark:bg-white bg-black w-full transition-all duration-200 ease-in-out`}
                  ></div>
                  <div
                    className={`${
                      open ? "-rotate-45   " : ""
                    } h-0.5 dark:bg-white bg-black w-full transition-all duration-200 ease-in-out`}
                  ></div>
                </button>
                {tokenAndUser === "true" ? <ProfileMenu /> : null}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* nav left */}
      {socialLayoutLeft && (
        <div className="absolute w-[84px] bark:bg-[#272b44] dark:shadow bg-transparent  h-[calc(100vh-80px)] z-20  hidden lg:block">
          <Social className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
      {/* mobile */}
      <div
        className={`${
          open ? "-right-2 opacity-100" : "-right-48 opacity-0"
        } fixed transition-all duration-200 top-20  z-20  `}
      >
        <ul className="flex-col justify-center px-3 lg:hidden block ">
          {dataMenu.map((item, index) => {
            return (
              <Link
                className="flex items-center shadow-2xl p-4 dark:text-white text-black rounded-lg dark:bg-[#272b44] bg-white  cursor-pointer text-sm font-semibold  mb-4  "
                key={index}
                onClick={() => setOpen(!open)}
                href={item.href}
              >
                <div className="text-green-500 mr-2">{item.icon}</div>
                {item.name}
              </Link>
            );
          })}
        </ul>
        {/* <h3 className="text-3xl  text-main font-Playfair font-bold mb-6   text-center">
          Contact
        </h3>
        <p className="mb-10 ">
          Please see the information below for more details about me
        </p>
        <a href="tel:0337368371" className="inline-flex items-center mb-2">
          <FiPhone className="mr-4" color="#08D565" />
          0337368371
        </a>
        <a className="inline-flex items-center mb-2">
          <MdEmail className="mr-4" color="#08D565" /> ngoctri2207@gmail.com
        </a>
        <a className="inline-flex items-center mb-2">
          <GoLocation className="mr-4" color="#08D565" /> Ho Chi Minh City
        </a> */}
      </div>
    </header>
  );
}
