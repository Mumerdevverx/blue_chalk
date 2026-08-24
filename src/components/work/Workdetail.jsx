import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Workdetail = () => {
  const { slug } = useParams();
  const [work, setWork] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workRes = await fetch(`http://localhost:5000/api/work/slug/${slug}`);
        const workData = await workRes.json();
        if (!workData.success) {
          setError(workData.message || "Work not found");
          setLoading(false);
          return;
        }
        setWork(workData.data);

        const allRes = await fetch("http://localhost:5000/api/work");
        const allData = await allRes.json();
        if (allData.success) {
          setAllProjects(allData.data);
          const currentIndex = allData.data.findIndex(p => p.slug === slug);
          if (currentIndex !== -1 && currentIndex < allData.data.length - 1) {
            setNextProject(allData.data[currentIndex + 1]);
          }
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

  // ✅ Extract video iframe
  const extractVideoFromContent = (html) => {
    if (!html) return null;
    const match = html.match(/<iframe[^>]*src="([^"]*)"[^>]*><\/iframe>/);
    if (match) return match[1];
    const match2 = html.match(/<div data-youtube-video="[^"]*"><iframe[^>]*src="([^"]*)"[^>]*><\/iframe><\/div>/);
    if (match2) return match2[1];
    return null;
  };

  // ✅ Remove video AND "Write something amazing..." from content
  const cleanContent = (html) => {
    if (!html) return '';
    let cleaned = html
      .replace(/<div data-youtube-video="[^"]*"><iframe[^>]*src="[^"]*"[^>]*><\/iframe><\/div>/, '')
      .replace(/<iframe[^>]*src="[^"]*"[^>]*><\/iframe>/, '')
      .replace(/Write something amazing\.\.\./g, '')  // ✅ REMOVE placeholder text
      .trim();
    return cleaned;
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) {
      const videoId = new URLSearchParams(new URL(url).search).get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
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
  const cleanedContent = cleanContent(work.aboutContent);
  const finalVideoUrl = getEmbedUrl(videoUrl) || "";

  // ✅ USE BUTTON TEXT AS TITLE (or fallback to title)
  const displayTitle = work.buttonText || work.title || "Untitled";

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/400x300/e0e0e0/808080?text=No+Image';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <div className="w-full lg:mt-[80px] md:mt-[115px]  mt-[100px]  lg:px-20 px-4">
      {/* VIDEO */}
      <div className="relative w-full aspect-video bg-gray-200">
        {finalVideoUrl ? (
          <iframe
            src={finalVideoUrl}
            title="Video"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No video available
          </div>
        )}
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* LEFT SIDE */}
          <div className="flex-1">
            {/* ✅ TITLE – from buttonText */}
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-normal text-[#293339] leading-[1.2]">
              {displayTitle}
            </h1>

            <div className="border-b border-[#D9D9D9] mt-4"></div>

            <p className="text-[14px] md:text-[15px] text-[#9EA5BB] tracking-[2px] mt-3 uppercase">
              {work.subDescription || work.description}
            </p>

            {/* ✅ CLEANED CONTENT (without video & placeholder text) */}
            <div className="mt-8">
              {cleanedContent ? (
                <div
                  className="text-gray-800 text-base leading-relaxed prose max-w-none"
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
              <Link
                to={`/work/${nextProject.slug}`}
                className="group block"
              >
                <div className="text-right">
                  <p className="text-[12px] text-[#C2BBB6] group-hover:text-[#3D93D2] tracking-[2.5px] transition-all duration-300 leading-tight uppercase">
                    NEXT PROJECT:
                  </p>
                  <p className="text-[12px] text-[#C2BBB6] group-hover:text-[#3D93D2] tracking-[2.5px] transition-all duration-300 leading-tight mt-1">
                    {nextProject.buttonText || nextProject.title}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <img
                      src={getImageUrl(nextProject.image)}
                      alt={nextProject.title}
                      className="w-24 h-20 object-cover rounded-md grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x80/e0e0e0/808080?text=No+Image';
                      }}
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
      </div>
    </div>
  );
};

export default Workdetail;