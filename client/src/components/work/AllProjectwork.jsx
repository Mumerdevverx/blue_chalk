import React, { useState, useEffect, useRef } from 'react';

const AllProjectwork = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const portfolioRef = useRef(null);

  // All projects with full text overlays
  const allProjects = [
    { 
      id: 1, 
      src: 'https://picsum.photos/seed/atomic/600/400', 
      alt: "Atomic Echoes",
      title: "ATOMIC",
      subtitle: "ECHOES",
      description: "ENTOLD STORIES",
      subDescription: "FROM WORLD WIDE",
      category: "Featured",
      link: "https://bluechalk.com/work/atomic-echoes/",
      buttonText: "Now Streaming",
      showOverlay: true,
      overlayType: "atomic"
    },
    { 
      id: 2, 
      src: 'https://picsum.photos/seed/firebreak/600/400', 
      alt: "Firebreak",
      title: "FIREBREAK",
      subtitle: "COVERING",
      description: "THEIR",
      subDescription: "DOCUMENTARY CREATING THEIR TRACES",
      category: "Social Impact",
      link: "https://bluechalk.com/work/firebreak/",
      buttonText: "Watch Now",
      showOverlay: true,
      overlayType: "firebreak"
    },
    { 
      id: 3, 
      src: 'https://picsum.photos/seed/sister/600/400', 
      alt: "Sister Cities",
      title: "Sister Cities",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/sister-cities/",
      buttonText: "Now Streaming",
      showOverlay: false
    },
    { 
      id: 4, 
      src: 'https://picsum.photos/seed/branded/600/400', 
      alt: "Branded Project",
      title: "Branded Campaign",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Branded",
      link: "https://bluechalk.com/work/branded/",
      buttonText: "Watch Now",
      showOverlay: false
    },
    { 
      id: 5, 
      src: 'https://picsum.photos/seed/entertain/600/400', 
      alt: "Entertainment",
      title: "Entertainment Special",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Entertainment",
      link: "https://bluechalk.com/work/entertainment/",
      buttonText: "Now Streaming",
      showOverlay: false
    },
    { 
      id: 6, 
      src: 'https://picsum.photos/seed/doc/600/400', 
      alt: "Documentary",
      title: "Documentary Film",
      subtitle: "",
      description: "",
      subDescription: "",
      category: "Documentary",
      link: "https://bluechalk.com/work/documentary/",
      buttonText: "Watch Now",
      showOverlay: false
    }
  ];

  // Filter projects
  useEffect(() => {
    const filtered = activeFilter === 'All Projects' 
      ? allProjects 
      : allProjects.filter(p => p.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter]);

  // Portfolio Filter
  const portfolioFilter = {
    filter: (category) => {
      setActiveFilter(category);
    },
    reset: () => {
      setActiveFilter('All Projects');
    },
    getCurrentFilter: () => {
      return activeFilter;
    },
    getProjects: () => {
      return filteredProjects;
    }
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

  const navItems = ['About', 'Work', 'News', 'Contact'];

  // Render overlay based on type
  const renderOverlay = (project) => {
    if (!project.showOverlay) return null;

    if (project.overlayType === 'atomic') {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
          <h2 className="text-white font-extrabold leading-tight"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
              letterSpacing: 'clamp(4px, 1vw, 12px)',
              textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)'
            }}>
            {project.title}
          </h2>
          <h3 className="text-white font-bold"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 3rem)',
              letterSpacing: 'clamp(4px, 0.8vw, 8px)',
              textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)',
              margin: '5px 0 10px 0'
            }}>
            {project.subtitle}
          </h3>
          <p className="text-white font-light opacity-90"
            style={{
              fontSize: 'clamp(0.8rem, 1.2vw, 1.2rem)',
              letterSpacing: 'clamp(3px, 0.6vw, 6px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              margin: '5px 0'
            }}>
            {project.description}
          </p>
          <p className="text-white font-light opacity-80"
            style={{
              fontSize: 'clamp(0.7rem, 1vw, 1rem)',
              letterSpacing: 'clamp(2px, 0.4vw, 4px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              margin: '5px 0'
            }}>
            {project.subDescription}
          </p>
        </div>
      );
    }

    if (project.overlayType === 'firebreak') {
      return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 pointer-events-none">
          <h2 className="text-white font-extrabold leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
              letterSpacing: 'clamp(4px, 1vw, 10px)',
              textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.3)'
            }}>
            {project.title}
          </h2>
          <p className="text-white font-normal opacity-90"
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.4rem)',
              letterSpacing: 'clamp(3px, 0.6vw, 6px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              margin: '8px 0'
            }}>
            {project.subtitle}
          </p>
          <p className="text-white font-semibold opacity-90"
            style={{
              fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)',
              letterSpacing: 'clamp(4px, 0.8vw, 8px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              margin: '5px 0'
            }}>
            {project.description}
          </p>
          <p className="text-white font-light opacity-80 mx-auto"
            style={{
              fontSize: 'clamp(0.6rem, 0.9vw, 0.9rem)',
              letterSpacing: 'clamp(2px, 0.3vw, 3px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              margin: '8px 0',
              maxWidth: '80%'
            }}>
            {project.subDescription}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-6 border-b border-gray-100 mb-8 flex-wrap gap-4">
        <div className="text-xl font-bold text-black tracking-wide">
          <span className="text-[#0077be]">BLUE</span>CHALK
        </div>

        <div className="flex gap-4 md:gap-10 items-center flex-wrap">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm md:text-base uppercase tracking-wide transition-colors duration-300 hover:text-[#0077be] ${
                item === 'Work' ? 'text-[#0077be] font-semibold' : 'text-gray-700'
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
        <div className="text-center mb-10">
          {/* 2-Column Filter Layout */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-3 max-w-[500px] mx-auto px-4">
            {/* FILTER BY - Small text above Featured */}
            <div className="absolute -top-5 left-0 text-[0.6rem] font-semibold text-gray-400 tracking-widest uppercase">
              FILTER BY
            </div>

            {/* Left Column */}
            <div className="flex flex-col items-start gap-0.5 mt-2">
              <button
                onClick={() => portfolioFilter.filter('Featured')}
                className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left hover:text-[#0077be] ${
                  activeFilter === 'Featured' ? 'text-[#0077be] font-semibold' : 'text-gray-700 font-normal'
                }`}
              >
                Featured
              </button>

              <button
                onClick={() => portfolioFilter.filter('All Projects')}
                className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left hover:text-[#0077be] ${
                  activeFilter === 'All Projects' ? 'text-[#0077be] font-semibold' : 'text-gray-700 font-normal'
                }`}
              >
                All Projects
              </button>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-start gap-0.5 mt-2">
              {/* Branded with Arrow */}
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left flex items-center gap-2 hover:text-[#0077be] ${
                  activeFilter === 'Branded' ? 'text-[#0077be] font-semibold' : 'text-gray-700 font-normal'
                }`}
              >
                Branded
                <span className={`inline-block transition-transform duration-300 text-gray-400 text-xs ${
                  isBrandOpen ? 'rotate-180' : 'rotate-0'
                }`}>
                  ▲
                </span>
              </button>

              {/* Sub Categories */}
              {isBrandOpen && (
                <div className="flex flex-col items-start gap-0.5 w-full animate-[slideDown_0.3s_ease]">
                  <button
                    onClick={() => portfolioFilter.filter('Entertainment')}
                    className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left hover:text-[#0077be] ${
                      activeFilter === 'Entertainment' ? 'text-[#0077be] font-semibold' : 'text-gray-500'
                    }`}
                  >
                    Entertainment
                  </button>

                  <button
                    onClick={() => portfolioFilter.filter('Social Impact')}
                    className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left hover:text-[#0077be] ${
                      activeFilter === 'Social Impact' ? 'text-[#0077be] font-semibold' : 'text-gray-500'
                    }`}
                  >
                    Social Impact
                  </button>

                  <button
                    onClick={() => portfolioFilter.filter('Documentary')}
                    className={`bg-transparent border-none text-sm md:text-[0.9rem] py-0.5 cursor-pointer transition-all duration-300 tracking-wider uppercase w-full text-left hover:text-[#0077be] ${
                      activeFilter === 'Documentary' ? 'text-[#0077be] font-semibold' : 'text-gray-500'
                    }`}
                  >
                    Documentary
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-b border-gray-100 mt-4 max-w-[500px] mx-auto"></div>
        </div>

        {/* Projects Grid - 3 Images Per Row with px-1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 px-1">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col"
            >
              {/* Image Wrapper */}
              <div className="relative overflow-hidden bg-gray-100 w-full aspect-[16/9]">
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover block transition-transform duration-500 hover:scale-110"
                />
                
                {/* Text Overlay */}
                {renderOverlay(project)}

                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#0077be] text-white border-none px-6 py-2.5 text-sm font-semibold rounded-full cursor-pointer tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(0,119,190,0.4)] uppercase hover:bg-[#005f99] hover:scale-105 hover:shadow-lg">
                      {project.buttonText}
                    </button>
                  </a>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-3.5 py-1 rounded-full text-[0.65rem] font-semibold tracking-wide uppercase backdrop-blur-[5px]">
                  {project.category}
                </div>
              </div>

              {/* Title for non-overlay projects */}
              {!project.showOverlay && (
                <h3 className="text-[clamp(0.9rem,1.05vw,1.05rem)] font-semibold text-black px-4 py-3 m-0 bg-white text-center border-t border-gray-100 tracking-wide transition-all duration-300 hover:bg-[#0077be] hover:text-white">
                  {project.title}
                </h3>
              )}
            </div>
          ))}
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