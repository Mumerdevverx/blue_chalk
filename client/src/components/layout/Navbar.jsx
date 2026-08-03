import React, { useState } from "react";
import { Link } from "react-router-dom";
import logonav from "../../assets/logonav.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative w-full bg-white">
      <div className="max-w-[1170px] mx-auto h-[70px] px-5 sm:px-6 lg:px-0 flex items-center">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img
            src={logonav}
            alt="Blue Chalk"
            className="w-[75px] sm:w-[80px] md:w-[85px] h-auto"
          />
        </Link>

        {/* Desktop / Tablet Navigation */}
        <div className="hidden md:flex items-center ml-[70px] lg:ml-[120px] xl:ml-[160px] gap-[35px] lg:gap-[55px]">
          <Link
            to="/about"
            className="text-[16px] lg:text-[17px] text-[#0089D0] font-normal hover:text-[#006fae] transition-colors"
          >
            About
          </Link>

          <Link
            to="/work"
            className="text-[16px] lg:text-[17px] text-[#0089D0] font-normal hover:text-[#006fae] transition-colors"
          >
            Work
          </Link>

          <Link
            to="/news"
            className="text-[16px] lg:text-[17px] text-black font-normal hover:text-[#0089D0] transition-colors"
          >
            News
          </Link>

          <Link
            to="/contact"
            className="text-[16px] lg:text-[17px] text-[#0089D0] font-normal hover:text-[#006fae] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden ml-auto w-[42px] h-[42px] flex items-center justify-center text-[#0089D0] text-[30px] leading-none"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute left-0 top-[70px] w-full bg-white border-t border-gray-100 shadow-lg z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="px-6 py-5 flex flex-col">

          <Link
            to="/about"
            onClick={closeMenu}
            className="py-3 text-[17px] text-[#0089D0] border-b border-gray-100"
          >
            About
          </Link>

          <Link
            to="/work"
            onClick={closeMenu}
            className="py-3 text-[17px] text-[#0089D0] border-b border-gray-100"
          >
            Work
          </Link>

          <Link
            to="/news"
            onClick={closeMenu}
            className="py-3 text-[17px] text-black border-b border-gray-100"
          >
            News
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className="py-3 text-[17px] text-[#0089D0]"
          >
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;