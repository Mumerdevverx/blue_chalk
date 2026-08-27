import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiPlus } from "react-icons/fi";

import heroVideo from "../../assets/landingimg/herovideo.mp4";
import bluechalkLogo from "../../assets/landingimg/bluechalk.avif";

// ✅ FALLBACK IMAGES (agar API fail ho)
const fallbackImages = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  "https://images.unsplash.com/photo-1497366216548-37526070297c",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [images, setImages] = useState(fallbackImages);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch home items from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          // ✅ Only take images (ignore videos)
          const imageItems = data.data.filter(item => item.type === "image");
          if (imageItems.length > 0) {
            // ✅ Convert to image URLs (with full path if needed)
            const imageUrls = imageItems.map(item => {
              // If URL is relative, prepend backend base
              if (item.mediaUrl.startsWith("/uploads")) {
                return `http://localhost:5000${item.mediaUrl}`;
              }
              return item.mediaUrl;
            });
            setImages(imageUrls);
          }
        }
      } catch (error) {
        console.error("Error fetching home images:", error);
        // fallback already set
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Image slider – auto-advance
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  // ✅ Show loading state only if images not yet set and loading
  if (loading && images === fallbackImages) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white">
      {/* HERO SECTION – SAME AS BEFORE */}
      <section className="flex w-full flex-col lg:flex-row">
        {/* VIDEO SECTION – UNCHANGED */}
        <div className="relative h-screen w-full overflow-hidden bg-black lg:h-[calc(100vh-72px)] lg:w-[71.5%]">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-[#265b7a] via-[#1989c2]/2 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/10" />

          {/* Logo */}
          <div className="absolute -bottom-2 left-20 z-20 w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] xl:w-[380px]">
            <img
              src={bluechalkLogo}
              alt="Blue Chalk"
              className="block h-auto pt-2 w-full object-contain"
            />
          </div>

          {/* What Lasts Box */}
          <div className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px]">
            What Lasts
            <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl" />
          </div>

          {/* Mobile Menu Button – UNCHANGED */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center bg-white text-[24px] text-[#07354a] shadow-md md:right-7 md:top-7 lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          {/* Mobile Menu – UNCHANGED */}
          {menuOpen && (
            <>
              <div
                onClick={() => setMenuOpen(false)}
                className="absolute inset-0 z-40 bg-black/30 lg:hidden"
              />
              <div className="absolute right-4 top-4 z-50 w-[220px] bg-white px-7 py-6 shadow-xl lg:hidden">
                <div className="mb-7 flex items-center justify-between border-b border-gray-200 pb-4">
                  <span className="text-[18px] font-medium text-[#07354a]">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center text-[22px] text-[#07354a] transition hover:opacity-50"
                    aria-label="Close menu"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60"
                  >
                    About
                  </Link>
                  <Link
                    to="/work"
                    onClick={() => setMenuOpen(false)}
                    className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60"
                  >
                    Work
                  </Link>
                  <Link
                    to="/news"
                    onClick={() => setMenuOpen(false)}
                    className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60"
                  >
                    News
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT ASIDE – SLIDER WITH DYNAMIC IMAGES */}
        <aside className="hidden w-full flex-col bg-white lg:flex lg:h-[calc(100vh-72px)] lg:w-[28.5%]">
          {/* Description – UNCHANGED */}
          <div className="flex h-[42%] items-start px-8 pt-12 xl:px-12 xl:pt-14">
            <p className="max-w-[350px] text-[20px] font-basis-web leading-[26px] text-[#c8b8a8] xl:text-[20px]">
              An industry-leading production company founded by people who
              believe in the power of nonfiction visual storytelling.
            </p>
          </div>

          {/* Image Slider – DYNAMIC IMAGES */}
          <div className="relative h-[58%] w-full overflow-hidden bg-gray-100">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Blue Chalk project ${index + 2}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  currentImage === index ? "opacity-100" : "opacity-0"
                }`}
                onError={(e) => {
                  // If image fails, replace with fallback
                  e.target.src = "https://placehold.co/600x400/e0e0e0/808080?text=No+Image";
                }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-[#265b7a] via-[#1989c2]/2 to-transparent pointer-events-none" />

            {/* What Lasts Box – UNCHANGED */}
            <div className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px]">
              What Lasts
              <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl" />
            </div>
          </div>
        </aside>
      </section>

      {/* DESKTOP NAVBAR – UNCHANGED */}
      <nav className="hidden h-[72px] w-full items-center bg-white px-20 lg:flex">
        <div className="flex items-center ml-4 gap-24 font-basis-web">
          <Link
            to="/about"
            className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]"
          >
            About
          </Link>
          <Link
            to="/work"
            className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]"
          >
            Work
          </Link>
          <Link
            to="/news"
            className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]"
          >
            News
          </Link>
          <Link
            to="/contact"
            className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </main>
  );
};

export default Home;