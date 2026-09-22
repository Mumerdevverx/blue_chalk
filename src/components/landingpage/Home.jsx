import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiPlus } from "react-icons/fi";
import bluechalkLogo from "../../assets/landingimg/bluechalk.avif";
import API_BASE_URL from "../../config/api";

// ✅ Fallback only — used if API has no video
const FALLBACK_HERO_VIDEO = "/videos/herovideo.mp4";

// ==========================================
// FALLBACK IMAGES
// ==========================================
const fallbackImages = [
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174", workSlug: "" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", workSlug: "" },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [images, setImages] = useState(fallbackImages);
  const [loading, setLoading] = useState(true);

  // ✅ Hero video state (falls back to local file)
  const [heroVideo, setHeroVideo] = useState(FALLBACK_HERO_VIDEO);
  const [heroVideoSlug, setHeroVideoSlug] = useState("");
  const [heroVideoTitle, setHeroVideoTitle] = useState("What Lasts");
  const [heroVideoLink, setHeroVideoLink] = useState("");

  // ==========================================
  // FETCH HOME ITEMS FROM API
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/home`);
        const data = await response.json();

        console.log("📦 Home API:", data);

        if (data.success && Array.isArray(data.data) && data.data.length > 0) {

          // ---------- ✅ Handle VIDEO ----------
          // Get the LATEST video by order (highest order wins)
          const videoItems = data.data.filter(
            (item) => item.type?.toLowerCase() === "video" && item.isActive !== false
          );

          if (videoItems.length > 0) {
            const latestVideo = videoItems.reduce((latest, item) => {
              const lOrder = Number(latest.order) || 0;
              const iOrder = Number(item.order) || 0;
              return iOrder >= lOrder ? item : latest;
            });

            let videoUrl = latestVideo.mediaUrl || "";

            // Prepend backend URL only if relative
            if (videoUrl && videoUrl.startsWith("/uploads")) {
              videoUrl = `${API_BASE_URL}${videoUrl}`;
            }

            if (videoUrl) {
              setHeroVideo(videoUrl);
              console.log("🎬 Hero video set:", videoUrl);
            }

            const resolvedSlug =
              latestVideo.workSlug ||
              (typeof latestVideo.blogId === "object" ? latestVideo.blogId?.slug : latestVideo.blogId) ||
              "";
            setHeroVideoSlug(resolvedSlug);

            const resolvedTitle =
              latestVideo.buttonText ||
              (latestVideo.title && latestVideo.title.toLowerCase() !== "home" ? latestVideo.title : "") ||
              "What Lasts";
            setHeroVideoTitle(resolvedTitle);

            setHeroVideoLink(latestVideo.link || "");
          }

          // ---------- ✅ Handle IMAGES ----------
          const imageItems = data.data.filter(
            (item) => item.type?.toLowerCase() === "image"
          );

          if (imageItems.length > 0) {
            const imageData = imageItems.map((item) => {
              let imageUrl = item.mediaUrl;

              if (imageUrl && imageUrl.startsWith("/uploads")) {
                imageUrl = `${API_BASE_URL}${imageUrl}`;
              }

              const resolvedSlug =
                item.workSlug ||
                (typeof item.blogId === "object" ? item.blogId?.slug : item.blogId) ||
                "";

              const resolvedTitle =
                item.buttonText ||
                (item.title && item.title.toLowerCase() !== "home" ? item.title : "") ||
                "What Lasts";

              return { 
                url: imageUrl, 
                workSlug: resolvedSlug,
                title: resolvedTitle,
                link: item.link || ""
              };
            });

            console.log("🖼️ Home Images:", imageData);
            setImages(imageData);
          }
        }
      } catch (error) {
        console.error("Error fetching home items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================================
  // IMAGE SLIDER AUTO CHANGE
  // ==========================================
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (loading && images === fallbackImages) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white">
      <section className="flex w-full flex-col lg:flex-row">

        {/* ==========================================
            VIDEO SECTION
        ========================================== */}
        <div className="relative h-screen w-full overflow-hidden bg-black lg:h-[calc(100vh-72px)] lg:w-[71.5%]">

          {/* ✅ Uses API video if available, else local fallback */}
          <video
            key={heroVideo}                 // ← forces reload when URL changes
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-[#265b7a] via-[#1989c2]/2 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute -bottom-2 left-20 z-20 w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] xl:w-[380px]">
            <img
              src={bluechalkLogo}
              alt="Blue Chalk"
              className="block h-auto pt-2 w-full object-contain"
            />
          </div>

          {heroVideoSlug ? (
            <Link
              to={`/work/${heroVideoSlug}`}
              className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px] cursor-pointer group"
            >
              <span className="truncate pr-4">{heroVideoTitle}</span>
              <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          ) : heroVideoLink ? (
            <a
              href={heroVideoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px] cursor-pointer group"
            >
              <span className="truncate pr-4">{heroVideoTitle}</span>
              <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl transition-transform duration-300 group-hover:rotate-45" />
            </a>
          ) : (
            <div className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px]">
              <span className="truncate pr-4">{heroVideoTitle}</span>
              <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center bg-white text-[24px] text-[#07354a] shadow-md md:right-7 md:top-7 lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

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
                  <Link to="/about" onClick={() => setMenuOpen(false)} className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60">About</Link>
                  <Link to="/work" onClick={() => setMenuOpen(false)} className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60">Work</Link>
                  <Link to="/news" onClick={() => setMenuOpen(false)} className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60">News</Link>
                  <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60">Contact</Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT ASIDE - IMAGE SLIDER */}
        <aside className="hidden w-full flex-col bg-white lg:flex lg:h-[calc(100vh-72px)] lg:w-[28.5%]">
          <div className="flex h-[42%] items-start px-8 pt-12 xl:px-12 xl:pt-14">
            <p className="max-w-[350px] text-[20px] font-basis-web leading-[26px] text-[#c8b8a8] xl:text-[20px]">
              An industry-leading production company founded by people who
              believe in the power of nonfiction visual storytelling.
            </p>
          </div>

          <div className="relative h-[58%] w-full overflow-hidden bg-gray-100">
            {images.map((image, index) => {
              const isActive = currentImage === index;
              const imageContent = (
                <img
                  src={image.url}
                  alt={`Blue Chalk project ${index + 2}`}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: isActive ? 1 : 0 }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/e0e0e0/808080?text=No+Image";
                  }}
                />
              );

              if (image.workSlug) {
                return (
                  <Link
                    key={index}
                    to={`/work/${image.workSlug}`}
                    className={`absolute inset-0 block transition-opacity duration-700 ease-in-out ${
                      isActive ? "z-10 pointer-events-auto cursor-pointer" : "z-0 pointer-events-none"
                    }`}
                    aria-label={`View ${image.workSlug}`}
                  >
                    {imageContent}
                  </Link>
                );
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 block transition-opacity duration-700 ease-in-out ${
                    isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
                  }`}
                >
                  {imageContent}
                </div>
              );
            })}

            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 md:h-40 bg-gradient-to-t from-[#265b7a] via-[#1989c2]/2 to-transparent pointer-events-none" />

            {images[currentImage]?.workSlug ? (
              <Link
                to={`/work/${images[currentImage].workSlug}`}
                className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px] cursor-pointer group"
              >
                <span className="truncate pr-4">{images[currentImage]?.title || "What Lasts"}</span>
                <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            ) : images[currentImage]?.link ? (
              <a
                href={images[currentImage].link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px] cursor-pointer group"
              >
                <span className="truncate pr-4">{images[currentImage]?.title || "What Lasts"}</span>
                <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl transition-transform duration-300 group-hover:rotate-45" />
              </a>
            ) : (
              <div className="absolute bottom-5 right-5 z-20 flex h-[48px] w-[150px] items-center justify-start px-3 bg-black/60 hover:bg-[#1989c2] transition duration-300 text-[13px] font-medium text-white sm:h-[52px] sm:w-[170px] lg:h-[65px] lg:w-[180px]">
                <span className="truncate pr-4">{images[currentImage]?.title || "What Lasts"}</span>
                <FiPlus className="absolute right-1.5 top-1.5 text-base sm:right-2 sm:top-2 sm:text-lg lg:text-xl xl:text-2xl" />
              </div>
            )}
          </div>
        </aside>
      </section>

      <nav className="hidden h-[72px] w-full items-center bg-white px-20 lg:flex">
        <div className="flex items-center ml-4 gap-24 font-basis-web">
          <Link to="/about" className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]">About</Link>
          <Link to="/work" className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]">Work</Link>
          <Link to="/news" className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]">News</Link>
          <Link to="/contact" className="text-[17px] font-medium text-[#1497d4] transition hover:opacity-60 leading-[17px]">Contact</Link>
        </div>
      </nav>
    </main>
  );
};

export default Home;