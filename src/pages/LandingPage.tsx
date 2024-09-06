import React, { useState } from "react";
import { Button, Select } from "react-daisyui";
import InputForm from "../components/LadingPage/InputForm";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import {
  Banner,
  sectionOne,
  sectionThree,
  sectionTwo,
} from "../assets/image-represent";
import { useTranslation } from "react-i18next";
import HeaderResponsive from "../components/LadingPage/HeaderResponsive";

const LandingPage: React.FC = () => {
  //Translation
  const { t } = useTranslation();

  const [value, setValue] = useState("default");
  return (
    <div>
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className=" relative">
        <div className=" absolute top-[40%] left-[20%]">
          <p className="font-bold text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-white to-white dark:from-[#122969] dark:to-gray-100">
            {t("LandingPage.BannerTitle")}
          </p>
          <p className="font-light text-md text-transparent bg-clip-text bg-gradient-to-r from-white to-white dark:from-[#122969] dark:to-[#122969] ">
            {t("LandingPage.BannerSubtitle")}
          </p>
        </div>
        {/* Banner IMG */}
        <img src={Banner} alt="Banner" />
      </div>
      {/* Form */}
      <div className=" flex flex-grow justify-center items-center  relative px-20 -top-10">
        <div className="flex flex-row space-x-2 bg-white md:space-x-0 justify-center items-center dark:bg-gray-700 rounded-lg px-10 py-8 shadow-md">
          <InputForm
            className=" rounded-r-none"
            type={""}
            placeholder={`${t("LandingPage.DeparturePlaceholder")}`}
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden md:block" />
          <InputForm
            className=" rounded-none"
            type={"text"}
            placeholder={`${t("LandingPage.DestinationPlaceholder")}`}
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden md:block" />
          <InputForm
            className=" rounded-none"
            type={"date"}
            placeholder={`${t("LandingPage.DepartureDatePlaceholder")}`}
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden md:block" />
          <InputForm
            className=" rounded-none"
            type={"date"}
            placeholder={`${t("LandingPage.ReturnDatePlaceholder")}`}
          />{" "}
          <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden md:block" />
          <Select
            className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-l-none focus:outline-none border border-opacity-50 border-gray-700 focus:border-primary dark:border-primary dark:focus:border-white "
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            <option value={"default"} disabled>
              {t("LandingPage.AgeSelectDefault")}
            </option>
            <option value={"Người Nhỏ"}>Người Nhỏ</option>
            <option value={"Người Vừa"}>Người Vừa</option>
            <option value={"Người Lớn"}>Người Lớn</option>
          </Select>
          <div>
            <Button className="ml-3 bg-primary hover:bg-white text-sm hover:text-primary hover:border-primary text-white dark:hover:bg-gray-700">
              <IoSearch />
              {t("LandingPage.SearchButton")}
            </Button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="flex flex-row justify-center items-center gap-20">
        <div className="w-[350px]">
          <img width={300} src={sectionOne} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionOneTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionOneDescription")}
          </p>
        </div>
        <div className="w-[350px]">
          <img width={300} src={sectionTwo} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionTwoTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionTwoDescription")}
          </p>
        </div>
        <div className="w-[350px]">
          <img width={300} src={sectionThree} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionThreeTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionThreeDescription")}
          </p>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default LandingPage;
