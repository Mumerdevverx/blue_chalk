import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const videoRef = useRef(null);

  const galleryImages = [
    { id: 1, src: imgOne, alt: "Gallery 1" },
    { id: 2, src: imgTwo, alt: "Gallery 2" },
    { id: 3, src: imgThree, alt: "Gallery 3" },
    { id: 4, src: imgFour, alt: "Gallery 4" },
    { id: 5, src: imgFive, alt: "Gallery 5" },
    { id: 6, src: imgSix, alt: "Gallery 6" },
    { id: 7, src: imgSeven, alt: "Gallery 7" },
    { id: 8, src: imgEight, alt: "Gallery 8" },
    { id: 9, src: imgNine, alt: "Gallery 9" },
  ];

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Auto-play video when page loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Helvetica_Neue',Arial,sans-serif]">
      
      {/* --- RIGHT SIDE: SLIDER + TEXT --- */}
      <div className="fixed top-[100px] right-[30px] w-[300px] z-[999]  flex flex-col gap-4">
        
        {/* 1. Text Block */}
        <p className="text-xs text-gray-500 leading-relaxed">
          An industry-leading production company founded by people who believe in the power of nonfiction visual storytelling.
        </p>

        {/* 2. Small Auto-Play Image Slider */}
        <div className="relative w-[110%] h-[200px]  mt-48 overflow-hidden">
  <div
    className="flex transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform h-full"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {galleryImages.map((image) => (
      <div key={image.id} className="min-w-full h-full flex-shrink-0">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover block"
        />
      </div>
    ))}
  </div>
</div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center px-[60px]  pb-4 fixed bottom-0   border-t border-white/5 ">
      
        
        <ul className="flex list-none gap-8 m-0 p-0 ">
          <li><a href="/about" className="text-blue-400 no-underline text-xl font-light tracking-[1px] hover:text-black transition-colors duration-300 max-[768px]:text-xs max-[480px]:text-[11px]">About</a></li>
          <li><a href="/work" className="text-blue-400 no-underline text-xl font-light tracking-[1px] hover:text-black transition-colors duration-300 max-[768px]:text-xs max-[480px]:text-[11px]">Work</a></li>
          <li><a href="/news" className="text-blue-400 no-underline text-xl font-light tracking-[1px] hover:text-black transition-colors duration-300 max-[768px]:text-xs max-[480px]:text-[11px]">News</a></li>
          <li><a href="/contact" className="text-blue-400 no-underline text-xl font-light tracking-[1px] hover:text-black transition-colors duration-300 max-[768px]:text-xs max-[480px]:text-[11px]">Contact</a></li>
        </ul>
      </footer>

      {/* Hero Section - VIDEO ON FULL LEFT SIDE AT TOP */}
      <section className=" min-h-screen flex items-start ">
        <div className="max-w-[1200px] w-full">
          
          {/* Video - Full width on left, positioned at top */}
          <div className="relative w-full max-w-[976px] h-[565px] overflow-hidden bg-[#1a1a1a]">
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
</div>
        </div>
      </section>

      {/* Footer Navigation - Fully Responsive */}
      <footer className="fixed bottom-4 md:bottom-4 lg:bottom-4 left-4 sm:left-8 md:left-15 right-4 sm:right-8 md:right-15 flex justify-center sm:justify-between items-center pt-4">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-28 lg:pl-10 m-0 p-0">
          <li>
            <Link
            to="/about"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/work"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
            >
              News
            </Link>
          </li>
          <li>
             <Link
            to="/about"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;