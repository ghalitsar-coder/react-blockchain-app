import React, { useState } from "react";
import logo from "../assets/images/logo.png";

import { Menu, Close } from "@mui/icons-material";
const NavbarItem = ({ title, classProps }) => (
  <li className={`mx-4 cursor-pointer  ${classProps}`}> {title} </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full text-white flex md:justify-center justify-between items-center p-4 ">
      <div className="md:flex-[.5] flex-initial justify-center items-center ">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial ">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, idx) => (
          <NavbarItem title={item} classProps={""} key={item + idx} />
        ))}
        <li className="bg-[#0c083b] py-2 px-7 mx-4 rounded-xl hover:bg-[#050b22] cursor-pointer  ">
          Login
        </li>
      </ul>
      <div className="flex relative md:hidden">
        {toggleMenu ? (
          <Close
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu((prev) => !prev)}
          />
        ) : (
          <Menu
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu((prev) => !prev)}
          />
        )}
        {toggleMenu && (
          <ul
            className={`z-10 fixed  top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white  animate-slide-in  `}
          >
            <li className="text-xl w-full my-2">
              <Close
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, idx) => (
              <NavbarItem
                title={item}
                classProps={"my-2 text-lg"}
                key={item + idx}
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
