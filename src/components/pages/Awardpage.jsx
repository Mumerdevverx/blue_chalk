import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import awardpage from "../../assets/about/award/awardpage.png";
import API_BASE_URL from "../../config/api";
import BlueChalkLoader from "../common/BlueChalkLoader";
import { getWorkNameSlug } from "../../utils/workSlug";

const isDaveyImage = (url) => {
  if (!url || typeof url !== "string") return false;
  return url.includes("awardTwo") || url.toLowerCase().includes("davey");
};

const cleanSlugStr = (s) => {
  if (!s) return "";
  return String(s)
    .replace(/&nbsp;|nbsp/gi, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const fallbackRelatedProjects = [
  {
    _id: "fb-1",
    slug: "fix-me-a-plate",
    title: "Fix Me A Plate",
    buttonText: "Fix Me A Plate",
    category: "Branded",
    image: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/e8/8e/e88e00680fa8a03d127770ec7155e8c4.jpg"
  },
  {
    _id: "fb-2",
    slug: "atomic-echoes-untold-stories-from-world-war-ii",
    title: "Atomic Echoes",
    buttonText: "Atomic Echoes",
    category: "Documentary",
    image: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/a1/51/a15197d0c577bc974f759fbe5fa4cd40.jpg"
  },
  {
    _id: "fb-3",
    slug: "lowe-s-how-to",
    title: "Lowe's How-To",
    buttonText: "Lowe's How-To",
    category: "Branded",
    image: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/fd/ed/fded2dc497a0060ebacd7b1fffe674c9.jpg"
  }
];

// const formatAwardDescription = (description) =>
//   description.replace(/<p>\s*(\d{4})\s*<\/p>/g, '<p class="award-year">$1</p>');

const formatAwardDescription = (description) => {
  if (!description) return "";

  const TITLE_STYLE =
    "font-family:'Basis Grotesque Web','Helvetica Neue',Helvetica,Arial,sans-serif;" +
    "font-size:18px;font-weight:400;line-height:28px;color:#1893D2;";

  const YEAR_STYLE =
    "font-family:'Basis Grotesque Web','Helvetica Neue',Helvetica,Arial,sans-serif;" +
    "font-size:24px;font-weight:400;line-height:29px;color:#C2BBB6;";

  return (
    description
      .replace(
        /(<a\b[^>]*?href="\/work\/[^"]*"[^>]*?)style="[^"]*"/g,
        `$1style="${TITLE_STYLE}"`
      )
      .replace(
        /<a\b(?=[^>]*href="\/work\/")(?![^>]*style=)([^>]*?)>/g,
        `<a$1 style="${TITLE_STYLE}">`
      )
      .replace(
        /<p>\s*((?:19|20)\d{2})\s*<\/p>/g,
        `<p style="${YEAR_STYLE};display:block;margin:1.5rem 0 0.75rem;">$1</p>`
      )
      .replace(
        /(<br\s*\/?>\s*<br\s*\/?>)\s*((?:19|20)\d{2})\s*(<\/p>)/g,
        `$1<span style="${YEAR_STYLE};display:block;margin-top:1.5rem;">$2</span>$3`
      )
  );
};
const getImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/600x400?text=No+Image";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const moveDigitalAwardToPosition = (list) => {
  const digitalAwardIndex = list.findIndex(
    (award) => award.title?.trim().toLowerCase() === "digital.com"
  );

  if (digitalAwardIndex === -1) return list;

  const reorderedAwards = [...list];
  const [digitalAward] = reorderedAwards.splice(digitalAwardIndex, 1);
  reorderedAwards.splice(10, 0, digitalAward);
  return reorderedAwards;
};

const sortAwards = (list) => {
  return [...list].sort((first, second) => {
    const firstOrder = Number(first.order);
    const secondOrder = Number(second.order);

    if (Number.isFinite(firstOrder) && Number.isFinite(secondOrder)) {
      return firstOrder - secondOrder;
    }

    return new Date(first.createdAt) - new Date(second.createdAt);
  });
};

const Awardpage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [award, setAward] = useState(null);
  const [nextAward, setNextAward] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDescriptionClick = (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (href && (href.startsWith("/work/") || href.startsWith("/awardpage/") || href.startsWith("/awards/"))) {
      e.preventDefault();
      navigate(href);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAward = async () => {
      try {
        const [allRes, workRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/awards`),
          fetch(`${API_BASE_URL}/api/work`).catch(() => null)
        ]);
        const allData = await allRes.json();
        const workData = workRes ? await workRes.json().catch(() => null) : null;
        let sorted = [];

        if (allData.success && Array.isArray(allData.data) && allData.data.length > 0) {
          sorted = moveDigitalAwardToPosition(sortAwards(allData.data));
        }

        let selectedAward = null;

        if (slug) {
          // If slug is provided in URL, find matching award
          selectedAward = sorted.find((a) => a.slug === slug);
          if (!selectedAward) {
            const res = await fetch(`${API_BASE_URL}/api/awards/slug/${slug}`);
            const data = await res.json();
            if (data.success && data.data) {
              selectedAward = data.data;
            }
          }
        } else {
          // If no slug is provided (e.g. /awardpage), show the FIRST award just like admin panel
          if (sorted.length > 0) {
            selectedAward = sorted[0];
          }
        }

        if (selectedAward) {
          setAward(selectedAward);

          // Find next award in sorted order
          if (sorted.length > 0) {
            const currentIndex = sorted.findIndex(
              (a) => a.slug === selectedAward.slug || a._id === selectedAward._id
            );
            if (currentIndex !== -1 && currentIndex < sorted.length - 1) {
              setNextAward(sorted[currentIndex + 1]);
            } else if (sorted.length > 1) {
              setNextAward(sorted[0]);
            }
          }

          // Compute related work (strictly non-award projects)
          const allWorks =
            workData && workData.success && Array.isArray(workData.data) && workData.data.length > 0
              ? workData.data
              : fallbackRelatedProjects;

          const nonAwardWorks = allWorks.filter(
            (p) =>
              String(p.category || "").toLowerCase() !== "award" &&
              String(p.category || "").toLowerCase() !== "awards" &&
              !isDaveyImage(p.image || p.imageUrl || p.thumbnail || p.mediaUrl)
          );

          const descStr = String(selectedAward.description || "").toLowerCase();
          const matched = nonAwardWorks.filter((p) => {
            const pSlug = cleanSlugStr(p.slug);
            const pTitle = cleanSlugStr(p.title);
            const pBtn = cleanSlugStr(p.buttonText);
            return (
              (pSlug && pSlug.length > 3 && descStr.includes(pSlug)) ||
              (pTitle && pTitle.length > 3 && descStr.includes(pTitle)) ||
              (pBtn && pBtn.length > 3 && descStr.includes(pBtn))
            );
          });

          const remaining = nonAwardWorks.filter(
            (p) => !matched.some((m) => (m._id || m.slug) === (p._id || p.slug))
          );
          const finalRelated = [...matched, ...remaining].slice(0, 3);
          setRelatedProjects(finalRelated.length >= 3 ? finalRelated : fallbackRelatedProjects);
        } else {
          setAward({
            title: "Award Not Found",
            year: "",
            category: "",
            breadcrumb: "Awards",
            image: awardpage,
            description: "",
          });
          setRelatedProjects(fallbackRelatedProjects);
        }
      } catch (error) {
        console.error("Error fetching award:", error);

        setAward({
          title: "Award Not Found",
          year: "",
          category: "",
          breadcrumb: "Awards",
          image: awardpage,
          description: "",
        });
        setRelatedProjects(fallbackRelatedProjects);
      }

      setLoading(false);
    };

    fetchAward();
  }, [slug]);

  if (loading) {
    return <BlueChalkLoader />;
  }

  if (!award) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500 text-base sm:text-lg text-center">
          Award not found
        </p>
      </div>
    );
  }

  return (
    <>
      <section
        className="
          w-full
          max-w-[1200px]
          mx-auto
          mt-[90px]
          sm:mt-[100px]
          md:mt-[115px]
          px-5
          sm:px-6
          md:px-8
          lg:px-0
          pb-10
        "
      >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-8
          sm:gap-10
          md:flex-row
          md:items-start
          md:justify-between
        "
      >
        {/* Breadcrumb / Title */}
        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-2
              mb-8
              sm:mb-10
              md:mb-14
            "
          >
            <Link
              to="/about"
              className="
                text-[26px]
                sm:text-[30px]
                md:text-[36px]
                leading-[1.2]
                font-normal
                text-[#C2BBB6]
                transition-colors
              "
            >
              Awards
            </Link>

            <span className="text-[24px] sm:text-[28px] md:text-[36px] text-[#293339]">
              &gt;
            </span>

            <span
              className="
                text-[26px]
                sm:text-[30px]
                md:text-[36px]
                leading-[1.2]
                font-normal
                text-[#293339]
                break-words
              "
            >
              {award.title}
            </span>
          </div>
        </div>

        {/* Award Image */}
        <div
          className="
            w-full
            md:w-auto
            flex
            md:justify-end
            shrink-0
          "
        >
          <img
            src={getImageUrl(award.image)}
            alt={award.title}
            className="
              w-[120px]
              sm:w-[140px]
              md:w-[170px]
              lg:w-[180px]
              h-auto
              object-contain
            "
          />
        </div>
      </div>

      {/* Description  First Page */} 
   {award.description && (
  <div className="text-[#293339] text-[15px] sm:text-[16px] leading-[1.7] prose max-w-none">
    <div
      className="award-description cursor-pointer"
      onClick={handleDescriptionClick}
      dangerouslySetInnerHTML={{ __html: formatAwardDescription(award.description) }}
    />
  </div>
)}

      {/* Bottom Links */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:flex-wrap
          items-start
          sm:items-center
          pt-8
          sm:pt-10
          gap-4
          sm:gap-6
        "
      >
        {/* Back */}
        <Link
          to="/about"
          className="
            text-[14px]
            sm:text-[15px]
            text-[#0089D0]
            hover:underline
            transition-all
            duration-200
            flex
            items-center
            gap-2
          "
        >
          <span>&larr;</span>
          Back to About Us
        </Link>

        {/* Next Award / More About */}
        {nextAward ? (
          <Link
            to={`/awardpage/${nextAward.slug}`}
            className="
              text-[14px]
              sm:text-[15px]
              text-[#0089D0]
              hover:underline
              transition-all
              duration-200
              flex
              items-center
              gap-2
              break-words
            "
          >
            Next Award: {nextAward.title} &rarr;
          </Link>
        ) : (
          <Link
            to={`/awardpage/${award.slug}`}
            className="
              text-[14px]
              sm:text-[15px]
              text-gray-400
              hover:underline
              transition-all
              duration-200
              flex
              items-center
              gap-2
              break-words
            "
          >
            More about {award.title}
          </Link>
        )}
      </div>
    </section>

    {/* ✅ RELATED WORK SECTION */}
    <div className="w-full bg-[#BFC2C4] py-20 px-0 lg:px-20 mt-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8 lg:px-0">
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
              const projectImageUrl = getImageUrl(project.image || project.imageUrl || project.thumbnail);

              return (
                <Link
                  key={project._id || index}
                  to={`/work/${getWorkNameSlug(project)}`}
                  state={{
                    category: project.category,
                    title: project.title,
                    buttonText: project.buttonText,
                    thumbnail: projectImageUrl,
                    videoUrl: project.mediaUrl || project.videoUrl,
                    description: project.description,
                    subDescription: project.subDescription
                  }}
                  className="group relative block overflow-hidden"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-400">
                    <img
                      src={projectImageUrl}
                      alt={project.title || "Related Work"}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    {project.hoverImage && !isDaveyImage(project.hoverImage) && (
                      <img
                        src={getImageUrl(project.hoverImage)}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <div className="absolute bottom-4 right-4 bg-black/60 group-hover:bg-[#1893D2] text-white w-45 h-[70px] px-3 py-6 flex items-end justify-between transition-all duration-1200 ease-in-out">
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
    </div>
  </>
  );
};

export default Awardpage;