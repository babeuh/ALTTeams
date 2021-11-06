import React, { useState } from "react";

export const SearchBarComponent: React.FC = () => {
  const [text, changeText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };

  return (
    <>
      <div className="flex h-6 items-center" style={{ marginBottom: "28px" }}>
        <div className="flex flex-1 justify-center w-full">
          <div className="relative w-full z-10 flex flex-col">
            <div className="items-center flex w-full bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg">
              <div className="h-full mx-4 flex items-center pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    clipPath="url(#sm-solid-search_svg__clip0)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M7.212 1.803a5.409 5.409 0 100 10.818 5.409 5.409 0 000-10.818zM0 7.212a7.212 7.212 0 1114.424 0A7.212 7.212 0 010 7.212z"></path>
                    <path d="M11.03 11.03a.901.901 0 011.275 0l3.43 3.432a.902.902 0 01-1.274 1.275l-3.431-3.431a.901.901 0 010-1.275z"></path>
                  </g>
                  <defs>
                    <clipPath id="sm-solid-search_svg__clip0">
                      <path d="M0 0h16v16H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                className="w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none bg-primary-700   pl-0 "
                placeholder="Search for teams and users"
                onChange={handleTextChange}
                value={text}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
