import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { DarkModeContext } from "common/context";
import Social from "components/atoms/Social";
import ProfileMenu from "./Profile/index";
import useOnClickOutside from "common/useOnClickOutside";

import i18nextConfig from "../../../../next-i18next.config";
import SelectSwitchLanguage from "components/molecules/SelectSwitchLanguage";
import LinkComponent from "components/molecules/Link";
import MapIconToComponent from "../Header/Icons";

export default function Header({ socialLayoutLeft, dataMenu }) {
  const [open, setOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isToggleOn, setIsToggleOn] = useState(true);
  const router = useRouter();
  const [tokenAndUser, setTokenAndUser] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTokenAndUser(localStorage.getItem("login"));
    }
  }, []);

  const onSwitchAction = () => {
    setDarkMode(!darkMode);
    setIsToggleOn(!isToggleOn);
  };
  const ref = useRef();
  useOnClickOutside(ref, setOpen);

  const checkLinkActive = (item) => {
    let result;
    if (router.asPath.length > 2 && router.asPath.endsWith("/")) {
      result = router.asPath.slice(0, -1);
    } else {
      result = router.asPath;
    }
    const lastSegment = `/${result.split("/").pop()}`;

    return (
      lastSegment === item.href ||
      (result === "/en" && item.href === "/") ||
      (result === "/vi" && item.href === "/")
    );
  };

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 z-50 w-full dark:bg-[#272b44] bg-white text-gleads-oxfordBlue-900 shadow-md  "
      id="header"
    >
      <nav className="container">
        <div className="row py-4 items-center">
          <div className="lg:col-1 col-2 h-10">
            <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
          </div>
          <div className=" lg:col-11 col-10 flex  lg:justify-start justify-end xl:justify-end items-center h-10">
            <div className="lg:col-8 xl:col-7 hidden lg:block ">
              <ul className="flex items-center">
                {Array.isArray(dataMenu) &&
                  dataMenu?.map((item, index) => {
                    return (
                      <li key={index} className="mr-10 lg:mr-14 last:mr-0 ">
                        <LinkComponent
                          href={item.href}
                          className={` transition-all duration-300 ease-in-out  ${
                            checkLinkActive(item)
                              ? "dark:text-main text-blue-700"
                              : "dark:text-white "
                          }  "  block cursor-pointer font-semibold hover:text-main  before:transition-all before:delay-150 before:duration-150 before:ease-in-out 
                         relative before:absolute before:left-0 before:-bottom-1 before:w-0 hover:before:w-full before:h-0.5  before:bg-main`}
                        >
                          {item.name}
                        </LinkComponent>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* <!-- dark and light mode toggle --> */}
            <div className="  col-auto h-full ">
              <div className="flex justify-between items-center h-full">
                {/* dark mode */}
                <button
                  onClick={() => onSwitchAction()}
                  type="button"
                  className=" dark:bg-white  bg-slate-200 rounded-full p-1.5 mr-4 shadow-xl text-black hover:bg-main  transition-all hover:duration-150 delay-200 ease-in-out"
                >
                  {isToggleOn ? (
                    <MdDarkMode className=" transition ease-in-out" />
                  ) : (
                    <MdOutlineLightMode className=" transition ease-in-out" />
                  )}
                </button>
                <SelectSwitchLanguage />
                <div>
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
                </div>
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
          {Array.isArray(dataMenu) &&
            dataMenu?.map((item, index) => {
              return (
                <li key={index}>
                  <LinkComponent
                    className="flex items-center shadow-2xl p-4 dark:text-white text-black rounded-lg dark:bg-[#272b44] bg-white  cursor-pointer text-sm font-semibold  mb-4  "
                    onClick={() => setOpen(!open)}
                    href={item.href}
                  >
                    {MapIconToComponent(item.icon)}
                    {item.name}
                  </LinkComponent>
                </li>
              );
            })}
        </ul>
      </div>
    </header>
  );
}
