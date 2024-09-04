import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Select } from "react-daisyui";
import InputForm from "../components/InputForm";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const LandingPage: React.FC = () => {
  const [value, setValue] = useState("default");
  return (
    <div>
      <Header />
      {/* Banner */}
      <div className=" relative">
        <div className=" absolute top-[40%] left-[20%]">
        <p className="font-bold text-[40px] text-white dark:text-gray-700">Đặt Vé Tàu Hoả Online</p>
        <p className="font-light text-md text-white dark:text-gray-700">Sự Lựa Chọn Tốt Nhất Cho Hành Trình Của Bạn</p>
        </div>
        <img
          className="w-full"
          src="https://www.omio.com/gcs-proxy/static_content_repo/web/content/rest/hero/front_page-dw.jpg"
          alt="banner"
        />
      </div>
      {/* Form */}
      <div className="flex flex-grow justify-center items-center  relative px-20 -top-10">
        <div className="flex flex-row justify-center items-center dark:bg-gray-500 bg-white rounded-lg px-10 py-8 shadow-md">
          <InputForm
            className=" rounded-r-none"
            type={""}
            placeholder="Điểm Khởi Hành"
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white" />
          <InputForm
            className=" rounded-none"
            type={"text"}
            placeholder={"Điểm Đến"}
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white" />
          
          <InputForm
            className=" rounded-none"
            type={"date"}
            placeholder={"Ngày đi"}
          />
          <MdOutlineArrowRightAlt className="text-primary dark:text-white" />
          
          <InputForm
            className=" rounded-none"
            type={"date"}
            placeholder={"Ngày về"}
          />{" "}
          <MdOutlineArrowRightAlt className="text-primary dark:text-white" />
          
          <Select
            className="bg-white dark:bg-gray-500 text-black dark:text-white rounded-l-none focus:outline-none border border-opacity-50 border-gray-700 focus:border-primary dark:border-primary dark:focus:border-gray-700 "
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            <option value={"default"} disabled>
              Chọn Lứa Tuổi
            </option>
            <option value={"Người Nhỏ"}>Người Nhỏ</option>
            <option value={"Người Vừa"}>Người Vừa</option>
            <option value={"Người Lớn"}>Người Lớn</option>
          </Select>
          <Button className="ml-3 bg-primary hover:bg-white text-sm hover:text-primary hover:border-primary text-white dark:hover:bg-gray-700">
            <IoSearch />
            Tìm Kiếm
          </Button>
        </div>
      </div>
      {/* Section */}
      <div className="flex flex-row justify-center items-center gap-20">
        <div className="w-[350px]">
          <img
            width={300}
            src="https://www.omio.com/gcs-proxy/static_content_repo/web/content/lps/SeoHomePageAssets/sectionOne.svg"
            alt=""
          />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            So sánh giá vé máy bay và tàu hỏa giá rẻ với xe buýt
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            Với FPT Train, bạn có thể so sánh vé máy bay với vé tàu hỏa và vé xe buýt.
          </p>
        </div>
        <div className="w-[350px]">
          <img
            width={300}
            src="https://www.omio.com/gcs-proxy/static_content_repo/web/content/lps/SeoHomePageAssets/sectionTwo.svg"
            alt=""
          />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            Tìm vé giá rẻ một cách dễ dàng
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            Tìm kiếm và đặt vé máy bay, xe buýt, phà và tàu hỏa giá rẻ! Khám phá
            những tấm vé tốt nhất dành cho bạn với  FPT Train.
          </p>
        </div>
        <div className="w-[350px]">
          <img
            width={300}
            src="https://www.omio.com/gcs-proxy/static_content_repo/web/content/lps/SeoHomePageAssets/sectionThree.svg"
            alt=""
          />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            Lịch trình và vé cho mọi nhu cầu du lịch của bạn
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            Chưa bao giờ việc đặt vé tàu, vé xe buýt, vé máy bay hoặc vé phà lại
            dễ dàng đến thế.
          </p>
        </div>
      </div>
      {/*  */}
      <div className="h-[900px] bg-black">
        HI
      </div>
    </div>
  );
};

export default LandingPage;
