import React, { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const AllProjectwork = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const portfolioRef = useRef(null);
  const [isLgScreen, setIsLgScreen] = useState(false);

  // ✅ Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLgScreen(isLg);
      if (isLg) {
        setActiveFilter("Featured");
        setIsBrandOpen(true);
      } else {
        setActiveFilter("All Projects");
        setIsBrandOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/work");
        const data = await response.json();
        if (data.success) {
          setAllProjects(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Filter projects when filter changes
  useEffect(() => {
    if (allProjects.length === 0) return;
    const filtered =
      activeFilter === "All Projects"
        ? allProjects
        : allProjects.filter((p) => p.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter, allProjects]);

  // Portfolio Filter object
  const portfolioFilter = {
    filter: (category) => setActiveFilter(category),
    reset: () => setActiveFilter("All Projects"),
    getCurrentFilter: () => activeFilter,
    getProjects: () => filteredProjects,
  };

  // Expose to window (optional)
  useEffect(() => {
    window.portfolioFilter = portfolioFilter;
    return () => { delete window.portfolioFilter; };
  }, [portfolioFilter]);

  const navItems = ["About", "Work", "News", "Contact"];

  // ✅ Helper to get full image URL
  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400/e0e0e0/808080?text=No+Image';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  // Render overlay based on type (only if showOverlay is true)
  const renderOverlay = (project) => {
    if (!project.showOverlay) return null;

    if (project.overlayType === "atomic") {
      return (
        <div className="absolute top-1/2 font-basis-web left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
          {/* <h2
            className="text-white font-extrabold leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              letterSpacing: "clamp(4px, 1vw, 12px)",
              textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {project.title}
          </h2> */}
          <p
            className="text-white font-light opacity-90"
            style={{
              fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)",
              letterSpacing: "clamp(3px, 0.6vw, 6px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              margin: "5px 0",
            }}
          >
            {project.description}
          </p>
          <p
            className="text-white font-light opacity-80"
            style={{
              fontSize: "clamp(0.7rem, 1vw, 1rem)",
              letterSpacing: "clamp(2px, 0.4vw, 4px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              margin: "5px 0",
            }}
          >
            {project.subDescription}
          </p>
        </div>
      );
    }

    if (project.overlayType === "firebreak") {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
          <h2
            className="text-white font-extrabold leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              letterSpacing: "clamp(4px, 1vw, 12px)",
              textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {project.title}
          </h2>
          <p
            className="text-white font-normal opacity-90"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.4rem)",
              letterSpacing: "clamp(3px, 0.6vw, 6px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              margin: "8px 0",
            }}
          >
            {project.subtitle}
          </p>
          <p
            className="text-white font-semibold opacity-90"
            style={{
              fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)",
              letterSpacing: "clamp(4px, 0.8vw, 8px)",
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              margin: "5px 0",
            }}
          >
            {project.description}
          </p>
        </div>
      );
    }

    // custom overlay – just show title
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
        <h2
          className="text-white font-extrabold leading-tight"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            letterSpacing: "clamp(4px, 1vw, 12px)",
            textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {project.title}
        </h2>
      </div>
    );
  };

  const isAllProjects = activeFilter === "All Projects";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px]">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-start py-6 border-gray-100 mb-8 flex-wrap gap-4">
        <div className="flex gap-4 md:gap-10 items-start flex-wrap">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm md:text-base uppercase tracking-wide transition-colors duration-300 hover:text-[#0077be] ${
                item === "Work" ? "text-[#0077be] font-semibold" : "text-gray-700"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Portfolio Filter */}
      <div ref={portfolioRef} className="w-full js-portfolio-variety-1">
        <div className="text-start mb-10">
          <div className="relative grid grid-cols-2 gap-1 sm:gap-3 lg:max-w-[500px] mx-auto px-4 lg:pt-6 pt-0 w-full lg:px-0 md:px-6">
            <div className="absolute lg:top-1 md:-top-2.5 top-3 lg:left-17 md:left-13.5 left-4 text-[11px] font-semibold text-[#C2BBB6] tracking-[3px] uppercase">
              FILTER BY:
            </div>

            {/* Left Column */}
            <div className="flex flex-col items-center gap-0.5 lg:mt-2 md:mt-2 mt-8 md:ml-7 lg:ml-16">
              <button
                onClick={() => portfolioFilter.filter("Featured")}
                className={`lg:text-[36px] md:text-4xl text-xl py-0.5 font cursor-pointer transition-all duration-300 w-full text-left ${
                  activeFilter === "Featured"
                    ? "text-[#1893D2]"
                    : "text-[#C2BBB6] hover:text-[#1893D2]"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => portfolioFilter.filter("All Projects")}
                className={`lg:text-[36px] md:text-4xl text-xl py-0.5 cursor-pointer transition-all duration-300 w-full text-left whitespace-nowrap ${
                  activeFilter === "All Projects"
                    ? "text-[#1893D2]"
                    : "text-[#877A71] hover:text-[#1893D2]"
                }`}
              >
                All Projects
              </button>
            </div>

            {/* Right Column */}
            <div className="flex flex-col md:ml-2 lg:ml-45 mt-2">
              <div className="flex items-center w-full gap-3 md:gap-4 lg:gap-6">
                <button
                  onClick={() => portfolioFilter.filter("Branded")}
                  className={`lg:text-[36px] md:text-4xl max-sm:mt-4 text-xl py-1.5 cursor-pointer transition-all duration-300 text-left ${
                    activeFilter === "Branded"
                      ? "text-[#1893D2]"
                      : "text-[#C2BBB6] hover:text-[#1893D2]"
                  }`}
                >
                  <span>Branded</span>
                </button>
                <button
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="cursor-pointer transition-colors duration-200 text-[#7d7c7c] hover:text-[#1893D2] flex-shrink-0 flex items-center justify-center"
                >
                  <svg
                    className={`w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 max-sm:mt-4 lg:ml-50 md:ml-20 ml-10 transition-all duration-300 ${
                      isBrandOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {isBrandOpen && (
                <div className="flex flex-col items-start w-full pl-0 animate-[slideDown_0.3s_ease]">
                  <button
                    onClick={() => portfolioFilter.filter("Entertainment")}
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300 w-full text-left ${
                      activeFilter === "Entertainment"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    Entertainment
                  </button>
                  <button
                    onClick={() => portfolioFilter.filter("Social Impact")}
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300 w-full text-left ${
                      activeFilter === "Social Impact"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    SocialImpact
                  </button>
                  <button
                    onClick={() => portfolioFilter.filter("Documentary")}
                    className={`lg:text-[36px] leading-[43px] md:text-4xl text-xl py-1.5 cursor-pointer transition-all duration-300 w-full text-left ${
                      activeFilter === "Documentary"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    Documentary
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {filteredProjects.map((project, index) => {
            const isFilteredView = !isAllProjects;
            let gridClass = "md:col-span-1";

            if (isFilteredView) {
              if (index === 0) {
                gridClass = "md:col-span-2 md:row-span-2";
              } else if (index === 1 || index === 2) {
                gridClass = "md:col-start-3";
              }
            }

            return (
              <div
                key={project._id || index}
                className={`bg-white overflow-hidden transition-all duration-300 flex flex-col group ${gridClass}`}
              >
                {/* ✅ Link to dynamic detail page using slug */}
                <Link to={`/work/${project.slug}`} className="block w-full h-full">
                  <div className="relative overflow-hidden bg-gray-100 w-full aspect-[16/9]">
                    {/* ✅ IMAGE with full URL */}
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title || 'Work'}
                      className="w-full h-full object-cover block transition-transform duration-300 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x400/e0e0e0/808080?text=Image+Not+Found';
                      }}
                    />

                    {/* ✅ Overlay only if showOverlay is true */}
                    {/* {project.showOverlay && renderOverlay(project)} */}

                    {/* ✅ Bottom-right button with dynamic buttonText */}
                    <div
                      className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-47 h-12 sm:h-14 md:h-16 px-2 py-4 flex items-end justify-between transition-all duration-200 bg-black/60 group-hover:bg-[#1989c2]`}
                    >
                      <span className="text-xs sm:text-sm md:text-sm font-medium">
                        {project.buttonText || "Watch Now"}
                      </span>
                      <FiPlus className="absolute top-1 right-1 sm:top-2 sm:right-2 text-base sm:text-lg" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-lg">
            No projects found in this category
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default AllProjectwork;