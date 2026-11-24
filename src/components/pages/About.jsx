import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import peoples from "../../assets/peoples.jpg";
import AboutAwards from "./AboutAwards";
import AboutPeopleData from "./AboutPeopleData";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import BlueChalkLoader from "../common/BlueChalkLoader";

const aboutvideo = "/videos/aboutvideo.mp4";

// ✅ Helper for image URL
const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/600x400?text=No+Image';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url}`;
};

const renderRichText = (content) => ({
  __html: content || "",
});

// ✅ Fallback 9 filmstrip images from bluechalk.com/about/
const DEFAULT_FILMSTRIP_IMAGES = [
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/f6/2d/f62d19e026df791ba3a7c661beda0ecf.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/8d/6b/8d6b240158cdb9e39b502e24bc91ef2d.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/22/d2/22d2103e849a2750b2fc53933781749e.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/09/c5/09c50aaf0e82bff20e5b41fd6f1ff3d6.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/1f/5c/1f5cc003676fcf9b5f1ce3b3ed87c5d6.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/12/b3/12b32ab41938ea132a4284ec838aed81.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/e8/5d/e85d441346b33ae10b95f04d314d2a2f.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/0f/0a/0f0a7c5ceb3515ea8c10b1777ead50ac.jpg",
    caption: "",
  },
  {
    src: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/e5/90/e5902ac0c0e9dc904fe70ff4e11607b9.jpg",
    caption: "",
  },
];

