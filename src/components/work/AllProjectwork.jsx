import React, { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";


const AllProjectwork = () => {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const portfolioRef = useRef(null);

  // Screen size detection for LG screens
  const [isLgScreen, setIsLgScreen] = useState(false);

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

  // 50 Projects with equal distribution - 10 projects per category
  const allProjects = [
    // ============ FEATURED (10 Projects) ============
    {
      id: 1,
      src: "https://picsum.photos/seed/atomic1/600/400",
      alt: "Atomic Echoes",
      title: "ATOMIC ECHOES",
      subtitle: "",
      description: "UNTOLD STORIES",
      subDescription: "FROM WORLD WAR II",
      category: "Featured",
      link: "https://bluechalk.com/work/atomic-echoes/",
      buttonText: "Now Streaming",
      showOverlay: true,
      overlayType: "atomic",
    },
    {
      id: 2,
      src: "https://picsum.photos/seed/firebreak1/600/400",
      alt: "Firebreak",
      title: "COVERING",
      subtitle: "THEIR",
      description: "TRACKS",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/firebreak/",
      buttonText: "Watch Now",
      showOverlay: true,
      overlayType: "firebreak",
    },
    {
      id: 3,
      src: "https://picsum.photos/seed/backtoyou/600/400",
      alt: "Back To You",
      title: "BACK TO YOU",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/back-to-you/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 4,
      src: "https://picsum.photos/seed/featured4/600/400",
      alt: "Featured Project 4",
      title: "FEATURED PROJECT 4",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured4/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 5,
      src: "https://picsum.photos/seed/featured5/600/400",
      alt: "Featured Project 5",
      title: "FEATURED PROJECT 5",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured5/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 6,
      src: "https://picsum.photos/seed/featured6/600/400",
      alt: "Featured Project 6",
      title: "FEATURED PROJECT 6",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured6/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 7,
      src: "https://picsum.photos/seed/featured7/600/400",
      alt: "Featured Project 7",
      title: "FEATURED PROJECT 7",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured7/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 8,
      src: "https://picsum.photos/seed/featured8/600/400",
      alt: "Featured Project 8",
      title: "FEATURED PROJECT 8",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured8/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 9,
      src: "https://picsum.photos/seed/featured9/600/400",
      alt: "Featured Project 9",
      title: "FEATURED PROJECT 9",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured9/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 10,
      src: "https://picsum.photos/seed/featured10/600/400",
      alt: "Featured Project 10",
      title: "FEATURED PROJECT 10",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Featured",
      link: "https://bluechalk.com/work/featured10/",
      buttonText: "Watch Now",
      showOverlay: false,
    },

    // ============ BRANDED (10 Projects) ============
    {
      id: 11,
      src: "https://picsum.photos/seed/branded1/600/400",
      alt: "Branded Project 1",
      title: "BRANDED CAMPAIGN 1",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded1/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 12,
      src: "https://picsum.photos/seed/branded2/600/400",
      alt: "Branded Project 2",
      title: "BRANDED CAMPAIGN 2",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded2/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 13,
      src: "https://picsum.photos/seed/branded3/600/400",
      alt: "Branded Project 3",
      title: "BRANDED CAMPAIGN 3",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded3/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 14,
      src: "https://picsum.photos/seed/branded4/600/400",
      alt: "Branded Project 4",
      title: "BRANDED CAMPAIGN 4",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded4/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 15,
      src: "https://picsum.photos/seed/branded5/600/400",
      alt: "Branded Project 5",
      title: "BRANDED CAMPAIGN 5",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded5/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 16,
      src: "https://picsum.photos/seed/branded6/600/400",
      alt: "Branded Project 6",
      title: "BRANDED CAMPAIGN 6",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded6/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 17,
      src: "https://picsum.photos/seed/branded7/600/400",
      alt: "Branded Project 7",
      title: "BRANDED CAMPAIGN 7",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded7/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 18,
      src: "https://picsum.photos/seed/branded8/600/400",
      alt: "Branded Project 8",
      title: "BRANDED CAMPAIGN 8",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded8/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 19,
      src: "https://picsum.photos/seed/branded9/600/400",
      alt: "Branded Project 9",
      title: "BRANDED CAMPAIGN 9",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded9/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 20,
      src: "https://picsum.photos/seed/branded10/600/400",
      alt: "Branded Project 10",
      title: "BRANDED CAMPAIGN 10",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded10/",
      buttonText: "Watch Now",
      showOverlay: false,
    },

    // ============ ENTERTAINMENT (10 Projects) ============
    {
      id: 21,
      src: "https://picsum.photos/seed/entertain1/600/400",
      alt: "Entertainment 1",
      title: "ENTERTAINMENT 1",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain1/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 22,
      src: "https://picsum.photos/seed/entertain2/600/400",
      alt: "Entertainment 2",
      title: "ENTERTAINMENT 2",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain2/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 23,
      src: "https://picsum.photos/seed/entertain3/600/400",
      alt: "Entertainment 3",
      title: "ENTERTAINMENT 3",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain3/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 24,
      src: "https://picsum.photos/seed/entertain4/600/400",
      alt: "Entertainment 4",
      title: "ENTERTAINMENT 4",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain4/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 25,
      src: "https://picsum.photos/seed/entertain5/600/400",
      alt: "Entertainment 5",
      title: "ENTERTAINMENT 5",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain5/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 26,
      src: "https://picsum.photos/seed/entertain6/600/400",
      alt: "Entertainment 6",
      title: "ENTERTAINMENT 6",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain6/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 27,
      src: "https://picsum.photos/seed/entertain7/600/400",
      alt: "Entertainment 7",
      title: "ENTERTAINMENT 7",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain7/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 28,
      src: "https://picsum.photos/seed/entertain8/600/400",
      alt: "Entertainment 8",
      title: "ENTERTAINMENT 8",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain8/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 29,
      src: "https://picsum.photos/seed/entertain9/600/400",
      alt: "Entertainment 9",
      title: "ENTERTAINMENT 9",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain9/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 30,
      src: "https://picsum.photos/seed/entertain10/600/400",
      alt: "Entertainment 10",
      title: "ENTERTAINMENT 10",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertain10/",
      buttonText: "Watch Now",
      showOverlay: false,
    },

    // ============ SOCIAL IMPACT (10 Projects) ============
    {
      id: 31,
      src: "https://picsum.photos/seed/social1/600/400",
      alt: "Social Impact 1",
      title: "SOCIAL IMPACT 1",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social1/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 32,
      src: "https://picsum.photos/seed/social2/600/400",
      alt: "Social Impact 2",
      title: "SOCIAL IMPACT 2",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social2/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 33,
      src: "https://picsum.photos/seed/social3/600/400",
      alt: "Social Impact 3",
      title: "SOCIAL IMPACT 3",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social3/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 34,
      src: "https://picsum.photos/seed/social4/600/400",
      alt: "Social Impact 4",
      title: "SOCIAL IMPACT 4",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social4/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 35,
      src: "https://picsum.photos/seed/social5/600/400",
      alt: "Social Impact 5",
      title: "SOCIAL IMPACT 5",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social5/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 36,
      src: "https://picsum.photos/seed/social6/600/400",
      alt: "Social Impact 6",
      title: "SOCIAL IMPACT 6",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social6/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 37,
      src: "https://picsum.photos/seed/social7/600/400",
      alt: "Social Impact 7",
      title: "SOCIAL IMPACT 7",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social7/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 38,
      src: "https://picsum.photos/seed/social8/600/400",
      alt: "Social Impact 8",
      title: "SOCIAL IMPACT 8",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social8/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 39,
      src: "https://picsum.photos/seed/social9/600/400",
      alt: "Social Impact 9",
      title: "SOCIAL IMPACT 9",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social9/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 40,
      src: "https://picsum.photos/seed/social10/600/400",
      alt: "Social Impact 10",
      title: "SOCIAL IMPACT 10",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Social Impact",
      link: "https://bluechalk.com/work/social10/",
      buttonText: "Watch Now",
      showOverlay: false,
    },

    // ============ DOCUMENTARY (10 Projects) ============
    {
      id: 41,
      src: "https://picsum.photos/seed/doc1/600/400",
      alt: "Documentary 1",
      title: "DOCUMENTARY 1",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc1/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 42,
      src: "https://picsum.photos/seed/doc2/600/400",
      alt: "Documentary 2",
      title: "DOCUMENTARY 2",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc2/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 43,
      src: "https://picsum.photos/seed/doc3/600/400",
      alt: "Documentary 3",
      title: "DOCUMENTARY 3",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc3/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 44,
      src: "https://picsum.photos/seed/doc4/600/400",
      alt: "Documentary 4",
      title: "DOCUMENTARY 4",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc4/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 45,
      src: "https://picsum.photos/seed/doc5/600/400",
      alt: "Documentary 5",
      title: "DOCUMENTARY 5",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc5/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 46,
      src: "https://picsum.photos/seed/doc6/600/400",
      alt: "Documentary 6",
      title: "DOCUMENTARY 6",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc6/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 47,
      src: "https://picsum.photos/seed/doc7/600/400",
      alt: "Documentary 7",
      title: "DOCUMENTARY 7",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc7/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 48,
      src: "https://picsum.photos/seed/doc8/600/400",
      alt: "Documentary 8",
      title: "DOCUMENTARY 8",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc8/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 49,
      src: "https://picsum.photos/seed/doc9/600/400",
      alt: "Documentary 9",
      title: "DOCUMENTARY 9",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc9/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
    {
      id: 50,
      src: "https://picsum.photos/seed/doc10/600/400",
      alt: "Documentary 10",
      title: "DOCUMENTARY 10",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/doc10/",
      buttonText: "Watch Now",
      showOverlay: false,
    },
  ];

  // Filter projects
  useEffect(() => {
    const filtered =
      activeFilter === "All Projects"
        ? allProjects
        : allProjects.filter((p) => p.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter]);

  // Portfolio Filter - No auto-close
  const portfolioFilter = {
    filter: (category) => {
      setActiveFilter(category);
      // No auto-close - Branded stays open when clicking other filters
    },
    reset: () => {
      setActiveFilter("All Projects");
    },
    getCurrentFilter: () => {
      return activeFilter;
    },
    getProjects: () => {
      return filteredProjects;
    },
  };

  // Expose to window
  useEffect(() => {
    window.portfolioFilter = portfolioFilter;
    window.activeFilter = activeFilter;

    return () => {
      delete window.portfolioFilter;
      delete window.activeFilter;
    };
  }, [portfolioFilter, activeFilter]);

  const navItems = ["About", "Work", "News", "Contact"];

  // Render overlay based on type
  const renderOverlay = (project) => {
    if (!project.showOverlay) return null;

    if (project.overlayType === "atomic") {
      return (
        <div className="absolute top-1/2 font-basis-web left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
          <h2
            className="text-white font-extrabold leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              letterSpacing: "clamp(4px, 1vw, 12px)",
              textShadow:
                "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {project.title}
          </h2>
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
              textShadow:
                "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)",
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

    return null;
  };

  // Check if current filter is "All Projects"
  const isAllProjects = activeFilter === "All Projects";

  return (
    <div className="max-w-[1440px] ">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-start py-6 border-gray-100 mb-8 flex-wrap gap-4">
        <div className="flex gap-4 md:gap-10 items-start flex-wrap">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm md:text-base uppercase tracking-wide transition-colors duration-300 hover:text-[#0077be] ${
                item === "Work"
                  ? "text-[#0077be] font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Portfolio Filter */}
      <div ref={portfolioRef} className="w-full js-portfolio-variety-1">
        {/* Filter Bar */}
        <div className="text-start mb-10">
          {/* 2-Column Filter Layout */}
          <div className="relative grid grid-cols-2 gap-1 sm:gap-3 lg:max-w-[500px] mx-auto px-4 lg:pt-6 pt-0 w-full lg:px-0 md:px-6">
            {/* FILTER BY - Small text above Featured */}
            <div className="absolute lg:top-1 md:-top-2.5 top-3 lg:left-17 md:left-13.5 left-4 text-[11px] font-semibold text-[#C2BBB6] tracking-[3px]   uppercase">
              FILTER BY:
            </div>

            {/* Left Column - Featured and All Projects */}
            <div className="flex flex-col items-center gap-0.5 lg:mt-2 md:mt-2 mt-8 md:ml-7 lg:ml-16">
              <button
                onClick={() => portfolioFilter.filter("Featured")}
                className={`lg:text-[36px] md:text-4xl text-xl py-0.5 font cursor-pointer transition-all duration-300   w-full text-left ${
                  activeFilter === "Featured"
                    ? "text-[#1893D2]"
                    : "text-[#C2BBB6] hover:text-[#1893D2]"
                }`}
              >
                Featured
              </button>

              <button
                onClick={() => portfolioFilter.filter("All Projects")}
                className={`lg:text-[36px] md:text-4xl text-xl py-0.5 cursor-pointer transition-all duration-300   w-full text-left whitespace-nowrap ${
                  activeFilter === "All Projects"
                    ? "text-[#1893D2]"
                    : "text-[#877A71] hover:text-[#1893D2]"
                }`}
              >
                All Projects
              </button>
            </div>

            {/* Right Column - Branded with Arrow */}
            <div className="flex flex-col md:ml-2 lg:ml-45 mt-2">
              {/* Branded with Arrow */}
              <div className="flex items-center w-full gap-3 md:gap-4 lg:gap-6">
                <button
                  onClick={() => portfolioFilter.filter("Branded")}
                  className={`lg:text-[36px] md:text-4xl max-sm:mt-4 text-xl py-1.5 cursor-pointer transition-all duration-300   text-left ${
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
                    className={`w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 max-sm:mt-4  lg:ml-50 md:ml-20 ml-10
                       transition-all duration-300 ${
                         isBrandOpen ? "rotate-180" : ""
                       }`}
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

              {/* Sub Categories - Only show when Branded is open */}
              {isBrandOpen && (
                <div className="flex flex-col items-start  w-full pl-0 animate-[slideDown_0.3s_ease]">
                  <button
                    onClick={() => portfolioFilter.filter("Entertainment")}
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300   w-full text-left ${
                      activeFilter === "Entertainment"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    Entertainment
                  </button>

                  <button
                    onClick={() => portfolioFilter.filter("Social Impact")}
                    className={`lg:text-[36px] md:text-4xl leading-[43px] text-xl py-1.5 cursor-pointer transition-all duration-300   w-full text-left ${
                      activeFilter === "Social Impact"
                        ? "text-[#1893D2]"
                        : "text-[#C2BBB6] hover:text-[#1893D2]"
                    }`}
                  >
                    SocialImpact
                  </button>

                  <button
                    onClick={() => portfolioFilter.filter("Documentary")}
                    className={`lg:text-[36px] leading-[43px] md:text-4xl text-xl py-1.5 cursor-pointer transition-all duration-300  w-full text-left ${
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

        {/* Projects Grid - 3 columns */}
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
                key={project.id}
                className={`bg-white overflow-hidden transition-all duration-300 flex flex-col group ${gridClass}`}
              >
                {/* ✅ Link - Image click karne par /workdetail page open hoga */}
                <Link to="/workdetail" className="block w-full h-full">
                  {/* Image Wrapper */}
                  <div className="relative overflow-hidden bg-gray-100 w-full aspect-[16/9]">
                    <img
                      src={project.src}
                      alt={project.alt}
                      className="w-full h-full object-cover block transition-transform duration-300 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/e0e0e0/808080?text=Image+Not+Found";
                      }}
                    />

                    {/* Text Overlay */}
                    {renderOverlay(project)}

                    {/* Bottom Right - What Lasts with Plus Icon */}
                    <div
                      className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-4 md:right-4 text-white w-28 sm:w-32 md:w-36 lg:w-43 h-12 sm:h-14 md:h-16 px-2 py-2 flex items-end justify-between transition-all duration-200 bg-black/60 group-hover:bg-[#1989c2]`}
                    >
                      <span className="text-xs sm:text-sm md:text-sm font-medium">
                        What Lasts
                      </span>
                      <FiPlus className="absolute top-1 right-1 sm:top-2 sm:right-2 text-base sm:text-lg" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-lg">
            No projects found in this category
          </div>
        )}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AllProjectwork;