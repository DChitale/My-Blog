import React from "react";
import logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 text-white">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="cursor-pointer"
      >
        {/* <img src={logo} alt="logo" className="w-32 sm:w-44 " /> */}
        <h1 className="logo-font text-xl lg:text-3xl">Hex {'>'} Notes</h1>
      </div>

     <div>

     </div>
    </div>
  );
};

export default Navbar;
