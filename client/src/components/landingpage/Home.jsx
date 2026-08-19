import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMenu, FiX } from "react-icons/fi";

// Import assets
import heroVideo from "../../assets/landingimg/herovideo.mp4";
import bluechalk from "../../assets/landingimg/bluechalk.avif";

import imgOne from "../../assets/landingimg/one.avif";
import imgTwo from "../../assets/landingimg/two.avif";
import imgThree from "../../assets/landingimg/three.avif";
import imgFour from "../../assets/landingimg/four.avif";
import imgFive from "../../assets/landingimg/five.avif";
import imgSix from "../../assets/landingimg/six.avif";
import imgSeven from "../../assets/landingimg/seven.avif";
import imgEight from "../../assets/landingimg/eight.avif";
import imgNine from "../../assets/landingimg/nine.avif";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const videoRef = useRef(null);
  const drawerRef = useRef(null);

  const galleryImages = [
    {
      id: 1,
      src: imgOne,
      alt: "Gallery 1",
      link: "https://bluechalk.com/work/sister-cities/",
      buttonText: "Now Streaming",
    },
    {
      id: 2,
      src: imgTwo,
      alt: "Gallery 2",
      link: "https://bluechalk.com/work/oregon-accessibility-happens-here/",
      buttonText: "Now Streaming",
    },
    {
      id: 3,
      src: imgThree,
      alt: "Gallery 3",
      link: "https://bluechalk.com/work/atomic-echoes/",
      buttonText: "Now Streaming",
    },
    {
      id: 4,
      src: imgFour,
      alt: "Gallery 4",
      link: "https://bluechalk.com/work/atomic-echoes/",
      buttonText: "Now Streaming",
    },
    {
      id: 5,
      src: imgFive,
      alt: "Gallery 5",
      link: "https://bluechalk.com/work/atomic-echoes/",
      buttonText: "Now Streaming",
    },
    {
      id: 6,
      src: imgSix,
      alt: "Gallery 6",
      link: "https://bluechalk.com/work/in-with-the-old/",
      buttonText: "Now Streaming",
    },
    {
      id: 7,
      src: imgSeven,
      alt: "Gallery 7",
      link: "https://bluechalk.com/work/sister-cities/",
      buttonText: "Now Streaming",
    },
    {
      id: 8,
      src: imgEight,
      alt: "Gallery 8",
      link: "https://bluechalk.com/work/diary-old-home/",
      buttonText: "Now Streaming",
    },
    {
      id: 9,
      src: imgNine,
      alt: "Gallery 9",
      link: "https://bluechalk.com/work/morgan-stanley-sustainable-solutions/",
      buttonText: "Now Streaming",
    },
  ];

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-play video when page loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        // Check if click is on menu button
        if (!e.target.closest(".menu-button")) {
          setIsDrawerOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Get current slide data
  const currentSlide = galleryImages[currentIndex];

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/work", label: "Work" },
    { path: "/news", label: "News" },
    { path: "/contact", label: "Contact" },
  ];

  const toggleDrawer = (e) => {
    e.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-white font-basis-web font-['Helvetica_Neue',Arial,sans-serif] relative overflow-x-hidden">
      {/* Mobile Menu Button - visible on sm only */}
      {/* Mobile Menu Button */}
      <button
        onClick={toggleDrawer}
        className="menu-button fixed top-4 right-4 z-50 lg:hidden text-blue-500 hover:text-black transition-colors duration-300 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-lg"
        aria-label="Toggle menu"
      >
        {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Drawer - Top to Bottom with Center Alignment */}
      <div
        className={`fixed top-0 left-0 w-full z-40 lg:hidden transition-transform duration-400  ease-in-out ${
          isDrawerOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "45vh", maxHeight: "400px" }}
      >
        {/* Drawer content */}
        <div
          ref={drawerRef}
          className="w-full h-full bg-white px-20 pt-36 shadow-2xl overflow-y-auto"
        >
          {/* Menu Links - Centered */}
          <div className="flex flex-col items-center justify-center h-[calc(100%-70px)] px-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="w-full text-center py-4 text-[20px] font-medium border-b-2 border-gray-200 text-blue-500 hover:text-black transition-colors duration-300"
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for background */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <section className="min-h-screen flex flex-col lg:flex-row items-start">
        {/* Video Section - Full height on sm, adjusted on md and lg */}
        <div className="w-full lg:flex-1 h-screen sm:h-screen md:h-[562px] lg:h-[562px] relative">
          <Link
            to="https://bluechalk.com/work/what-lasts/"
            className="relative w-full h-full overflow-hidden bg-[#1a1a1a] block"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={heroVideo}
              poster={imgOne}
              muted
              loop
              playsInline
              autoPlay
            />

            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-[#265b7a] via-[#1989c2]/2 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-0 md:left-20 flex pointer-events-none">
              <img
                src={bluechalk}
                alt="Blue Chalk"
                className="w-40 sm:w-32 md:w-48 lg:w-64 h-auto"
              />
            </div>

            <div
              className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-43 h-12 sm:h-14 md:h-16 px-2 py-2 flex items-end justify-between transition-all duration-300 pointer-events-none ${
                isVideoHovered ? "bg-[#1989c2]" : "bg-black/60"
              }`}
            >
              <span className="text-xs sm:text-sm md:text-sm font-medium">
                What Lasts
              </span>
              <FiPlus className="absolute top-1 right-1 sm:top-2 sm:right-2 text-base sm:text-lg" />
            </div>
          </Link>
        </div>

        {/* Left side content - hidden on sm, visible on md and lg */}
        <div className="hidden md:flex flex-col gap-8 font-basis-web sm:gap-6 lg:gap-27.5 xl:gap-34 p-4 sm:p-6 lg:p-0 lg:pl-0 w-full md:w-full lg:w-auto lg:relative lg:top-[50px]">
          <p className="text-xl md:text-xl lg:text-[20px] lg:pl-11 leading-[26px] max-sm:pt-12 max-sm:pb-5 text-[#C2BBB6] max-w-full md:max-w-full lg:max-w-xs xl:max-w-sm">
            An industry-leading production company founded by people <br /> who
            believe in the power of nonfiction visual storytelling.
          </p>

          <div
            className="relative w-full max-w-full md:max-w-full lg:max-w-xs xl:max-w-sm h-60 md:h-80 lg:h-68 overflow-hidden"
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
          >
            {/* Link on entire slider container - updates with current slide */}
            <Link
              key={currentIndex}
              to={currentSlide?.link || "/"}
              className="absolute inset-0 z-20"
              aria-label={currentSlide?.alt || "Slide link"}
            />

            {/* Sliding Images */}
            <div
              className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform h-full"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative min-w-full h-full shrink-0 overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover block"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-t from-[#0b5f8e] via-[#1989c2]/2 to-transparent" />
                </div>
              ))}
            </div>

            {/* Hover overlay */}
            <div
              className={`absolute inset-0 transition-all duration-300 pointer-events-none`}
            />

            {/* Button - Visual only, no link */}
            <div
              className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-white w-28 sm:w-32 md:w-36 h-12 sm:h-14 md:h-16 px-2 py-2 flex items-end justify-between transition-all duration-300 pointer-events-none z-10 ${
                isSliderHovered ? "bg-[#1989c2]" : "bg-black/60"
              }`}
            >
              <span className="text-xs sm:text-sm md:text-sm font-medium">
                {currentSlide?.buttonText || "Now Streaming"}
              </span>
              <FiPlus className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-base sm:text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation - hidden on sm (moved to drawer), visible on md and lg */}
      <footer className="hidden md:flex fixed bottom-4 md:bottom-4 lg:bottom-6 font-basis-web left-4 sm:left-8 md:left-14 right-4 sm:right-8 md:right-15 items-center pt-2">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-24 lg:pl-10 m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path} className="md:hidden lg:block">
              <Link
                to={item.path}
                className="text-blue-500 font-medium no-underline text-xs sm:text-sm lg:text-[17px] leading-4 tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default Home;
