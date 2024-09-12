import React, { useEffect, useState } from "react";
import { Button, Hero } from "react-daisyui";
import { FaHeadphones } from "react-icons/fa";
import { employee } from "../../assets/image-represent";

const NotificationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("popupShown")) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem("popupShown", "true");
  };
  return (
    <div>
      {isVisible && (
        <div>
          <div
            id="popup-overlay"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 cursor-pointer "
            onClick={closePopup}
          ></div>

          <div
            id="popup"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 max-w-[90%] max-h-[90%] overflow-auto"
          >
            <div className="flex flex-col justify-center items-end  border border-white dark:border-opacity-50 rounded-lg">
              {/* IMAGE BANNER */}
              <Hero>
                <Hero.Content>
                  <img
                    src={employee}
                    className="max-w-sm rounded-lg shadow-2xl w-[200px] h-[240px] md:w-[400px] md:h-[340px] xl:w-[500px] xl:h-[270px] object-cover"
                  />
                  <div>
                    <div className="bg-primary bg-opacity-15 dark:bg-white dark:bg-opacity-25 shadow-headerMenu rounded-xl p-2">
                      <h1 className="text-md md:text-3xl xl:text-5xl font-bold text-bg-image ">
                        Chào Mừng Bạn Đến Với FPT Train!
                      </h1>
                    </div>
                    <p className="text-[10px] md:text-lg md:py-6 text-black  py-1">
                      Chúng tôi rất vui mừng chào đón bạn! Tại đây, bạn có thể
                      dễ dàng tìm kiếm và đặt vé tàu hoả cho hành trình của
                      mình. Hãy khám phá các tuyến đường và ưu đãi đặc biệt. Nếu
                      cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi. Chúc bạn
                      có một chuyến đi thú vị!
                    </p>
                    <Button
                      onClick={closePopup}
                      color="primary"
                      className="text-white border border-white  dark:border-opacity-50 float-end"
                    >
                      Tư Vấn Khách Hàng <FaHeadphones />
                    </Button>
                  </div>
                </Hero.Content>
              </Hero>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
