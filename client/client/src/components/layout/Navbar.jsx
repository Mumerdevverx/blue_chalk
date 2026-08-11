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

  const closeMenu = () => {
    setIsOpen(false);
  };

  const getLinkClass = (path) =>
    `text-[16px] lg:text-[17px] font-normal transition-colors ${
      location.pathname === path
        ? "text-black"
        : "text-[#0089D0] hover:text-[#006fae]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-[1170px] mx-auto h-[70px] px-5 sm:px-6 lg:px-0 flex items-center">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img
            src={logonav}
            alt="Blue Chalk"
            className="w-[75px] sm:w-[80px] md:w-[85px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-[70px] lg:ml-[120px] xl:ml-[160px] gap-[35px] lg:gap-[55px]">

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
            className={`py-3 text-[17px] border-b border-gray-100 ${
              location.pathname === "/about"
                ? "text-black"
                : "text-[#0089D0]"
            }`}
          >
            About
          </Link>

          <Link
            to="/work"
            onClick={closeMenu}
            className={`py-3 text-[17px] border-b border-gray-100 ${
              location.pathname === "/work"
                ? "text-black"
                : "text-[#0089D0]"
            }`}
          >
            Work
          </Link>

          <Link
            to="/news"
            onClick={closeMenu}
            className={`py-3 text-[17px] border-b border-gray-100 ${
              location.pathname === "/news"
                ? "text-black"
                : "text-[#0089D0]"
            }`}
          >
            News
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className={`py-3 text-[17px] ${
              location.pathname === "/contact"
                ? "text-black"
                : "text-[#0089D0]"
            }`}
          >
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;