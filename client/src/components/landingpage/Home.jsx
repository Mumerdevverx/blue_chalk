import React, { useState, useEffect, useRef } from "react";
 
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
<div className="min-h-screen bg-white font-['Helvetica_Neue',Arial,sans-serif] relative overflow-x-hidden">
<section className="min-h-screen flex flex-col lg:flex-row items-start">
        {/* right side video */}
<div className="w-full lg:max-w-262.5 relative">
          {/* Video - Full width on left */}
<div 
            className="relative w-full aspect-video overflow-hidden bg-[#1a1a1a]"
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
</div>
 
          {/* Blue Chalk Logo - Responsive positioning */}
<div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-0 md:left-20 flex">
<img
              src={bluechalk}
              alt="Blue Chalk"
              className="w-32 sm:w-48 md:w-64 lg:w-84 h-auto"
            />
</div>
 
          {/* What Lasts Button - Responsive positioning with hover effect */}
<button 
            className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-4 md:right-14 text-white w-32 sm:w-36 md:w-40 h-14 sm:h-16 px-2 py-2 flex items-end justify-between transition-all duration-300 group ${
              isVideoHovered ? 'bg-[#1989c2]' : 'bg-black/60'
            }`}
>
<span className="text-sm sm:text-base md:text-sm font-medium">
              What Lasts
</span>
<FiPlus className="absolute top-2 right-2 text-lg sm:text-xl" />
</button>
</div>
 
        {/* left side slider */}
<div className="flex flex-col gap-8 sm:gap-6 lg:gap-34 p-4 sm:p-6 lg:p-0 lg:pl-0 w-full lg:w-auto lg:relative lg:top-[57.5px]">
          {/* Text Block */}
<p className="text-2xl md:text-xl lg:text-lg lg:pl-15 max-sm:pt-12 max-sm:pb-5 text-[#C2BBB6] leading-relaxed max-w-full lg:max-w-xs xl:max-w-sm">
            An industry-leading production company founded by people who believe
            in the power of nonfiction visual storytelling.
</p>
 
          {/* Larger Auto-Play Image Slider with hover effect */}
<div 
            className="relative w-full max-w-full lg:max-w-xs xl:max-w-sm h-70  md:h-100 lg:h-70 overflow-hidden"
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
>
<div
              className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform h-full"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
>
              {galleryImages.map((image) => (
<div key={image.id} className="min-w-full h-full shrink-0">
<img
                    src={image.src}
                    alt={image.alt}
                    className="w-full lg:h-full md:h-auto h-full object-cover block"
                  />
</div>
              ))}
</div>
 
            {/* Button Overlay - Responsive with hover effect */}
<button 
              className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-white w-28 sm:w-32 md:w-40 h-12 sm:h-14 md:h-16 px-2 py-2 flex items-end justify-between transition-all duration-300 z-10 ${
                isSliderHovered ? 'bg-[#1989c2]' : 'bg-black/60'
              }`}
>
<span className="text-xs sm:text-sm md:text-sm font-medium">
                Now Streaming
</span>
<FiPlus className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-base sm:text-xl" />
</button>
</div>
</div>
</section>
 
      {/* Footer Navigation - Fully Responsive */}
<footer className="fixed bottom-4 md:bottom-4 lg:bottom-4 left-4 sm:left-8 md:left-15 right-4 sm:right-8 md:right-15 flex justify-center sm:justify-between items-center pt-4">
<ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-28 lg:pl-10 m-0 p-0">
<li>
<a
              href="/about"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
>
              About
</a>
</li>
<li>
<a
              href="/work"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
>
              Work
</a>
</li>
<li>
<a
              href="/news"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
>
              News
</a>
</li>
<li>
<a
              href="/contact"
              className="text-blue-400 no-underline text-xs sm:text-sm md:text-base font-light tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
>
              Contact
</a>
</li>
</ul>
</footer>
</div>
  );
};
 
export default Home;