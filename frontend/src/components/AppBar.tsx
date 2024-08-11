import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import {  Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate=useNavigate()

  function handleOutsideClick(e: MouseEvent) {
    console.log("mouse is clicked");
    if (
      (!dropdownRef.current ||
        !dropdownRef.current.contains(e.target as Node)) &&
      avatarRef.current &&
      !avatarRef.current.contains(e.target as Node)
    )
      setClicked((val) => false);
  }
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="mb-6 flex flex-col items-end w-full ">
      <div className="bg-slate-50 flex justify-between items-center p-3 w-full ">
        <div className="font-homo font-extrabold text-3xl">Medium</div>
        <div className=" w-1/6 flex justify-between items-center">
          <div>
            <div>
              <Button className="bg-gray-300" icon={<FormOutlined />} onClick={()=>navigate('/upload-post')}>
                Write
              </Button>
            </div>
          </div>
          <div ref={avatarRef}>
            <Avatar
              text="vikas"
              onClick={() => {
                setClicked((val) => !val);
              }}
            />
          </div>
        </div>
      </div>
      {clicked ? (
        <div
          ref={dropdownRef}
          className="absolute top-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
