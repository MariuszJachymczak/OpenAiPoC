import { Link } from "react-router-dom";
import {
  firstDocumentChatIconSVG,
  firstImageGeneratorIconSVG,
  homeIconSVG,
  secondDocumentChatIconSVG,
  secondImageGeneratorIconSVG,
  thirdDocumentChatIconSVG,
} from "../../assets/assets";

/* eslint-disable jsx-a11y/anchor-is-valid */
const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-full p-3 w-60 justify-between  bg-gray-700 text-gray-100 font-inter">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2>Dashboard</h2>
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current text-gray-100"
            >
              <rect width="352" height="32" x="80" y="96"></rect>
              <rect width="352" height="32" x="80" y="240"></rect>
              <rect width="352" height="32" x="80" y="384"></rect>
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm  hover:bg-orange01">
              <Link
                rel="noopener noreferrer"
                to="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-400"
                >
                  <path d={homeIconSVG}></path>
                </svg>
                <span>Home</span>
              </Link>
            </li>

            <li className="rounded-sm hover:bg-orange01">
              <Link
                rel="noopener noreferrer"
                to="image"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-400"
                >
                  <path d={firstImageGeneratorIconSVG}></path>
                  <path d={secondImageGeneratorIconSVG}></path>
                </svg>
                <span>Image Generator</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-orange01">
              <Link
                rel="noopener noreferrer"
                to="conversation"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:dark:text-gray-400"
                >
                  <path d={firstDocumentChatIconSVG}></path>
                  <path d={secondDocumentChatIconSVG}></path>
                  <path d={thirdDocumentChatIconSVG}></path>
                </svg>
                <span>Conversation with AI</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-orange01">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="32"
                >
                  <path d="M256 448a32 32 0 0 1-22.63-9.37l-176-176a128 128 0 0 1 181.25-181.25L256 82.75l17.38-17.37a128 128 0 0 1 181.25 181.25l-176 176A32 32 0 0 1 256 448z"></path>
                </svg>

                <span>Webscrapper</span>
              </a>
            </li>
            <li className="rounded-sm hover:bg-orange01">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex justify-right p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current  text-gray-400"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-left p-2 space-x-4 ">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-lg  bg-gray-500"
        />

        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-xs hover:underline text-gray-400"
            >
              View profile
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
