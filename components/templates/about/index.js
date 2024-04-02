import React, { useContext } from "react";
import SlideScroll from "components/organisms/SlideScroll";
import Image from "next/image";
import CardMe from "components/molecules/CardMe";
import { ThemContext } from "common/context";

const About = ({ dataExperience, dataInfo, dataSocial }) => {
  const { theme } = useContext(ThemContext);

  return (
    <section className="section-tempale lg:pt-36 pt-10 2xl:h-screen overflow-hidden">
      <div className="container">
        <div className="row ">
          <CardMe data={dataSocial} />
          <div className="about-text lg:col-8 col-12 lg:-mt-4 ">
            <div className="dark:text-yellow  text-xl leading-9 lg:font-medium">
              {dataInfo.who}
            </div>
            <div className=" text-2xl leading-10 lg:font-medium dark:text-gray-300">
              {dataInfo.im}
              <span className="dark:text-yellow lg:font-medium">
                {dataInfo.position}
              </span>
            </div>
            <div className=" pb-7 border-b border-gray-700 dark:border-gray-50 dark:text-gray-300 text-sm">
              <p className="mb-3 leading-7 ">{dataInfo.company}</p>
              <ul>
                {dataInfo.responsibilities.map((item, index) => {
                  return (
                    <li key={index} className=" mb-2">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <h3 className="text-2xl font-medium mt-6  dark:text-white">
              {dataExperience.title}
            </h3>
            <SlideScroll data={dataExperience.list} />
          </div>
        </div>
        {theme && (
          <>
            <Image
              className="absolute right-0 top-0 z-0 lg:block hidden  "
              src="/assets/bg-about-tr.png"
              width={206}
              height={313}
              alt="a"
            />
          </>
        )}
      </div>
    </section>
  );
};
export default About;
