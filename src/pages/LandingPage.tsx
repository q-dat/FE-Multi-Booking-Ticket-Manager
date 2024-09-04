import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Select } from "react-daisyui";
import InputForm from "../components/InputForm";

const LandingPage: React.FC = () => {
  const [value, setValue] = useState("default");
  return (
    <div>
      <Header />
      <div>
        <div className="">
          <img
            className="w-full"
            src="https://www.omio.com/gcs-proxy/static_content_repo/web/content/rest/hero/front_page-dw.jpg"
            alt="banner"
          />
        </div>
        <div className="flex flex-grow justify-center items-center  relative px-20 -top-10">
          <div className="flex flex-row bg-white rounded-lg px-10 py-8 shadow-md space-x-2">
            <InputForm type={""} placeholder="Điểm Khởi Hành" />
            <InputForm type={"text"} placeholder={"Điểm Đến"} />
            <InputForm type={"date"} placeholder={"Ngày đi"} />
            <InputForm type={"date"} placeholder={"Ngày về"} />

            <Select
              className="focus:outline-none border border-primary focus:border-primary"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            >
              <option value={"default"} disabled>
                Chọn Lứa Tuổi
              </option>
              <option value={"Người Lớn"}>Người Nhỏ</option>
              <option value={"Người Lớn"}>Người Vừa</option>
              <option value={"Người Lớn"}>Người Lớn</option>
            </Select>

            <Button className="bg-primary hover:bg-white hover:text-primary hover:border-primary text-white">
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
