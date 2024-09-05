import React, { useEffect, useState } from "react";

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
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 cursor-pointer"
            onClick={closePopup}
          ></div>

          <div
            id="popup"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass p-4 rounded-lg shadow-lg z-50 max-w-[90%] max-h-[90%] overflow-auto"
          >
            <div className="flex flex-col justify-center items-end">
              {/* IMAGE BANNER */}
              <img
                src=""
                alt="popup"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
                className="rounded-lg min-w-[300px] w-auto h-[500px]"
              />

              <a href="#contact-form">
                <button
                  onClick={closePopup}
                  className="mt-5 px-5 py-2 bg-white text-black border border-white cursor-pointer rounded-md text-xs"
                >
                  LIÊN HỆ NGAY
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
