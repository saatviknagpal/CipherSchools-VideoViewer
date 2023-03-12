import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { RiVideoUploadLine } from "react-icons/ri";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <nav className="bg-red-500 p-4 fixed w-full z-10 top-0">
      <ul className="flex justify-between items-center">
        <li>
          <Link to="/">
            <h1 className="text-white font-medium">CipherSchools</h1>
          </Link>
        </li>
        <li className="flex gap-2">
          {token ? (
            <>
              <Link to="/upload" className="text-white mr-4">
                <div className="tooltip cursor-pointer">
                  <RiVideoUploadLine className="h-6 w-6" />
                  <span className="tooltiptext shadow-md">Upload</span>
                </div>
              </Link>

              <Link
                to="/myvideos"
                className="text-white mr-4"
                // onClick={() => {
                //   localStorage.removeItem("token");
                //   localStorage.removeItem("userDetails");
                // }}
              >
                <div className="tooltip cursor-pointer">
                  <img
                    className=" w-6 h-6 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${userDetails?.name}`}
                    alt="name of user"
                  />
                  <span className="tooltiptext shadow-md">My Videos</span>
                </div>
              </Link>
              <Link
                to="/login"
                className="text-white mr-4"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userDetails");
                }}
              >
                <div className="tooltip cursor-pointer">
                  <AiOutlinePoweroff className="h-6 w-6" />
                  <span className="tooltiptext shadow-md">Logout</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-white mr-4">
                Signup
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
