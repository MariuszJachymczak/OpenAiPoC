import {
  firstImageGeneratorIconSVG,
  searchIconSVG,
  secondImageGeneratorIconSVG,
} from "../../assets/assets";
import { useTheme } from "../../assets/darkmode/ThemeContext";
import ToggleTheme from "../../assets/darkmode/ToggleTheme";

/* eslint-disable jsx-a11y/anchor-is-valid */
const RightSidebar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div className="flex flex-col justify-between h-full p-3 w-60 bg-gray-700 text-gray-100 font-inter">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2>Chat History</h2>
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current dark:dark:text-gray-100"
            >
              <rect width="352" height="32" x="80" y="96"></rect>
              <rect width="352" height="32" x="80" y="240"></rect>
              <rect width="352" height="32" x="80" y="384"></rect>
            </svg>
          </button>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-5 h-5 dark:dark:text-gray-400"
              >
                <path d={searchIconSVG}></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full py-2 pl-10 text-sm dark:dark:border-transparent rounded-md focus:outline-none dark:dark:bg-gray-800 dark:dark:text-gray-100 focus:dark:dark:bg-gray-900"
          />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm hover:bg-orange01">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:dark:text-gray-400"
                >
                  <path d={firstImageGeneratorIconSVG}></path>
                  <path d={secondImageGeneratorIconSVG}></path>
                </svg>
                <span>Chat from Today</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <ToggleTheme onChange={toggleDarkMode}>
          {isDarkMode ? "Switch to Light Mode" : "Swith to Dark Mode"}
        </ToggleTheme>
      </div>
    </div>
  );
};

export default RightSidebar;
