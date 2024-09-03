import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ContactForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (dropdownContentRef.current) {
      dropdownContentRef.current.style.maxHeight = isExpanded
        ? `${dropdownContentRef.current.scrollHeight}px`
        : "0";
    }
  }, [isExpanded]);

  return (
    <div className="fixed bottom-0 left-0 z-[99999]">
      <button
        className="toggle-btn border border-white text-white bg-primary text-xs rounded-md ml-1 p-2 flex items-center"
        onClick={toggleDropdown}
      >
        {isExpanded ? "Thu gọn ▼" : "Liên hệ ▲"}
      </button>
      <div
        ref={dropdownContentRef}
        className="dropdown-content transition-[max-height] duration-300 ease-out overflow-hidden mb-7"
        style={{
          maxHeight: isExpanded
            ? `${dropdownContentRef.current?.scrollHeight}px`
            : "0",
        }}
      >
        <Link className="ml-5 mt-5 relative inline-block" to="#">
          <span className=" animation-zoomBorder" />
          <img
            src="https://mamnonanan.edu.vn/wp-content/uploads/2024/08/Thông-tin-học-phí.png"
            alt="#"
            width="40"
            height="40"
            className="rounded-full"
          />
        </Link>
        <div className="block ml-5 mb-1">
          <Link target="_blank" to="https://zalo.me/0333133050">
            <img
              src="https://mamnonanan.edu.vn/wp-content/uploads/2024/08/Icon_of_Zalo.webp"
              alt="zalo-icon"
              width="40"
              height="40"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="block ml-5 mb-1">
          <Link
            target="_blank"
            to="https://www.messenger.com/t/quocdatstore.vn"
            rel="noopener noreferrer"
          >
            <img
              src="https://mamnonanan.edu.vn/wp-content/uploads/2024/08/icon-mess.webp"
              alt="messenger-icon"
              width="40"
              height="40"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="block ml-5 mb-1">
          <Link target="_blank" to="tel:0333133050" rel="noopener noreferrer">
            <img
              src="https://mamnonanan.edu.vn/wp-content/uploads/2024/08/icon-phone.png"
              alt="hotline-icon"
              width="40"
              height="40"
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
