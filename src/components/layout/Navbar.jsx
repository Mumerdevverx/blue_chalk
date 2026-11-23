import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logonav from "../../assets/logonav.png";

const Navbar = ({ isFromHome = false, isToHome = false, transitionStage = "idle" }) => {
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
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const getLinkClass = (path) =>
    `text-[16px] lg:text-[17px] font-basis transition-colors duration-300 ${
      location.pathname === path
        ? "text-black"
        : "text-[#0089D0] hover:text-[#006fae]"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 font-semibold bg-white z-50 ${
        isFromHome && transitionStage === "enter"
          ? "navbar-slide-up"
          : isToHome && transitionStage === "exit-to-home"
          ? "navbar-slide-down"
          : ""
      }`}
    >
      <div className="w-full mx-auto h-[70px] px-5 sm:px-6  md:px-10 lg:px-22 flex items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`shrink-0 ${
            isFromHome && transitionStage === "enter"
              ? "navbar-logo-enter"
              : isToHome && transitionStage === "exit-to-home"
              ? "navbar-logo-exit"
              : ""
          }`}
        >
          <img
            src={logonav}
            alt="Blue Chalk"
            className="lg:w-[85px] md:w-[80px] w-[75px]  h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex leading-[17px] font-semibold  items-center ml-[70px]  lg:ml-[120px] xl:ml-[185px] gap-[35px] md:gap-[60px] lg:gap-[105px]">
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>

          <Link
            to="/work"
            className={`${getLinkClass("/work")} relative -left-2 hover:text-black`}
          >
            Work
          </Link>

          <Link
            to="/news"
            className={`${getLinkClass("/news")} relative -left-1.5 hover:text-black`}
          >
            News
          </Link>

          <Link
            to="/contact"
            className={`${getLinkClass("/contact")} relative -left-2 hover:text-black`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden ml-auto w-[50px] h-[42px] flex items-center justify-center text-[17px] leading-4.25 font-semibold transition-colors hover:bg-[#94999C] ${
            isOpen ? "text-[#94999C]" : "text-[#1893D2]"
          }`}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          Menu
        </button>
      </div>

      {/* Mobile Navigation - Top to Bottom with Half Screen */}
      {/* Backdrop Overlay (Dark background jab menu open ho) */}

      {/* Menu Panel */}
     <div
  className={`md:hidden fixed top-17 right-0 bg-white z-[60] transition-all duration-300 ease-out flex flex-col origin-top ${
    isOpen
      ? "scale-100 opacity-100 pointer-events-auto"
      : "scale-90 opacity-0 pointer-events-none"
  }`}
  style={{ width: "23%", minWidth: "20px" }}
>
        {/* Menu Links */}
        <div className="flex flex-col items-end justify-center flex-1 px-1 py-2 pb-10 gap-10">
          <Link
            to="/about"
            onClick={closeMenu}
            className={`py-5 text-[17px] leading-4.25 font-semibold w-full text-center ${
              location.pathname === "/about" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            About
          </Link>

          <Link
            to="/work"
            onClick={closeMenu}
            className={`text-[17px] leading-4.25 font-semibold w-full text-center ${
              location.pathname === "/work" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            Work
          </Link>

          <Link
            to="/news"
            onClick={closeMenu}
            className={`py-2 text-[17px] leading-4.25 font-semibold w-full text-center ${
              location.pathname === "/news" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            News
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className={`py-2 text-[17px] leading-4.25 font-semibold w-full text-center ${
              location.pathname === "/contact" ? "text-black" : "text-[#0089D0]"
            } hover:text-[#006fae] transition-colors`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay for background */}
      {/* <div
        className={`md:hidden fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      /> */}
    </nav>
  );
};

export default Navbar;
