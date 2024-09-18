import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ContactForm: React.FC = () => {
  // Translation
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (dropdownContentRef.current) {
      dropdownContentRef.current.style.maxHeight = isExpanded
        ? `${dropdownContentRef.current.scrollHeight}px`
        : '0';
    }
  }, [isExpanded]);

  return (
    <div className="fixed bottom-0 left-0 z-[99999]">
      <button
        className="mb-5 ml-1 flex items-center rounded-md border border-white bg-primary p-2 text-xs text-white shadow-mainMenu"
        onClick={toggleDropdown}
      >
        {isExpanded
          ? `${t('UserPage.Collapse')} ▼`
          : `${t('UserPage.Contact')} ▲`}
      </button>
      <div
        ref={dropdownContentRef}
        className="dropdown-content overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: isExpanded
            ? `${dropdownContentRef.current?.scrollHeight}px`
            : '0'
        }}
      >
        <div className="mb-1 ml-5 block">
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
        <div className="mb-1 ml-5 block">
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
        <Link
          className="relative mb-5 ml-5 inline-block"
          target="_blank"
          to="tel:0333133050"
          rel="noopener noreferrer"
        >
          <span className="animation-zoomBorder" />
          <img
            src="https://mamnonanan.edu.vn/wp-content/uploads/2024/08/icon-phone.png"
            alt="#"
            width="40"
            height="40"
            className="rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default ContactForm;

