import React, { useState, useEffect, useRef, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import { getWorkNameSlug } from "../../utils/workSlug";
import BlueChalkLoader from "../common/BlueChalkLoader";
import { fallbackWorkProjects } from "./fallbackWorkProjects";

const SERVICE_CATEGORIES = [
  "Branded",
  "Entertainment",
  "Social Impact",
  "Documentary",
];

const CATEGORY_FEATURED_SLUGS = {
  Featured: "atomic-echoes",
  "All Projects": "",
  Branded: "back-to-you",
  Entertainment: "sister-cities",
  "Social Impact": "we-break-cycles",
  Documentary: "atomic-echoes",
};

// Canonical sort ensures Oregon is index 0 and Atomic Echoes is index 1
// matching Blue Chalk's exact DOM structure and grid flow.
const canonicalSort = (items) => {
  if (!items || items.length === 0) return items;
  const result = [...items];

  const atomicIdx = result.findIndex((p) => {
    const s = getWorkNameSlug(p);
    return s.includes("atomic") || String(p.title || "").toLowerCase().includes("atomic");
  });

  const oregonIdx = result.findIndex((p) => {
    const s = getWorkNameSlug(p);
    return s.includes("oregon") || String(p.title || "").toLowerCase().includes("oregon");
  });

  if (atomicIdx === -1 && oregonIdx === -1) return result;

  let atomicItem = null;
  if (atomicIdx !== -1) {
    atomicItem = result.splice(atomicIdx, 1)[0];
  }

  let oregonItem = null;
  if (oregonIdx !== -1) {
    const newOregonIdx = result.findIndex((p) => {
      const s = getWorkNameSlug(p);
      return s.includes("oregon") || String(p.title || "").toLowerCase().includes("oregon");
    });
    if (newOregonIdx !== -1) {
      oregonItem = result.splice(newOregonIdx, 1)[0];
    }
  }

  if (atomicItem) {
    result.unshift(atomicItem);
  }
  if (oregonItem) {
    result.unshift(oregonItem);
  }

  return result;
};

const AllProjectwork = () => {
  const [allProjects, setAllProjects] = useState(() => canonicalSort(fallbackWorkProjects));
  const [activeFilter, setActiveFilter] = useState("Featured");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Branded");
  const [invalidImageProjects, setInvalidImageProjects] = useState(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const portfolioRef = useRef(null);
  const hasUserToggledRef = useRef(false);

  // Screen size detection for brand dropdown
  useEffect(() => {
    const isLg = window.innerWidth >= 1024;
    setIsBrandOpen(isLg);

    const handleResize = () => {
      if (!hasUserToggledRef.current) {
        setIsBrandOpen(window.innerWidth >= 1024);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch live projects from backend if available, smoothly merging with canonical list
  useEffect(() => {
    let isCancelled = false;

    const fetchLiveProjects = async () => {
      try {
        const [allRes, featRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/api/work`),
          fetch(`${API_BASE_URL}/api/work/featured`),
        ]);

        let apiAll = [];
        let featuredSlugs = new Set();

        if (featRes.status === "fulfilled" && featRes.value.ok) {
          const featData = await featRes.value.json();
          if (featData?.success && Array.isArray(featData.data)) {
            featData.data.forEach((p) => {
              featuredSlugs.add(getWorkNameSlug(p));
              if (p._id) featuredSlugs.add(String(p._id));
            });
          }
        }

        if (allRes.status === "fulfilled" && allRes.value.ok) {
          const allData = await allRes.value.json();
          if (allData?.success && Array.isArray(allData.data)) {
            apiAll = allData.data.filter((p) => String(p.image || "").trim());
          }
        }

        if (isCancelled || apiAll.length === 0) return;

        // Tag API projects with isFeaturedCategory if in featured endpoint
        const enrichedApiAll = apiAll.map((p) => {
          const slug = getWorkNameSlug(p);
          const isFeat =
            p.isFeatured ||
            featuredSlugs.has(slug) ||
            featuredSlugs.has(String(p._id));
          return {
            ...p,
            isFeaturedCategory: isFeat || p.isFeatured,
          };
        });

        // Merge with existing fallback projects to preserve complete list
        setAllProjects((prev) => {
          const existingMap = new Map();
          prev.forEach((p) => existingMap.set(getWorkNameSlug(p), p));

          enrichedApiAll.forEach((p) => {
            const slug = getWorkNameSlug(p);
            existingMap.set(slug, {
              ...existingMap.get(slug),
              ...p,
            });
          });

          return canonicalSort(Array.from(existingMap.values()));
        });
      } catch (err) {
        // Fallback projects remain active
      }
    };

    fetchLiveProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Expose portfolioFilter object on window for external callers
  const portfolioFilter = useMemo(
    () => ({
      filter: (category) => {
        setActiveFilter(category);
        if (SERVICE_CATEGORIES.includes(category)) {
          setSelectedService(category);
        }
      },
      reset: () => setActiveFilter("All Projects"),
      getCurrentFilter: () => activeFilter,
      getProjects: () => allProjects,
    }),
    [activeFilter, allProjects]
  );

  useEffect(() => {
    window.portfolioFilter = portfolioFilter;
    return () => {
      delete window.portfolioFilter;
    };
  }, [portfolioFilter]);

  const navItems = ["About", "Work", "News", "Contact"];

  const getImageUrl = (url) => {
    if (!url) return "https://placehold.co/600x400/e0e0e0/808080?text=No+Image";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      return url;
    }
    return new URL(url, `${API_BASE_URL}/`).href;
  };

  const removeInvalidImageProject = (project) => {
    const projectKey = project._id || project.slug;
    setInvalidImageProjects((current) => {
      if (current.has(projectKey)) return current;
      return new Set([...current, projectKey]);
    });
  };

  const isAwardFilter = ["award", "awards"].includes(
    String(activeFilter || "").trim().toLowerCase()
  );

  // Compute active category target featured slug
  const activeFeaturedSlug = CATEGORY_FEATURED_SLUGS[activeFilter] || "";

  // Determine active service category for the right column
  const isServiceActive = SERVICE_CATEGORIES.includes(activeFilter);
  const activeService = isServiceActive ? activeFilter : selectedService;

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
                onClick={() => setActiveFilter("Featured")}
                className={`lg:text-[36px] md:text-4xl text-xl py-0.5 cursor-pointer transition-all duration-300 w-full text-left ${
                  activeFilter === "Featured"
                    ? "text-[#1893D2]"
                    : "text-[#C2BBB6] hover:text-[#1893D2]"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveFilter("All Projects")}
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
              <div className="flex flex-col items-start w-full">
                {!isBrandOpen ? (
                  <div className="flex items-center justify-between w-full py-0.5">
                    <button
                      onClick={() => {
                        setActiveFilter(activeService);
                        setSelectedService(activeService);
                      }}
                      className={`lg:text-[36px] md:text-4xl text-xl py-0.5 cursor-pointer transition-all duration-300 text-left whitespace-nowrap ${
                        isServiceActive
                          ? "text-[#1893D2]"
                          : "text-[#C2BBB6] hover:text-[#1893D2]"
                      }`}
                    >
                      <span>{activeService}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        hasUserToggledRef.current = true;
                        setIsBrandOpen(true);
                      }}
                      aria-label="Open categories"
                      className="cursor-pointer transition-colors duration-200 text-[#7d7c7c] hover:text-[#1893D2] flex-shrink-0 flex items-center justify-center p-1 ml-4"
                    >
                      <svg
                        className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center justify-between w-full py-0.5">
                      <button
                        onClick={() => {
                          setActiveFilter(SERVICE_CATEGORIES[0]);
                          setSelectedService(SERVICE_CATEGORIES[0]);
                        }}
                        className={`lg:text-[36px] md:text-4xl text-xl py-0.5 cursor-pointer transition-all duration-300 text-left whitespace-nowrap ${
                          activeFilter === SERVICE_CATEGORIES[0]
                            ? "text-[#1893D2]"
                            : "text-[#C2BBB6] hover:text-[#1893D2]"
                        }`}
                      >
                        <span>{SERVICE_CATEGORIES[0]}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          hasUserToggledRef.current = true;
                          setIsBrandOpen(false);
                        }}
                        aria-label="Close categories"
                        className="cursor-pointer transition-colors duration-200 text-[#7d7c7c] hover:text-[#1893D2] flex-shrink-0 flex items-center justify-center p-1 max-sm:mt-4 lg:ml-50 md:ml-20 ml-10 "
                      >
                        <svg
                          className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rotate-180 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col items-start w-full pl-0 animate-[slideDown_0.3s_ease]">
                      {SERVICE_CATEGORIES.slice(1).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveFilter(cat);
                            setSelectedService(cat);
                          }}
                          className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300 w-full whitespace-nowrap text-left ${
                            activeFilter === cat
                              ? "text-[#1893D2]"
                              : "text-[#C2BBB6] hover:text-[#1893D2]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Initial Category Loading Spinner */}
        {isInitialLoading && allProjects.length === 0 ? (
          <BlueChalkLoader inline={true} className="min-h-[400px]" />
        ) : (
          /* Projects Grid: Single unified DOM list with CSS transitions on min-height */
          <div className="project projects">
            {allProjects.map((project, index) => {
              const slug = getWorkNameSlug(project);
              const projectCategory = String(project.category || "").trim().toLowerCase();
              const isAward = ["award", "awards"].includes(projectCategory);

              if (!isAwardFilter && isAward) return null;
              if (invalidImageProjects.has(project._id || slug)) return null;

              // Visibility determination
              let isHidden = false;
              if (activeFilter === "All Projects") {
                isHidden = false;
              } else if (activeFilter === "Featured") {
                const isFeaturedItem =
                  Boolean(project.isFeatured) ||
                  Boolean(project.isFeaturedCategory) ||
                  (Array.isArray(project.categories) && project.categories.includes("Featured")) ||
                  slug === "atomic-echoes" ||
                  slug === "oregon-accessibility-happens-here" ||
                  slug === "myface-our-beauty-our-stories-our-power" ||
                  slug === "roadrunners-rise" ||
                  slug === "game-hoops-and-dreams-rural-china" ||
                  slug === "firebreak" ||
                  slug === "what-lasts" ||
                  slug === "sister-cities" ||
                  slug === "growing-floret" ||
                  slug === "back-to-you" ||
                  slug === "quiet-no-more";

                isHidden = !isFeaturedItem;
              } else {
                const norm = activeFilter.trim().toLowerCase();
                const matchesCategory =
                  projectCategory.includes(norm) ||
                  (Array.isArray(project.categories) &&
                    project.categories.some((c) => c.toLowerCase().includes(norm)));
                isHidden = !matchesCategory;
              }

              // Featured determination (2x2 square in grid)
              let isFeatured = false;
              if (activeFilter !== "All Projects") {
                if (activeFeaturedSlug) {
                  isFeatured = slug.includes(activeFeaturedSlug) || activeFeaturedSlug.includes(slug);
                } else if (activeFilter === "Featured") {
                  isFeatured = slug.includes("atomic") || index === 1;
                }
              }

              const projectKey = project._id || slug || index;

              return (
                <div
                  key={projectKey}
                  data-slug={slug}
                  className={`project-items project-card group ${
                    isFeatured ? "featured" : ""
                  } ${isHidden ? "hideme" : ""}`}
                >
                  <Link
                    to={`/work/${slug}`}
                    state={{
                      category: activeFilter,
                      title: project.title,
                      buttonText: project.buttonText,
                      thumbnail: project.image,
                      videoUrl: project.mediaUrl || project.videoUrl,
                      description: project.description,
                      subDescription: project.subDescription,
                    }}
                    className="project-link"
                  >
                    <div className="relative w-full h-full overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title || "Work"}
                        className="absolute inset-0 block h-full w-full object-cover transition-opacity duration-500 ease-in-out"
                        onError={() => removeInvalidImageProject(project)}
                      />
                      {project.hoverImage && (
                        <img
                          src={getImageUrl(project.hoverImage)}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      <div className="absolute bottom-4 right-2 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-50 h-12 sm:h-14 md:h-22 px-2 py-4 flex items-end justify-between transition-all duration-200 bg-black/40 group-hover:bg-[#1989c2]">
                        {((project.tag && project.tag.toUpperCase() === "DOCUMENTARY") ||
                          projectCategory === "documentary" ||
                          (activeFilter === "Featured" && isFeatured)) && (
                          <h6 className="absolute top-1 left-0 z-10 bg-[#4b5559] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[2px] text-white after:absolute after:left-full after:top-0 after:border-y-[6px] after:border-l-[8px] after:border-y-transparent after:border-l-[#4b5559]">
                            DOCUMENTARY
                          </h6>
                        )}
                        <span className="text-xs sm:text-sm md:text-sm font-medium ml-3">
                          {project.buttonText || project.title || "Watch Now"}
                        </span>
                        <FiPlus className="absolute top-1 right-1 sm:top-2 sm:right-2 text-base sm:text-lg" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Authentic Blue Chalk Work Grid & Gradual Shrink Transitions */
          .project, .projects {
            margin-top: 32px;
            // margin-left: -7.14285714vw;
            // margin-right: -7.14285714vw;
            display: grid !important;
            grid-template-columns: repeat(3, 33.33vw) !important;
            grid-gap: 1px !important;
            width: 100vw !important;
            overflow: hidden;
          }

          @media screen and (max-width: 767px) {
            .project, .projects {
              grid-template-columns: repeat(1, 100vw) !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }

          .project-items, .project-card {
            min-height: 18.748125vw;
            overflow: hidden;
            background-position: 50% 50%;
            background-size: cover;
            position: relative;
            filter: grayscale(100%);
            -webkit-transition-property: all;
            -webkit-transition-duration: 500ms;
            -webkit-transition-delay: 0ms;
            -webkit-transition-timing-function: ease-in-out;
            transition-property: all;
            transition-duration: 500ms;
            transition-delay: 0ms;
            transition-timing-function: ease-in-out;
          }

          .project-items.featured, .project-card.featured {
            min-height: 37.49625vw !important;
            grid-column: 1 / 3 !important;
            grid-row: 1 / 3 !important;
          }

          .project-items.hideme, .project-card.hideme {
            display: none !important;
          }

          .project-items:hover, .project-card:hover {
            filter: none;
          }

          .project-link {
            display: block;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }

          @media screen and (max-width: 767px) {
            .project-items.featured, .project-card.featured {
              min-height: 56.25vw !important;
              grid-column: 1 / 1 !important;
              grid-row: 1 / 1 !important;
            }
            .project-items, .project-card {
              min-height: 56.25vw !important;
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AllProjectwork;
