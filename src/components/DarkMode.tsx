import React, { useState, useEffect } from "react";
import { IoCloudyNightSharp } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";

const DarkMode: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      onClick={toggleDarkMode}
      className="bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-20 shadow-md cursor-pointer rounded-md flex flex-row justify-center items-center text-black dark:text-white"
    >
      <div className="cursor-pointer rounded-md p-2">
        {darkMode ? (
          <div className="text-xl text-orange-400">
            <MdLightMode />
          </div>
        ) : (
          <div className="text-xl text-black">
            <IoCloudyNightSharp />
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkMode;