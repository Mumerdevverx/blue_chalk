import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMenu, FiX } from "react-icons/fi";

// Import assets (Hero video aur logo static rahenge)
import heroVideo from "../../assets/landingimg/herovideo.mp4";
import bluechalk from "../../assets/landingimg/bluechalk.avif";

// ✅ FALLBACK IMAGES (agar API fail ho ya data na ho)
const fallbackImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        alt: "Gallery 1",
        link: "https://bluechalk.com/work/sister-cities/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        alt: "Gallery 2",
        link: "https://bluechalk.com/work/oregon-accessibility-happens-here/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        alt: "Gallery 3",
        link: "https://bluechalk.com/work/atomic-echoes/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        alt: "Gallery 4",
        link: "https://bluechalk.com/work/atomic-echoes/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        alt: "Gallery 5",
        link: "https://bluechalk.com/work/atomic-echoes/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        alt: "Gallery 6",
        link: "https://bluechalk.com/work/in-with-the-old/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        alt: "Gallery 7",
        link: "https://bluechalk.com/work/sister-cities/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        alt: "Gallery 8",
        link: "https://bluechalk.com/work/diary-old-home/",
        buttonText: "Now Streaming",
        type: "image",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        alt: "Gallery 9",
        link: "https://bluechalk.com/work/morgan-stanley-sustainable-solutions/",
        buttonText: "Now Streaming",
        type: "image",
    },
];

const Home = () => {
    // ✅ STATE FOR DYNAMIC DATA
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [isSliderHovered, setIsSliderHovered] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const videoRef = useRef(null);
    const drawerRef = useRef(null);

    // ✅ FETCH DYNAMIC DATA FROM API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/home");
                const data = await response.json();
                if (data.success && data.data.length > 0) {
                    const items = data.data.map((item, index) => ({
                        id: item._id,
                        src: item.mediaUrl,
                        alt: item.title || `Gallery ${index + 1}`,
                        link: item.link || "#",
                        buttonText: "Now Streaming",
                        type: item.type || "image",
                    }));
                    setGalleryItems(items);
                } else {
                    setGalleryItems(fallbackImages);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching home items:", error);
                setGalleryItems(fallbackImages);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // ✅ USE KARO: API data agar hai toh, nahi toh fallback
    const galleryImages = galleryItems.length > 0 ? galleryItems : fallbackImages;

    // Auto-slide images every 4 seconds
    useEffect(() => {
        if (galleryImages.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [galleryImages]);

    // Auto-play hero video
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
    const currentSlide = galleryImages[currentIndex] || galleryImages[0];

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

    // ✅ LOADING STATE
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-max bg-white font-basis-web font-['Helvetica_Neue',Arial,sans-serif] relative overflow-x-hidden">
            {/* Mobile Menu Button - hidden on tablet and above */}
            <button
                onClick={toggleDrawer}
                className="menu-button fixed top-4 right-4 z-50 md:hidden text-blue-500 hover:text-black transition-colors duration-300 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-lg"
                aria-label="Toggle menu"
            >
                {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Mobile Drawer - hidden on tablet and above */}
            <div
                className={`fixed top-0 left-0 w-full z-40 md:hidden transition-transform duration-400 ease-in-out ${
                    isDrawerOpen ? "translate-y-0" : "-translate-y-full"
                }`}
                style={{ height: "45vh", maxHeight: "400px" }}
            >
                <div
                    ref={drawerRef}
                    className="w-full h-full bg-white px-20 pt-26 shadow-2xl overflow-y-auto"
                >
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

            {/* Overlay - hidden on tablet and above */}
            <div
                className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
                    isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setIsDrawerOpen(false)}
            />

            {/* ===== MAIN SECTION ===== */}
            {/* flex-row from tablet (md) upwards — matches laptop layout */}
            <section className="min-h-screen flex flex-col md:flex-row items-start overflow-x-hidden">
                {/* ===== LEFT: HERO VIDEO ===== */}
                {/* On tablet: 1/2 width, on laptop: fixed width as before */}
                <div className="w-full md:w-[500px] lg:w-[568px] xl:w-[1760px] h-screen sm:h-screen md:h-[1062px] lg:h-[1050px] xl:h-[568px] relative">
                    <Link
                        to=""
                        className="relative w-full h-full overflow-hidden bg-[#1a1a1a] block"
                        onMouseEnter={() => setIsVideoHovered(true)}
                        onMouseLeave={() => setIsVideoHovered(false)}
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            src={heroVideo}
                            poster={fallbackImages[0]?.src}
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
                                className="w-40 sm:w-32 md:w-48 lg:w-56 xl:w-64 h-auto"
                            />
                        </div>

                        <div
                            className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-44 xl:w-48 h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 px-2 py-2 flex items-end justify-between transition-all duration-300 pointer-events-none ${
                                isVideoHovered ? "bg-[#1989c2]" : "bg-black/60"
                            }`}
                        >
                            <span className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-medium">
                                What Lasts
                            </span>
                            <FiPlus className="absolute top-1 right-1 sm:top-2 sm:right-2 text-base sm:text-lg lg:text-xl xl:text-2xl" />
                        </div>
                    </Link>
                </div>

                {/* ===== RIGHT: DYNAMIC SLIDER ===== */}
                {/* On tablet: 1/2 width, on laptop: percentage width as before */}
                <div className="hidden md:flex flex-col gap-6 sm:gap-6 lg:gap-158.5 xl:gap-10 md:gap-130 md:p-0 sm:p-6 lg:p-0 xl:p-0 w-full md:w-1/2 lg:w-[45%] xl:w-[50%] lg:p-0 xl:mr-2 lg:pt-0 xl:pt-2">
                    <p className="text-xl md:text-xl lg:text-[22px] xl:text-[20px] pt-10 xl:ml-7 md:ml-8 leading-[28px] lg:ml-6 sm:leading-[26px] lg:leading-[32px] xl:leading-[26px] text-[#C2BBB6] max-w-full md:max-w-full lg:max-w-md xl:max-w-lg">
                        An industry-leading production company founded by people <br className="lg:hidden" />
                        who believe in the power of nonfiction visual storytelling.
                    </p>

                    {/* ✅ DYNAMIC SLIDER */}
                    <div
                        className="relative w-full max-w-full h-40 md:h-[400px] lg:h-[280px] xl:h-[260px] xl:mt-29 overflow-hidden"
                        onMouseEnter={() => setIsSliderHovered(true)}
                        onMouseLeave={() => setIsSliderHovered(false)}
                    >
                        <Link
                            key={currentIndex}
                            to={currentSlide?.link || "/"}
                            className="absolute inset-0 z-20"
                            aria-label={currentSlide?.alt || "Slide link"}
                        />

                        <div
                            className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform h-full"
                            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
                        >
                            {galleryImages.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative min-w-full h-full shrink-0 overflow-hidden"
                                >
                                    {image.type === "video" ? (
                                        <video
                                            src={image.src}
                                            className="w-full h-full object-cover"
                                            muted
                                            loop
                                            playsInline
                                            autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover block"
                                        />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 bg-gradient-to-t from-[#0b5f8e] via-[#1989c2]/2 to-transparent" />
                                </div>
                            ))}
                        </div>

                        {/* Slider Button */}
                        <div
                            className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-5 lg:right-5 xl:bottom-4 xl:right-6 text-white w-28 sm:w-32 md:w-36 lg:w-44 xl:w-48 h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 px-2 py-2 flex items-end justify-between transition-all duration-300 pointer-events-none z-10 ${
                                isSliderHovered ? "bg-[#1989c2]" : "bg-black/60"
                            }`}
                        >
                            <span className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-medium">
                                {currentSlide?.buttonText || "Now Streaming"}
                            </span>
                            <FiPlus className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-base sm:text-lg lg:text-xl xl:text-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER NAVIGATION ===== */}
            {/* Shows from tablet (md) upwards — nav items visible on tablet too */}
            <footer className="hidden md:flex fixed bottom-4 md:bottom-4 lg:bottom-8 xl:bottom-6 font-basis-web left-4 sm:left-8 md:left-14 lg:left-10 xl:left-14 right-4 sm:right-8 md:right-15 lg:right-10 xl:right-14 items-center pt-2">
                <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-24 lg:gap-28 xl:gap-24 lg:pl-8 xl:pl-10 m-0 p-0">
                    {navItems.map((item) => (
                        <li key={item.path} className="block">
                            <Link
                                to={item.path}
                                className="text-blue-500 font-medium no-underline text-xs sm:text-sm lg:text-[17px] xl:text-[17px] leading-[17px] tracking-[0.5px] sm:tracking-[1px] hover:text-black transition-colors duration-300"
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