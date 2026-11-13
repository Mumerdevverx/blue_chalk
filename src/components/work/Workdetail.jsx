import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import API_BASE_URL from "../../config/api";
import { getWorkNameSlug } from "../../utils/workSlug";

const Workdetail = () => {
  const noImageUrl = "https://placehold.co/1200x675/e0e0e0/808080?text=No+Preview";
  const { slug } = useParams();
  const location = useLocation();
  const videoRef = useRef(null);
  const [work, setWork] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [nextProject, setNextProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [workRes, allRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/work/slug/${slug}`),
          fetch(`${API_BASE_URL}/api/work`)
        ]);
        const workData = await workRes.json();
        const allData = await allRes.json();
        const currentWork = workData.success
          ? workData.data
          : allData.success
            ? allData.data.find(
              (project) => project.slug === slug || getWorkNameSlug(project) === slug
            )
            : null;

        if (!currentWork) {
          setError(workData.message || "Work not found");
          setLoading(false);
          return;
        }

        setWork(currentWork);
        if (allData.success) {
          setAllProjects(allData.data);
          const currentIndex = allData.data.findIndex(
            (project) => project._id === currentWork._id
          );
          if (currentIndex !== -1 && currentIndex < allData.data.length - 1) {
            setNextProject(allData.data[currentIndex + 1]);
          }
          // Related: same category first, then others, excluding current
          const others = allData.data.filter(p => p._id !== currentWork._id);
          const sameCategory = others.filter(p => p.category === currentWork.category);
          const different = others.filter(p => p.category !== currentWork.category);
          setRelatedProjects([...sameCategory, ...different].slice(0, 3));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load work");
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // ✅ Extract video URL – supports YouTube iframe AND direct <video> tag
  const extractVideoFromContent = (html) => {
    if (!html) return null;

    // Try YouTube iframe
    let match = html.match(/<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>/);
    if (match) return match[1];

    // Try YouTube embed div
    match = html.match(/<div data-youtube-video="[^"]*"><iframe[^>]*src="([^"]*)"[^>]*><\/iframe><\/div>/);
    if (match) return match[1];

    // ✅ Try direct <video> tag
    match = html.match(/<video[^>]*src="([^"]*)"[^>]*>/);
    if (match) return match[1];

    return null;
  };

  // ✅ Clean content – remove iframes and video tags
  const cleanContent = (html) => {
    if (!html) return '';
    let cleaned = html
      .replace(/<div data-youtube-video="[^"]*"><iframe[^>]*src="[^"]*"[^>]*><\/iframe><\/div>/, '')
      .replace(/<iframe[^>]*src="[^"]*"[^>]*><\/iframe>/, '')
      .replace(/<video[^>]*src="[^"]*"[^>]*><\/video>/, '') // ✅ Remove video tags
      .replace(/Write something amazing\.\.\./g, '')
      .trim();
    return cleaned;
  };

  const extractWorkAboutContent = (html) => {
    if (!html) {
      return { content: html, contextText: "", leftText: "", rightText: "" };
    }

    const parsedContent = new DOMParser().parseFromString(html, "text/html");
    const wrapper = parsedContent.querySelector('[data-work-about-content="true"]');
    if (!wrapper) {
      return { content: html, contextText: "", leftText: "", rightText: "" };
    }

    return {
      content: wrapper.querySelector('[data-work-main-content="true"]')?.innerHTML || "",
      contextText: wrapper.querySelector('[data-work-context-text="true"]')?.textContent || "",
      leftText: wrapper.querySelector('[data-work-left-text="true"]')?.textContent || "",
      rightText: wrapper.querySelector('[data-work-right-text="true"]')?.textContent || ""
    };
  };

  // ✅ Check if URL is direct video (MP4, WebM, etc.)
  const isDirectVideo = (url) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  };

  // ✅ Convert YouTube watch URL to embed
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) {
      return url
        .replace(/[?&]autoplay=1(&|$)/i, (match, separator) => separator === "&" ? "?" : "")
        .replace(/[?&]autoplay=true(&|$)/i, (match, separator) => separator === "&" ? "?" : "");
    }
    if (url.includes("watch?v=")) {
      const videoId = new URLSearchParams(new URL(url).search).get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  };

  const displayTitleSource = work?.buttonText || work?.title || "Untitled";
  const displayTitle =
    new DOMParser()
      .parseFromString(displayTitleSource, "text/html")
      .body.textContent.replace(/\s+/g, " ").trim() || "Untitled";

  const getImageUrl = (url) => {
    if (typeof url !== "string" || !url.trim()) return "";
    if (/^https?:\/\//i.test(url)) return url;
    try {
      return new URL(url, `${API_BASE_URL.replace(/\/+$/, "")}/`).href;
    } catch {
      return "";
    }
  };

  const getProjectImageUrls = (project) =>
    [
      project?.image,
      project?.imageUrl,
      project?.thumbnail,
      project?.thumbnailUrl,
      project?.mediaUrl,
      project?.hoverImage
    ]
      .map(getImageUrl)
      .filter((url, index, urls) => url && urls.indexOf(url) === index);

  const handleImageError = (event, fallbackUrls) => {
    const image = event.currentTarget;
    const currentIndex = Number(image.dataset.fallbackIndex || 0);
    const nextUrl = fallbackUrls[currentIndex + 1];

    if (nextUrl) {
      image.dataset.fallbackIndex = String(currentIndex + 1);
      image.src = nextUrl;
      return;
    }

    image.onerror = null;
    image.src = noImageUrl;
  };

  const getYouTubeThumbnail = (url) => {
    if (!url || !/(youtube\.com|youtu\.be)/i.test(url)) return "";

    let videoId = url.match(/\/embed\/([^?&#/]+)/i)?.[1];
    if (!videoId && url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?&#]/)[0];
    }
    if (!videoId) {
      try {
        videoId = new URLSearchParams(new URL(url).search).get("v");
      } catch {
        return "";
      }
    }

    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  };

  const getPosterUrls = (project, video, preferredThumbnail) => {
    const urls = [
      ...getProjectImageUrls(project),
      getImageUrl(preferredThumbnail),
      getYouTubeThumbnail(video),
      noImageUrl
    ];
    return urls.filter((url, index) => url && urls.indexOf(url) === index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-gray-500 text-lg">{error || "Work not found"}</p>
        <Link to="/work" className="text-[#0089D0] hover:underline mt-4">
          ← Back to Work
        </Link>
      </div>
    );
  }

  const videoUrl = extractVideoFromContent(work.aboutContent);
  const aboutFields = extractWorkAboutContent(work.aboutContent);
  const cleanedContent = cleanContent(aboutFields.content);
  const aboutContextText = aboutFields.contextText;
  const aboutLeftText = aboutFields.leftText;
  const aboutRightText = aboutFields.rightText;
  const finalVideoUrl = getEmbedUrl(videoUrl) || "";
  const posterUrls = getPosterUrls(work, finalVideoUrl, location.state?.thumbnail);
  const posterUrl = posterUrls[0];
  const nextProjectImageUrls = getProjectImageUrls(nextProject);

  const startVideo = () => {
    setIsVideoStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch((playError) => {
        console.error("Unable to start work video:", playError);
      });
    }
  };

  // ✅ Decide which player to render
  const renderVideoPlayer = () => {
    if (!videoUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
          No video available
        </div>
      );
    }

    if (isDirectVideo(videoUrl)) {
      // ✅ Direct MP4 video
      return (
        <video
          ref={videoRef}
          poster={posterUrl}
          controls
          muted
          loop
          playsInline
          onPlay={() => setIsVideoStarted(true)}
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#000' }}
        >
          <source src={getImageUrl(videoUrl)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // ✅ YouTube/Vimeo embed
      return (
        <iframe
          src={isVideoStarted ? `${finalVideoUrl}${finalVideoUrl.includes("?") ? "&" : "?"}autoplay=1` : finalVideoUrl}
          title="Video"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      );
    }
  };

  return (
    <>
    <div className="w-full lg:mt-[80px] md:mt-[115px] mt-[100px] lg:px-20 px-4">
      {/* ✅ VIDEO PLAYER – at the top */}
      <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
        {renderVideoPlayer()}
        {videoUrl && !isVideoStarted && (
          <button
            type="button"
            onClick={startVideo}
            className="group absolute inset-0 z-10 flex items-center justify-center"
            aria-label="Play video"
          >
            <img
              src={posterUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              onError={(event) => handleImageError(event, posterUrls)}
            />
            <span className="group/play relative z-10 flex h-16 w-16 items-center justify-center">
              <span className="h-0 w-0 border-y-[20px] border-y-transparent border-l-[34px] border-l-white transition-colors duration-300 group-hover/play:border-l-[#0089D0]" />
            </span>
          </button>
        )}
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-normal text-[#293339] leading-[1.2]">
              {displayTitle}
            </h1>
            <div className="border-b border-[#D9D9D9] mt-4"></div>
            <p className="text-[14px] md:text-[15px] text-[#9EA5BB] tracking-[2px] mt-3 uppercase">
              {work.subDescription || work.description}
            </p>
            <div className="mt-2">
              {cleanedContent ? (
                <div
                  className="work-content text-[17px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cleanedContent }}
                />
              ) : (
                <p className="text-gray-500">No content available.</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE – Next Project */}
          <div className="lg:w-[280px] flex-shrink-0">
            {nextProject ? (
              <Link to={`/work/${getWorkNameSlug(nextProject)}`} className="group block">
                <div className="text-right">
                  <p className="flex items-center justify-between gap-3 text-[14px] leading-tight tracking-[1px] text-[#C2BBB6] transition-colors duration-300 group-hover:text-[#1893D2]">
                    <span>
                      <span className="tracking-[2.5px] uppercase">NEXT PROJECT:</span>{" "}
                      {nextProject.buttonText || nextProject.title}
                    </span>
                    <FiArrowRight
                      aria-hidden="true"
                      className="shrink-0 text-[#C2BBB6] transition-colors duration-300 group-hover:text-[#1893D2]"
                    />
                  </p>
                  <div className="mt-2 flex justify-end">
                    <img
                      src={nextProjectImageUrls[0] || noImageUrl}
                      alt={nextProject.title}
                      className="w-25 h-15 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(event) => handleImageError(event, nextProjectImageUrls)}
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="text-right">
                <p className="text-[12px] text-[#C2BBB6] tracking-[2.5px] uppercase">
                  No more projects
                </p>
              </div>
            )}
          </div>
        </div>

        {(aboutContextText || aboutLeftText || aboutRightText) && (
          <section className="mt-5">
            {aboutContextText && (
              <h2 className="mb-6 text-[24px] font-normal leading-[29px] text-[#C2BBB6]">
                {aboutContextText}
              </h2>
            )}
            {(aboutLeftText || aboutRightText) && (
              <div className="grid grid-cols-1 gap-y-2 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-x-0">
                <div className="space-y-3 text-[15px] font-normal leading-relaxed text-[#293339]">
                  {aboutLeftText.split(/\r?\n/).filter(Boolean).map((line, index) => (
                    <p key={`left-${index}`}>{line}</p>
                  ))}
                </div>
                <div className="space-y-3  text-[15px] font-normal leading-relaxed text-[#293339]">
                  {aboutRightText.split(/\r?\n/).filter(Boolean).map((line, index) => (
                    <p key={`right-${index}`}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      
    </div>
    {/* ✅ RELATED WORK SECTION */}
      <div className="w-full bg-[#BFC2C4] py-20 px-0 lg:px-20 mt-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] md:text-[32px] font-normal text-white">
            Related Work
          </h2>
          <Link
            to="/work"
            className="text-[#1893D2] text-[12px] tracking-[2px] uppercase font-semibold hover:opacity-70 transition-opacity duration-200"
          >
            ALL WORK + 
          </Link>
        </div>

        {/* 3 Cards Grid */}
        {relatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
            {relatedProjects.map((project, index) => {
              const projectImageUrls = getProjectImageUrls(project);
              const projectImageUrl = projectImageUrls[0] || noImageUrl;

              return (
                <Link
                  key={project._id || index}
                  to={`/work/${getWorkNameSlug(project)}`}
                  className="group relative block overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-400">
                    <img
                      src={projectImageUrl}
                      alt={project.title || "Related Work"}
                      className="absolute inset-0 w-full h-full object-cover grayscale"
                      onError={(event) => handleImageError(event, projectImageUrls)}
                    />
                    <img
                      src={getImageUrl(project.hoverImage) || projectImageUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-4 right-4 bg-black/60 group-hover:bg-[#1893D2] text-white w-45 h-[100px] px-3 py-6 flex items-end justify-between transition-all duration-1200 ease-in-out">
                      <span className="text-[12px] font-medium leading-tight">
                        {project.buttonText || project.title || "Watch Now"}
                      </span>
                      <FiPlus className="absolute top-2 right-2 text-base" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-[#888] text-sm">No related projects found.</p>
        )}
      </div>
    </>
  );
};

export default Workdetail;