// Filmstrip component matching bluechalk.com
const Filmstrip = ({ images = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [aspectRatios, setAspectRatios] = useState({});
  const [filmstripHeight, setFilmstripHeight] = useState(0);
  const [filmstripWidth, setFilmstripWidth] = useState(0);
  const filmstripRef = useRef(null);

  const items = images && images.length > 0
    ? images.map((img) => ({
        _id: img._id,
        src: getImageUrl(img.imageUrl || img.src || img.url),
        caption: img.caption || img.title || "",
        href: img.href || img.link || "",
      }))
    : DEFAULT_FILMSTRIP_IMAGES;

  useEffect(() => {
    const updateDimensions = () => {
      if (filmstripRef.current) {
        setFilmstripHeight(filmstripRef.current.clientHeight);
        setFilmstripWidth(filmstripRef.current.clientWidth);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    items.forEach((item) => {
      if (!item.src) return;
      const img = new Image();
      img.onload = () => {
        setAspectRatios((prev) => {
          if (prev[item.src]) return prev;
          return {
            ...prev,
            [item.src]: img.naturalWidth / img.naturalHeight,
          };
        });
      };
      img.src = item.src;
    });
  }, [items]);

  const handleTouchMove = (e) => {
    if (!filmstripRef.current || items.length === 0) return;
    const touch = e.touches[0];
    const rect = filmstripRef.current.getBoundingClientRect();
    const xPos = touch.clientX - rect.left;
    const targetImgNum = Math.floor(xPos / (rect.width / items.length));
    if (targetImgNum >= 0 && targetImgNum < items.length) {
      setExpandedIndex(targetImgNum);
    }
  };

  return (
    <div className="filmstrip-container">
      <div
        className="filmstrip"
        data-filmstrip=""
        ref={filmstripRef}
        onMouseLeave={() => setExpandedIndex(null)}
        onTouchMove={handleTouchMove}
      >
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const ratio = aspectRatios[item.src] || 1.5;
          const height = filmstripHeight || (filmstripRef.current ? filmstripRef.current.clientHeight : 0);
          const targetWidth = height > 0 ? Math.floor(height * ratio) : undefined;

          return (
            <div
              key={item._id || index}
              className={`filmstrip-img ${isExpanded ? "state-expanded" : ""}`}
              data-src={item.src}
              data-caption={item.caption || ""}
              data-href={item.href || undefined}
              style={{
                backgroundImage: `url("${item.src}")`,
                width: isExpanded && targetWidth ? `${targetWidth}px` : undefined,
              }}
              onMouseEnter={() => setExpandedIndex(index)}
              onTouchStart={() => setExpandedIndex(index)}
              onClick={() => {
                if (item.href) window.open(item.href, "_blank");
              }}
            >
              <div className="filmstrip-caption">{item.caption || ""}</div>
            </div>
          );
        })}
      </div>
      <div className="caption" data-captionholder=""></div>
    </div>
  );
};

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // State for dynamic data
  const [aboutData, setAboutData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback static data (design ke hisaab se)
  const fallbackAbout = {
    aboutUsText: "Blue Chalk Media is an award-winning, full-service production company and creative agency widely recognized for our signature cinematic nonfiction style and authentic expression of the human experience.",
    aboutUsRightText: "television networks, advertising agencies, healthcare organizations, nonprofits and editorial thought leaders.",
    onAssignmentTitle: "Blue Chalk On Assignment",
    onAssignmentText: "From Asia to Europe—scroll through some of the images we've captured while on assignment around the world.",
    services: ["Television and video production", "Podcasting", "Documentary Filmmaking", "Post-Production", "Motion Graphics"],
    careersText: "We're always looking to work with people who share our values—people who are both talented individuals and excellent collaborators. If you don't see a job listing below that suits your skill set, please fill out our creative partners interest form to let us know more about your background and skills. And don't forget to follow us on social media to be the first to know about job new openings.",
    videoUrl: ""
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, galleryRes, clientsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/about`),
          fetch(`${API_BASE_URL}/api/gallery`),
          fetch(`${API_BASE_URL}/api/clients`)
        ]);
        const aboutJson = await aboutRes.json();
        const galleryJson = await galleryRes.json();
        const clientsJson = await clientsRes.json();

        if (aboutJson.success) setAboutData(aboutJson.data);
        if (galleryJson.success) setGalleryImages(galleryJson.data);
        if (clientsJson.success) setClientLogos(clientsJson.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const about = aboutData || fallbackAbout;
  const images = galleryImages.length > 0 ? galleryImages : [];
  const logos = clientLogos.length > 0 ? clientLogos : [];
  const servicesText = Array.isArray(about.services)
    ? about.services.join('\n')
    : about.services || "";

  useLayoutEffect(() => {
    if (!loading && window.location.hash === "#careers") {
      const careersSection = document.getElementById("careers");
      if (careersSection) {
        const NAVBAR_HEIGHT = 70;
        const PADDING = 20;
        const top = careersSection.getBoundingClientRect().top + window.scrollY - (NAVBAR_HEIGHT + PADDING);
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "auto",
        });
      }
    }
  }, [loading]);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  if (loading) {
    return <BlueChalkLoader />;
  }

  return (
    <div className="w-full pt-[70px] px-0 sm:px-0 md:px-0 lg:px-0.5">
      {/* VIDEO */}
      <div className="w-full flex items-center justify-center lg:px-22 md:px-13 px-7">
        <div
          className="relative w-full overflow-hidden cursor-pointer md:aspect-[1.9/1]"
          onClick={!isPlaying ? handlePlay : undefined}
        >
          {!isPlaying && (
            <img src={peoples} alt="About" className="w-full h-auto md:h-full object-cover" />
          )}
          <video
            ref={videoRef}
            src={about.videoUrl || aboutvideo}
            controls={isPlaying}
            playsInline
            className={`w-full h-auto md:h-full object-cover ${isPlaying ? "block" : "hidden"}`}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="group">
                <svg
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] text-white group-hover:text-blue-500 transition-colors duration-300"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M11 7L25 16L11 25V7Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ABOUT US */}
      <section className="w-full mx-auto lg:px-22 md:px-13 px-7">
        <h1 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] sm:leading-[43px] text-[#293339] mb-[20px] sm:mb-[25px] md:mb-[20px]">
          About Us
        </h1>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0 md:gap-x-[80px]">

  {/* Left Side */}
  <div
    className="about-rich-text whitespace-pre-line text-[18px] leading-[1.55] text-[#293339]"
    dangerouslySetInnerHTML={renderRichText(about.aboutUsText)}
  >
  </div>

  {/* Right Side */}
  <div
    className="about-rich-text whitespace-pre-line text-[18px] leading-[1.55] text-[#293339]"
    dangerouslySetInnerHTML={renderRichText(about.aboutUsRightText)}
  >
  </div>

</div>

        {/* ON ASSIGNMENT*/}
        <div className="mt-[90px] md:mt-[65px] lg:mt-[65px] max-sm:mb-10">
          <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-bgw-400 text-[#293339] mb-[15px] sm:mb-[20px] md:mb-[25px]">
            {about.onAssignmentTitle}
          </h2>
          <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#293339] font-bgw-400">
            {about.onAssignmentText.split('\n')[0]}
          </p>
          {about.onAssignmentText.split('\n').length > 1 && (
            <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#293339] font-bgw-400">
              {about.onAssignmentText.split('\n')[1]}
            </p>
          )}
        </div>
      </section>

      {/* FILMSTRIP (Blue Chalk) */}
      <Filmstrip images={images} />

      {/* SERVICES */}
      <section className="w-full mx-auto mt-[50px] sm:mt-[60px] md:mt-[80px] lg:px-22 md:px-13 px-7">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339] mb-[20px] sm:mb-[25px] md:mb-[30px]">
          Services
        </h2>
        <div className="overflow-x-auto">
          <div className="whitespace-pre text-[18px] leading-[1.55] text-[#293339]">
            {servicesText}
          </div>
        </div>
      </section>

      {/* CLIENTS & PARTNERS */}
      <section className="w-full mx-auto lg:px-22 mt-[50px] sm:mt-[60px] md:mt-[60px] md:px-13 px-7">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339] mb-[30px] sm:mb-[40px] md:mb-[30px]">
          Blue Chalk Clients & Partners
        </h2>
        <div className="relative -left-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-14">
          {logos.length > 0 ? (
            logos.map((logo, index) => (
              <div
                key={logo._id || index}
                className="flex items-center justify-center p-2 sm:p-3 md:p-4 lg:mr-0 md:mr-10 mr-0 bg-white rounded-lg transition-shadow duration-300"
              >
                <img
                  src={getImageUrl(logo.imageUrl)}
                  alt={logo.name || `Client ${index + 1}`}
                  className="w-full h-[110px] md:h-[110px] lg:h-[140px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150x100?text=Logo";
                  }}
                />
              </div>
            ))
          ) : (
            // Fallback to static logos? Could keep empty or show placeholder.
            <div className="col-span-full text-center text-gray-400">No clients added yet</div>
          )}
        </div>
      </section>

      {/* AWARDS */}
      <AboutAwards />

      {/* MEET THE TEAM */}
      <AboutPeopleData />

      {/* CAREERS */}
     {/* ================= CAREERS ================= */}
<section id="careers" className="w-full scroll-mt-[90px] mx-auto mt-[60px] md:mt-[76px] lg:mt-[60px] pb-[60px] md:pb-[50px] lg:pb-[60px] lg:px-23 md:px-13 px-7">
  <h2 className="text-[36px] md:text-[32px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[40px] sm:mb-[50px] md:mb-[75px]">
    Careers
  </h2>

  <div className="max-w-full md:max-w-[545px] text-[16px] md:text-[16px] lg:text-[16px] leading-[1.5] text-[#9ea2a3]">
    {/* ✅ Helper function to render careers text with link */}
    {(() => {
      const rawText = about.careersText || fallbackAbout.careersText;
      const text = rawText.split('Blue Chalk Media is an equal opportunity employer')[0].trim();
      const parts = text.split('creative partners interest form');
      
      if (parts.length === 1) {
        // If phrase not found, render as plain text
        return (
          <p className="mb-[25px] sm:mb-[35px] md:mb-[45px]">
            {text}
          </p>
        );
      }
      
      return (
        <p className="mb-[25px] sm:mb-[35px] md:mb-[45px]">
          {parts[0]}
          <Link
            to="/aboutpartner"
            onClick={() => {
              window.history.replaceState(window.history.state, "", "/about#careers");
            }}
            className="text-[#0089D0] hover:underline underline-offset-2 transition-colors duration-200"
          >
            creative partners interest form
          </Link>
          {parts[1]}
        </p>
      );
    })()}

    <p className="mt-[32px]">
      Blue Chalk Media is an equal opportunity employer committed to an inclusive workplace. We do not tolerate sexual harassment or discrimination based on race, color, religion, gender identity, age, national origin, veteran status or disability. We believe that our differences make us stronger and that working together with respect for each individual is essential to the success of our company as a whole.
    </p>

  </div>
</section>
    </div>
  );
};

export default About;