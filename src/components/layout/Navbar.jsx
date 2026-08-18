import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logonav from "../../assets/logonav.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

 const getLinkClass = (path) =>
  `text-[16px] lg:text-[17px] font-basis transition-colors ${
    location.pathname === path
      ? "text-black"
      : "text-[#0089D0] hover:text-[#006fae]"
  }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-[1220px] mx-auto h-[70px] px-5 sm:px-6  md:px-10 lg:px-0 flex items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img
            src={logonav}
            alt="Blue Chalk"
            className="lg:w-[90px] md:w-[80px] w-[75px] ml-2 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex leading-[17px]  items-center ml-[70px]  lg:ml-[120px] xl:ml-[165px] gap-[35px] md:gap-[60px] lg:gap-[105px]">
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>

          <Link to="/work" className={getLinkClass("/work")}>
            Work
          </Link>

          <Link to="/news" className={getLinkClass("/news")}>
            News
          </Link>

          <Link to="/contact" className={getLinkClass("/contact")}>
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

      {/* Mobile Navigation - Top to Bottom with Half Screen */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-white shadow-lg z-[100] transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "45vh", maxHeight: "400px" }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={closeMenu}
            className="text-[#0089D0] text-[30px] leading-none w-[42px] h-[42px] flex items-center justify-center"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Menu Links - Centered */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-70px)] px-20">
          <Link
            to="/about"
            onClick={closeMenu}
            className={`py-4 text-[20px] font-medium border-b-2 border-gray-300 w-full text-center ${
              location.pathname === "/about" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            About
          </Link>

          <Link
            to="/work"
            onClick={closeMenu}
            className={`py-4 text-[20px] font-medium border-b-2 border-gray-300 w-full text-center ${
              location.pathname === "/work" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            Work
          </Link>

          <Link
            to="/news"
            onClick={closeMenu}
            className={`py-4 text-[20px] font-medium border-b-2 border-gray-300 w-full text-center ${
              location.pathname === "/news" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            News
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className={`py-4 text-[20px] font-medium border-b-2 border-gray-300 w-full text-center ${
              location.pathname === "/contact" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay for background */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />
    </nav>
  );
};

export default Navbar;
