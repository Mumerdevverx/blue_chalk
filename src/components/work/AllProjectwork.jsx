import React, { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import { getWorkNameSlug } from "../../utils/workSlug";
import BlueChalkLoader from "../common/BlueChalkLoader";

const CHUNK_SIZE = 12;

const getCategoryApiPath = (category) => {
  const cat = String(category || "").trim().toLowerCase();
  if (cat === "all projects" || cat === "all") return "/api/work/all-projects";
  if (cat === "featured") return "/api/work/featured";
  if (cat === "branded" || cat === "brand") return "/api/work/branded";
  if (cat === "entertainment") return "/api/work/entertainment";
  if (cat === "social impact" || cat === "social-impact") return "/api/work/social-impact";
  if (cat === "documentary") return "/api/work/documentary";
  if (cat === "award" || cat === "awards") return "/api/work/award";
  return `/api/work/category/${encodeURIComponent(category)}`;
};

const isAwardProject = (project) =>
  ["award", "awards"].includes(String(project.category || "").trim().toLowerCase());

const AllProjectwork = () => {
  const [projectsByCategory, setProjectsByCategory] = useState({});
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Featured");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [invalidImageProjects, setInvalidImageProjects] = useState(new Set());
  const [isScreenTransitioning, setIsScreenTransitioning] = useState(false);
  const portfolioRef = useRef(null);
  const prevScreenSizeRef = useRef(null);

  // Screen size detection with transition effect
  useEffect(() => {
    const getScreenCategory = () => {
      const w = window.innerWidth;
      if (w >= 1024) return "lg";
      if (w >= 768) return "md";
      return "sm";
    };

    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsBrandOpen(isLg);

      const newCategory = getScreenCategory();
      if (prevScreenSizeRef.current && prevScreenSizeRef.current !== newCategory) {
        // Trigger transition animation on breakpoint change
        setIsScreenTransitioning(true);
        const timer = setTimeout(() => setIsScreenTransitioning(false), 400);
        return () => clearTimeout(timer);
      }
      prevScreenSizeRef.current = newCategory;
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Progressive Chunked Fetching
  useEffect(() => {
    let isCancelled = false;
    const categoryKey = activeFilter;

    const hasCached = Boolean(
      projectsByCategory[categoryKey] && projectsByCategory[categoryKey].length > 0
    );

    if (!hasCached) {
      setIsCategoryLoading(true);
    }
    setIsLoadingMore(false);

    const loadCategoryChunks = async () => {
      let page = 1;
      let hasMore = true;

      while (hasMore && !isCancelled) {
        try {
          if (page > 1 && !isCancelled) {
            setIsLoadingMore(true);
          }

          const apiPath = getCategoryApiPath(categoryKey);
          const url = `${API_BASE_URL}${apiPath}?page=${page}&limit=${CHUNK_SIZE}`;
          let response = await fetch(url);
          if (!response.ok && (categoryKey.toLowerCase() === 'award' || categoryKey.toLowerCase() === 'awards')) {
            response = await fetch(`${API_BASE_URL}/api/work?category=Award&page=${page}&limit=${CHUNK_SIZE}`);
          }
          const data = await response.json();

          if (isCancelled) break;

          if (data && data.success && Array.isArray(data.data)) {
            const validChunk = data.data.filter((project) =>
              String(project.image || "").trim()
            );

            setProjectsByCategory((prev) => {
              const currentList = prev[categoryKey] || [];
              const currentIds = new Set(
                currentList.map((item) => String(item._id || item.slug))
              );
              const uniqueNewItems = validChunk.filter(
                (item) => !currentIds.has(String(item._id || item.slug))
              );

              if (page === 1) {
                return {
                  ...prev,
                  [categoryKey]: validChunk
                };
              }

              return {
                ...prev,
                [categoryKey]: [...currentList, ...uniqueNewItems]
              };
            });

            if (page === 1) {
              setIsCategoryLoading(false);
            }

            hasMore = Boolean(data.hasMore) && validChunk.length > 0;
            page += 1;
          } else {
            hasMore = false;
          }
        } catch (error) {
          console.error(`Error loading chunk ${page} for ${categoryKey}:`, error);
          hasMore = false;
        }
      }

      if (!isCancelled) {
        setIsCategoryLoading(false);
        setIsLoadingMore(false);
      }
    };

    loadCategoryChunks();

    return () => {
      isCancelled = true;
    };
  }, [activeFilter]);

  const currentCategoryList = projectsByCategory[activeFilter] || [];
  const isAwardFilter = ["award", "awards"].includes(String(activeFilter || "").trim().toLowerCase());
  const filteredProjects = currentCategoryList.filter(
    (project) =>
      (isAwardFilter ? true : !isAwardProject(project)) &&
      !invalidImageProjects.has(project._id || project.slug)
  );

  const portfolioFilter = {
    filter: (category) => setActiveFilter(category),
    reset: () => setActiveFilter("All Projects"),
    getCurrentFilter: () => activeFilter,
    getProjects: () => filteredProjects,
  };

  useEffect(() => {
    window.portfolioFilter = portfolioFilter;
    return () => { delete window.portfolioFilter; };
  }, [portfolioFilter]);

  const navItems = ["About", "Work", "News", "Contact"];

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400/e0e0e0/808080?text=No+Image';
    return new URL(url, `${API_BASE_URL}/`).href;
  };

  const removeInvalidImageProject = (project) => {
    const projectKey = project._id || project.slug;
    setInvalidImageProjects((current) => {
      if (current.has(projectKey)) return current;
      return new Set([...current, projectKey]);
    });
  };

  const isAllProjects = activeFilter === "All Projects";

  return (
    <div className="w-full max-w-none">
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
        <div className="text-start mb-8">
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
                    : "text-[#C2BBB6] hover:text-[#1893D2]"
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
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300 w-full whitespace-nowrap text-left ${
                      activeFilter === "Entertainment"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    Entertainment
                  </button>
                  <button
                    onClick={() => portfolioFilter.filter("Social Impact")}
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300 w-full whitespace-nowrap text-left ${
                      activeFilter === "Social Impact"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    Social Impact
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

        {/* Initial Category Loading Spinner */}
        {isCategoryLoading && filteredProjects.length === 0 ? (
          <BlueChalkLoader inline={true} className="min-h-[400px]" />
        ) : (
          <>
            {/* Projects Grid without gradual resizing on category switch */}
            <div
              className={`grid w-full grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 ${
                isScreenTransitioning ? "opacity-90" : "opacity-100"
              }`}
            >
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
                    key={project._id || project.slug || index}
                    className={`bg-white overflow-hidden flex flex-col group ${gridClass}`}
                  >
                    <Link
                      to={`/work/${getWorkNameSlug(project)}`}
                      state={{
                        category: activeFilter,
                        title: project.title,
                        buttonText: project.buttonText,
                        thumbnail: project.image,
                        videoUrl: project.mediaUrl || project.videoUrl,
                        description: project.description,
                        subDescription: project.subDescription
                      }}
                      className="block w-full h-full"
                    >
                      <div className="relative overflow-hidden bg-gray-100 w-full aspect-[16/9]">
                        <img
                          src={getImageUrl(project.image)}
                          alt={project.title || 'Work'}
                          className="absolute inset-0 block h-full w-full object-cover grayscale transition-[filter] duration-700 ease-in-out group-hover:grayscale-0"
                          onError={() => {
                            removeInvalidImageProject(project);
                          }}
                        />
                        <img
                          src={getImageUrl(project.hoverImage || project.image)}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />

                        <div className="absolute bottom-4 right-2 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-50 h-12 sm:h-14 md:h-22 px-2 py-4 flex items-end justify-between transition-all duration-200 bg-black/40 group-hover:bg-[#1989c2]">
                          {(String(project.category || "").trim().toLowerCase() === "documentary" ||
                          (activeFilter === "Featured" && index === 0)) && (
                            <h6 className="absolute top-1 left-0 z-10 bg-[#4b5559] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[2px] text-white after:absolute after:left-full after:top-0 after:border-y-[6px] after:border-l-[8px] after:border-y-transparent after:border-l-[#4b5559]">
                              DOCUMENTARY
                            </h6>
                          )}
                          <span className="text-xs sm:text-sm md:text-sm font-medium ml-3">
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

            {/* Subtle background chunk merge loader */}
            {isLoadingMore && (
              <div className="flex items-center justify-center py-6 gap-2 text-gray-400 text-xs">
                <div className="w-8 h-[2px] bg-[#1893D2] animate-pulse"></div>
                <span>Loading more projects...</span>
              </div>
            )}
          </>
        )}

        {!isCategoryLoading && filteredProjects.length === 0 && (
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