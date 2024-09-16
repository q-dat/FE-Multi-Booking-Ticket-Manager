import React, { useState, useEffect } from 'react';
import { Button, Kbd } from 'react-daisyui';
import { BsSearch } from 'react-icons/bs';
import InputForm from './InputForm';

const SearchKey: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showSearch && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        setShowSearch(true);
      } else if (event.key.toLowerCase() === 'escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearch]);

  const handleOverlayClick = () => {
    setShowSearch(false);
  };

  return (
    <div>
      {showSearch && (
        <div
          className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div
            className="relative cursor-default flex-col gap-5 rounded-xl border border-primary bg-white p-5 dark:bg-primary xl:flex"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 text-base font-light">
              <div className="flex items-center justify-center gap-2 text-black dark:text-white">
                Bấm
                <Kbd
                  className="bg-white px-5 text-black"
                  onClick={() => setShowSearch(false)}
                >
                  ESC
                </Kbd>
                để đóng!
              </div>
              <Button
                className="border-none bg-red-500 text-white hover:bg-red-500 hover:bg-opacity-50"
                onClick={() => setShowSearch(false)}
              >
                X
              </Button>
            </div>

            <div className="pt-10">
              <div className="flex flex-row rounded-xl border border-black p-[1px]">
                <InputForm
                  type="text"
                  placeholder="Nhập để tìm kiếm"
                  className="w-[500px] rounded-r-none border-none bg-transparent focus:border-none focus:outline-none"
                  classNameLabel=" bg-white dark:bg-primary"
                />
                <Button
                  size="md"
                  className="rounded-l-none border-none shadow-none"
                >
                  <BsSearch className="text-xl text-black dark:text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchKey;

