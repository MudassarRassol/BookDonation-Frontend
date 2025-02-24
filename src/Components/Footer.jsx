import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from "../../src/assets/logo.png"; // Adjust path if needed
import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((state) => state.user);

  return (
    <footer className={`w-full border-t-2 ${theme === "dark" ? "dark" : "light"} mb-2 p-2 `}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & About */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Book Donation" className="  w-14  " />
            {/* <p className="mt-2 text-sm">
              Connecting books with people who need them. Your donation makes a difference!
            </p> */}
          </div>
        {/* Copyright */}
        <div className=" text-center text-sm">
          &copy; {new Date().getFullYear()} Book Donation. All rights reserved.
        </div>
          {/* Navigation Links */}
          {/* <div className="flex flex-col md:flex-row items-center gap-4">
            <NavLink to="/" className="hover:text-blue-500">Home</NavLink>
            <NavLink to="/allbooks" className="hover:text-blue-500">Books</NavLink>
            <NavLink to="/about" className="hover:text-blue-500">About</NavLink>
            <NavLink to="/contact" className="hover:text-blue-500">Contact</NavLink>
          </div> */}

          {/* Social Media Links */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-xl">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-xl">
              <FaInstagram />
            </a>
            <a href="mailto:contact@bookdonation.com" className="hover:text-blue-500 text-xl">
              <FaEnvelope />
            </a>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
