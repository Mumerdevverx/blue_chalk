import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import API_BASE_URL from "../../config/api";
import { getWorkNameSlug } from "../../utils/workSlug";
import BlueChalkLoader from "../common/BlueChalkLoader";

const isDaveyImage = (url) => {
  if (!url || typeof url !== "string") return false;
  return (
    url.includes("awardTwo") ||
    url.toLowerCase().includes("davey")
  );
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

const simplify = (s) => cleanSlugStr(s).replace(/-/g, "");

const projectFallbacks = {
  "fix-me-a-plate": {
    videoUrl: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/media/FMAP_S4Trailer.mp4",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/e8/8e/e88e00680fa8a03d127770ec7155e8c4.jpg"
  },
  "atomic-echoes-untold-stories-from-world-war-ii": {
    videoUrl: "https://www.youtube.com/embed/4iUpvDhoPOw",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/a1/51/a15197d0c577bc974f759fbe5fa4cd40.jpg"
  },
  "atomic-echoes": {
    videoUrl: "https://www.youtube.com/embed/4iUpvDhoPOw",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/a1/51/a15197d0c577bc974f759fbe5fa4cd40.jpg"
  },
  "lowe-s-how-to": {
    videoUrl: "https://www.youtube.com/embed/qbGkLPImZZY",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/fd/ed/fded2dc497a0060ebacd7b1fffe674c9.jpg"
  },
  "lowes-how-to": {
    videoUrl: "https://www.youtube.com/embed/qbGkLPImZZY",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/fd/ed/fded2dc497a0060ebacd7b1fffe674c9.jpg"
  },
  "diary-of-an-old-home": {
    videoUrl: "https://www.youtube.com/embed/hRrEKkyYy8U",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/6a/1b/6a1b70b05424339c7cfc41227b7f9e66.jpg"
  },
  "oct-20-2020-with-oregon": {
    videoUrl: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/media/OHSU_GME_Recruitment_90_Final.mp4",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/28/bf/28bf0605dbefb1a20a44288ffbc2a98f.jpg"
  },
  "created-for-oregon-health-science-university": {
    videoUrl: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/media/OHSU_GME_Recruitment_90_Final.mp4",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/28/bf/28bf0605dbefb1a20a44288ffbc2a98f.jpg"
  },
  "a-sense-of-ohsu": {
    videoUrl: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/media/OHSU_GME_Recruitment_90_Final.mp4",
    poster: "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/28/bf/28bf0605dbefb1a20a44288ffbc2a98f.jpg"
  }
};

const findMatchingProject = (searchSlug, projects) => {
  if (!searchSlug || !Array.isArray(projects) || !projects.length) return null;
  const targetClean = cleanSlugStr(searchSlug);
  const targetSimple = simplify(searchSlug);

  // 1. Exact match on slug, _id, or buttonText slug
  let found = projects.find(
    (p) =>
      p.slug === searchSlug ||
      p._id === searchSlug ||
      cleanSlugStr(p.slug) === targetClean ||
      cleanSlugStr(p.buttonText) === targetClean
  );
  if (found) return found;

  // 2. Exact match on title slug
  found = projects.find((p) => cleanSlugStr(p.title) === targetClean);
  if (found) return found;

  // 3. Simplified match (ignoring dashes and spacing)
  found = projects.find((p) => {
    const pSlugSimp = simplify(p.slug);
    const pBtnSimp = simplify(p.buttonText);
    const pTitleSimp = simplify(p.title);
    return (
      pSlugSimp === targetSimple ||
      pBtnSimp === targetSimple ||
      pTitleSimp === targetSimple
    );
  });
  if (found) return found;

  // 4. Prefix or substring match for truncated slugs
  found = projects.find((p) => {
    const pSlugSimp = simplify(p.slug);
    const pBtnSimp = simplify(p.buttonText);
    const pTitleSimp = simplify(p.title);
    if (targetSimple.length >= 8) {
      if (pSlugSimp.startsWith(targetSimple) || targetSimple.startsWith(pSlugSimp)) return true;
      if (pBtnSimp.startsWith(targetSimple) || targetSimple.startsWith(pBtnSimp)) return true;
      if (pTitleSimp.startsWith(targetSimple) || targetSimple.startsWith(pTitleSimp)) return true;
    }
    return false;
  });
  if (found) return found;

  // 5. Special keyword match
  if (targetSimple.includes("lowe") && targetSimple.includes("how")) {
    return projects.find(
      (p) => simplify(p.slug).includes("lowe") && simplify(p.slug).includes("how")
    );
  }
  if (targetSimple.includes("diary") && targetSimple.includes("home")) {
    return projects.find(
      (p) => simplify(p.slug).includes("diary") && simplify(p.slug).includes("home")
    );
  }
  if (targetSimple.includes("atomicechoes")) {
    return projects.find(
      (p) => simplify(p.slug).includes("atomic") && simplify(p.slug).includes("echoes")
    );
  }
  if (targetSimple.includes("fixmeaplate") && targetSimple.includes("sermon")) {
    return projects.find((p) => simplify(p.slug).includes("sermon"));
  }
  if (targetSimple.includes("fixmeaplate") && targetSimple.includes("spumoni")) {
    return projects.find((p) => simplify(p.slug).includes("spumoni"));
  }
  if (targetSimple.includes("fixmeaplate") && targetSimple.includes("nomwah")) {
    return projects.find((p) => simplify(p.slug).includes("nomwah"));
  }
  if (targetSimple.includes("fixmeaplate")) {
    return projects.find((p) => p.slug === "fix-me-a-plate");
  }

  return null;
};

const Workdetail = () => {
  const noImageUrl = "https://placehold.co/1200x675/e0e0e0/808080?text=No+Preview";
  const { slug } = useParams();
  const navigate = useNavigate();
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
    setIsVideoStarted(false);
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [workRes, allRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/work/slug/${slug}`),
          fetch(`${API_BASE_URL}/api/work`)
        ]);
        const workData = await workRes.json();

        // If the slug actually belongs to an award, redirect to the award page
        if (workData && workData.type === 'award' && workData.data) {
          navigate(`/awardpage/${workData.data.slug || slug}`, { replace: true });
          return;
        }

        const allData = await allRes.json();
        let currentWork = workData.success ? workData.data : null;
        if (!currentWork && allData.success && Array.isArray(allData.data)) {
          currentWork = findMatchingProject(slug, allData.data);
        }

        if (!currentWork) {
          setError(workData.message || "Work not found");
          setLoading(false);
          return;
        }

        setWork(currentWork);
        if (allData.success && Array.isArray(allData.data)) {
          setAllProjects(allData.data);

          // Determine category context (from navigation state or project category)
          const navCategory = location.state?.category;
          const currentCategory =
            navCategory && navCategory !== "All Projects" && navCategory !== "Featured"
              ? navCategory
              : currentWork.category &&
                String(currentWork.category).toLowerCase() !== "award"
              ? currentWork.category
              : null;

          // Exclude Award items unless current project is an award
          const isAward = String(currentWork.category || "").toLowerCase() === "award";
          const candidateList = allData.data.filter(
            (p) => isAward || String(p.category || "").toLowerCase() !== "award"
          );

          let next = null;
          if (currentCategory) {
            const sameCatProjects = candidateList.filter(
              (p) =>
                String(p.category || "").toLowerCase() ===
                String(currentCategory).toLowerCase()
            );
            const idxInCat = sameCatProjects.findIndex(
              (p) => p._id === currentWork._id
            );
            if (idxInCat !== -1 && sameCatProjects.length > 1) {
              next = sameCatProjects[(idxInCat + 1) % sameCatProjects.length];
            }
          }

          if (!next || next._id === currentWork._id) {
            const idxInAll = candidateList.findIndex(
              (p) => p._id === currentWork._id
            );
            if (idxInAll !== -1 && candidateList.length > 1) {
              next = candidateList[(idxInAll + 1) % candidateList.length];
            } else if (candidateList.length > 0) {
              next = candidateList[0];
            }
          }

          if (next) {
            setNextProject(next);
          }

          // Related: strictly exclude awards - related work must ALWAYS be actual films/projects!
          const nonAwardProjects = allData.data.filter(
            (p) =>
              p._id !== currentWork._id &&
              String(p.category || "").toLowerCase() !== "award" &&
              String(p.category || "").toLowerCase() !== "awards" &&
              !isDaveyImage(p.image || p.imageUrl || p.thumbnail || p.thumbnailUrl || p.mediaUrl)
          );
          const hasRealImage = (p) => {
            const img =
              p.image || p.imageUrl || p.thumbnail || p.thumbnailUrl || p.mediaUrl;
            return Boolean(img && !isDaveyImage(img));
          };
          const validImageProjects = nonAwardProjects.filter(hasRealImage);
          const pool = validImageProjects.length >= 3 ? validImageProjects : nonAwardProjects;

          let related = [];
          if (!isAward && currentWork.category) {
            const sameCategory = pool.filter(
              (p) => p.category === currentWork.category
            );
            const different = pool.filter(
              (p) => p.category !== currentWork.category
            );
            related = [...sameCategory, ...different].slice(0, 3);
          } else {
            // For awards: find projects referenced in aboutContent or pick top non-award projects
            const contentStr = String(currentWork.aboutContent || currentWork.description || "").toLowerCase();
            const matchedProjects = pool.filter((p) => {
              const pSlug = cleanSlugStr(p.slug);
              const pTitle = cleanSlugStr(p.title);
              const pBtn = cleanSlugStr(p.buttonText);
              return (
                (pSlug && pSlug.length > 3 && contentStr.includes(pSlug)) ||
                (pTitle && pTitle.length > 3 && contentStr.includes(pTitle)) ||
                (pBtn && pBtn.length > 3 && contentStr.includes(pBtn))
              );
            });
            const remaining = pool.filter((p) => !matchedProjects.some((m) => m._id === p._id));
            related = [...matchedProjects, ...remaining].slice(0, 3);
          }
          setRelatedProjects(related);
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

  // ✅ Extract video URL – supports YouTube iframe, embed div, direct <video>, and <source>
  const extractVideoFromContent = (html) => {
    if (!html) return null;

    // Try YouTube embed div
    let match = html.match(
      /<div data-youtube-video="[^"]*"><iframe[\s\S]*?src="([^"]*)"[\s\S]*?<\/iframe><\/div>/i
    );
    if (match) return match[1];

    // Try iframe src
    match = html.match(/<iframe[\s\S]*?src="([^"]*)"[\s\S]*?>/i);
    if (match) return match[1];

    // Try direct <video> tag src
    match = html.match(/<video[\s\S]*?src="([^"]*)"[\s\S]*?>/i);
    if (match) return match[1];

    // Try <source src="..."> inside video
    match = html.match(/<source[\s\S]*?src="([^"]*)"[\s\S]*?>/i);
    if (match) return match[1];

    return null;
  };

  // ✅ Clean content – remove iframes and video tags
  const cleanContent = (html, removeFirstImage = false) => {
    if (!html) return "";
    let cleaned = html
      .replace(
        /<div data-youtube-video="[^"]*"><iframe[\s\S]*?<\/iframe><\/div>/gi,
        ""
      )
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
      .replace(/<iframe[^>]*\/?>/gi, "")
      .replace(/<video[\s\S]*?<\/video>/gi, "")
      .replace(/<video[^>]*\/?>/gi, "")
      .replace(/Write something amazing\.\.\./g, "")
      .trim();

    if (removeFirstImage) {
      const parsedContent = new DOMParser().parseFromString(cleaned, "text/html");
      parsedContent.querySelector("img")?.remove();
      cleaned = parsedContent.body.innerHTML;
    }

    return cleaned;
  };

  const formatWorkContent = (html) => {
    if (!html || typeof DOMParser === "undefined") return html;

    try {
      const doc = new DOMParser().parseFromString(html, "text/html");

      const monthPattern =
        "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
      const headerLineRegex = new RegExp(
        `(?:${monthPattern}|\\b(?:19|20)\\d{2}\\b|\\bwith\\s+[a-z0-9])`,
        "i"
      );

      const applyParagraphStyles = (container) => {
        Array.from(
          container.querySelectorAll(
            "p, div:not(.work-section-title):not(.work-header-line), li, blockquote"
          )
        ).forEach((el) => {
          if (!el.textContent.trim() && !el.querySelector("img, iframe, video")) {
            el.remove();
          } else {
            el.style.cssText =
              "font-size: 18px; line-height: 28px; letter-spacing: 0px; font-weight: 400; color: #293339; margin-bottom: 20px; text-transform: none;";
            Array.from(
              el.querySelectorAll(
                "span:not(.work-header-date):not(.work-header-sep):not(.work-header-with)"
              )
            ).forEach((s) => {
              s.style.cssText =
                "font-size: 18px; line-height: 28px; letter-spacing: 0px; font-weight: 400; color: #293339; text-transform: none;";
            });
            Array.from(el.querySelectorAll("a:not(.work-header-with a)")).forEach(
              (a) => {
                a.style.cssText =
                  "color: #293339; text-decoration: none; transition: color 0.2s ease;";
                a.setAttribute(
                  "onmouseover",
                  "this.style.color='#1893d2'; this.style.textDecoration='underline';"
                );
                a.setAttribute(
                  "onmouseout",
                  "this.style.color='#293339'; this.style.textDecoration='none';"
                );
              }
            );
          }
        });
      };

      // Find the header element containing date or "WITH" (only leaf p or h6 to avoid removing parent div)
      let targetP = null;
      const candidates = Array.from(doc.querySelectorAll("h6, p"));
      for (const el of candidates) {
        if (el.querySelector("p, h6, div")) continue;
        const txt = (el.textContent || "").trim();
        if (!txt) continue;
        if (headerLineRegex.test(txt)) {
          targetP = el;
          break;
        }
      }

      if (!targetP) {
        Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, p")).forEach((el) => {
          if (
            /^\s*about (?:the )?(?:project|film|video|series|work)\b/i.test(
              el.textContent || ""
            )
          ) {
            const titleDiv = doc.createElement("div");
            titleDiv.className = "work-section-title";
            titleDiv.style.cssText =
              "font-size: 24px; line-height: 29px; letter-spacing: 0px; font-weight: 400; color: #C2BBB6; margin-bottom: 24px; margin-top: 0; text-transform: none; display: block;";
            titleDiv.textContent = el.textContent.trim();
            el.replaceWith(titleDiv);
          }
        });
        applyParagraphStyles(doc);
        return doc.body.innerHTML;
      }

      // Remove leading and trailing <br> tags
      let rawP = targetP.innerHTML
        .replace(/^(\s*<br\s*\/?>\s*)+/gi, "")
        .replace(/(\s*<br\s*\/?>\s*)+$/gi, "")
        .trim();

      const parts = rawP.split(/(?:<br\s*\/?>\s*)+/i).map((s) => s.trim()).filter(Boolean);

      let headerHtml = "";
      let sectionTitle = "";

      if (parts.length > 1) {
        headerHtml = parts[0];
        sectionTitle = parts.slice(1).join(" ").replace(/<[^>]+>/g, "").trim();
      } else {
        headerHtml = parts[0] || rawP;
      }

      let nextElToRemove = null;
      if (!sectionTitle && targetP.nextElementSibling) {
        const nextText = (targetP.nextElementSibling.textContent || "").trim();
        if (/^about (?:the )?(?:project|film|video|series|work)\b/i.test(nextText) || (nextText.length < 50 && targetP.nextElementSibling.tagName.match(/^H[1-6]$/i))) {
          sectionTitle = nextText;
          nextElToRemove = targetP.nextElementSibling;
        }
      }

      const tempDiv = doc.createElement("div");
      tempDiv.innerHTML = headerHtml;

      const anchor = tempDiv.querySelector("a");
      let dateText = "";
      let withHtml = "";

      if (anchor) {
        const anchorHref = anchor.getAttribute("href") || "#";
        const anchorTarget = anchor.getAttribute("target") || "_blank";
        const anchorRel = anchor.getAttribute("rel") || "noopener noreferrer nofollow";
        const linkText = anchor.textContent.trim().toUpperCase();

        anchor.remove();
        const remainingText = (tempDiv.textContent || "")
          .replace(/&nbsp;/gi, " ")
          .replace(/\s+/g, " ")
          .trim();

        const withMatch = remainingText.match(/^(.*?)(?:\s*:?\s*)?\bWith\b\s*$/i);
        if (withMatch) {
          dateText = withMatch[1].trim();
        } else {
          dateText = remainingText.replace(/\bWith\b.*$/i, "").trim();
        }

        const cleanLinkText = linkText.replace(/^\s*WITH\s+/i, "");
        withHtml = `WITH <a target="${anchorTarget}" rel="${anchorRel}" href="${anchorHref}" style="font-size: 11px; line-height: 13px; letter-spacing: 3.3px; font-weight: 600; color: #293339; text-transform: uppercase; text-decoration: none; transition: color 0.2s ease;" onmouseover="this.style.color='#1893d2'; this.style.textDecoration='underline';" onmouseout="this.style.color='#293339'; this.style.textDecoration='none';">${cleanLinkText}</a>`;
      } else {
        const fullText = (tempDiv.textContent || "")
          .replace(/&nbsp;/gi, " ")
          .replace(/\s+/g, " ")
          .trim();
        const withMatch = fullText.match(/^(.*?)(?:\s*:?\s*)?\bWith\b\s*(.*)$/i);
        if (withMatch) {
          dateText = withMatch[1].trim();
          withHtml = `WITH ${withMatch[2].trim().toUpperCase()}`;
        } else {
          dateText = fullText.trim();
        }
      }

      dateText = dateText
        .replace(/&nbsp;/gi, " ")
        .replace(/\s*:\s*$/, "")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();

      const h6 = doc.createElement("h6");
      h6.className = "work-header-line";
      h6.style.cssText = "font-size: 11px; line-height: 13px; letter-spacing: 3.3px; font-weight: 600; text-transform: uppercase; margin-bottom: 30px; margin-top: 0; display: block;";

      const dateSpan = doc.createElement("span");
      dateSpan.className = "work-header-date";
      dateSpan.style.cssText = "font-size: 11px; line-height: 13px; letter-spacing: 3.3px; font-weight: 600; color: #C2BBB6; text-transform: uppercase;";
      dateSpan.textContent = dateText;
      h6.appendChild(dateSpan);

      if (withHtml) {
        const sepSpan = doc.createElement("span");
        sepSpan.className = "work-header-sep";
        sepSpan.style.cssText = "font-size: 11px; line-height: 13px; letter-spacing: 3.3px; font-weight: 600; color: #C2BBB6; margin: 0 10px;";
        sepSpan.textContent = ":";
        h6.appendChild(sepSpan);

        const withSpan = doc.createElement("span");
        withSpan.className = "work-header-with";
        withSpan.style.cssText = "font-size: 11px; line-height: 13px; letter-spacing: 3.3px; font-weight: 600; color: #293339; text-transform: uppercase;";
        withSpan.innerHTML = withHtml;
        h6.appendChild(withSpan);
      }

      targetP.parentNode.insertBefore(h6, targetP);

      if (sectionTitle) {
        const titleDiv = doc.createElement("div");
        titleDiv.className = "work-section-title";
        titleDiv.style.cssText = "font-size: 24px; line-height: 29px; letter-spacing: 0px; font-weight: 400; color: #C2BBB6; margin-bottom: 24px; margin-top: 0; text-transform: none; display: block;";
        titleDiv.textContent = sectionTitle;
        targetP.parentNode.insertBefore(titleDiv, targetP);
      }

      targetP.remove();
      if (nextElToRemove) {
        nextElToRemove.remove();
      }

      Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, p")).forEach((el) => {
        if (/^\s*about (?:the )?(?:project|film|video|series|work)\b/i.test(el.textContent || "")) {
          const titleDiv = doc.createElement("div");
          titleDiv.className = "work-section-title";
          titleDiv.style.cssText = "font-size: 24px; line-height: 29px; letter-spacing: 0px; font-weight: 400; color: #C2BBB6; margin-bottom: 24px; margin-top: 0; text-transform: none; display: block;";
          titleDiv.textContent = el.textContent.trim();
          el.replaceWith(titleDiv);
        }
      });

      applyParagraphStyles(doc);

      return doc.body.innerHTML;
    } catch (e) {
      console.error("Error formatting work content:", e);
      return html;
    }
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
      .filter((url, index, urls) => url && !isDaveyImage(url) && urls.indexOf(url) === index);

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
    if (!url || !/(youtube\.com|youtu\.be)/i.test(url)) return [];

    let videoId = url.match(/\/embed\/([^?&#/]+)/i)?.[1];
    if (!videoId && url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?&#]/)[0];
    }
    if (!videoId) {
      try {
        videoId = new URLSearchParams(new URL(url).search).get("v");
      } catch {
        return [];
      }
    }

    if (!videoId) return [];
    return [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    ];
  };

  const getPosterUrls = (project, video, preferredThumbnail) => {
    const slugKey = cleanSlugStr(project?.slug || slug || project?.buttonText);
    const fallback = projectFallbacks[slugKey] || {};
    const ytThumbs = getYouTubeThumbnail(video);
    const urls = [
      getImageUrl(preferredThumbnail),
      fallback.poster,
      ...getProjectImageUrls(project),
      ...ytThumbs
    ].filter((url, index, urls) => url && !isDaveyImage(url) && url !== noImageUrl && urls.indexOf(url) === index);

    if (urls.length === 0 && !video) {
      urls.push(noImageUrl);
    }
    return urls;
  };

  const getFirstContentImageUrl = (html) => {
    if (!html) return "";
    const parsedContent = new DOMParser().parseFromString(html, "text/html");
    return parsedContent.querySelector("img")?.getAttribute("src") || "";
  };

  if (loading) {
    return <BlueChalkLoader />;
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

  const slugKey = cleanSlugStr(work?.slug || slug || work?.buttonText);
  const fallbackInfo = projectFallbacks[slugKey] || {};
  const videoUrl =
    extractVideoFromContent(work.aboutContent) ||
    work.videoUrl ||
    work.mediaUrl ||
    fallbackInfo.videoUrl ||
    "";
  const aboutFields = extractWorkAboutContent(work.aboutContent);
  const firstContentImageUrl = getFirstContentImageUrl(aboutFields.content);
  const cleanedContent = cleanContent(aboutFields.content, !videoUrl);
  const formattedContent = formatWorkContent(cleanedContent);
  const aboutContextText = aboutFields.contextText;
  const aboutLeftText = aboutFields.leftText;
  const aboutRightText = aboutFields.rightText;
  const finalVideoUrl = getEmbedUrl(videoUrl) || "";
  const posterUrls = getPosterUrls(work, finalVideoUrl, location.state?.thumbnail);
  const posterUrl = posterUrls[0];
  const noVideoImageUrls = [
    getImageUrl(location.state?.thumbnail),
    getImageUrl(firstContentImageUrl),
    ...posterUrls
  ].filter((url, index, urls) => url && urls.indexOf(url) === index);
  const noVideoImageUrl = noVideoImageUrls[0] || noImageUrl;
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
        <img
          key={slug}
          src={noVideoImageUrl}
          alt={work.title || "Work"}
          className="h-full w-full object-cover"
          onError={(event) => handleImageError(event, noVideoImageUrls)}
        />
      );
    }

    if (isDirectVideo(videoUrl)) {
      const hasRealPoster = Boolean(
        posterUrl && posterUrl !== noImageUrl && !isDaveyImage(posterUrl)
      );
      // ✅ Direct MP4 video
      return (
        <video
          ref={videoRef}
          poster={hasRealPoster ? posterUrl : undefined}
          preload="auto"
          controls
          muted
          loop
          playsInline
          onPlay={() => setIsVideoStarted(true)}
          className="w-full h-full object-cover"
          style={{ backgroundColor: "#000" }}
        >
          <source src={getImageUrl(videoUrl)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // ✅ YouTube/Vimeo embed
      return (
        <iframe
          src={
            isVideoStarted
              ? `${finalVideoUrl}${finalVideoUrl.includes("?") ? "&" : "?"}autoplay=1`
              : finalVideoUrl
          }
          title={displayTitle || "Video"}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
    }
  };

  return (
    <>
    <div className="w-full mt-[100px] md:mt-[115px] lg:mt-[80px] lg:px-24 px-4">
      {/* ✅ VIDEO PLAYER – at the top */}
      <div className="relative  w-full h-[400px] md:h-[450px] lg:h-[540px] bg-gray-200 overflow-hidden">
        {renderVideoPlayer()}
        {videoUrl && !isVideoStarted && (
          <button
            type="button"
            onClick={startVideo}
            className="group absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            aria-label="Play video"
          >
            {posterUrl && posterUrl !== noImageUrl && !isDaveyImage(posterUrl) && (
              <img
                src={posterUrl}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                onError={(event) => handleImageError(event, posterUrls)}
              />
            )}
            <span className="group/play relative z-10 flex h-16 w-16 items-center justify-center">
              <span className="h-0 w-0 border-y-[20px] border-y-transparent border-l-[34px] border-l-white transition-colors duration-300 group-hover/play:border-l-[#0089D0]" />
            </span>
          </button>
        )}
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto py-8 md:px-4 mt-[21px] lg:mt-[40px]">
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
            <div className="mt-5">
              <style>{`
                .work-detail-content h6,
                .work-detail-content .work-header-line {
                  font-size: 11px !important;
                  line-height: 13px !important;
                  letter-spacing: 3.3px !important;
                  font-weight: 600 !important;
                  text-transform: uppercase !important;
                  margin-bottom: 30px !important;
                  margin-top: 0 !important;
                  display: block !important;
                }
                .work-detail-content .work-header-date {
                  font-size: 11px !important;
                  line-height: 13px !important;
                  letter-spacing: 3.3px !important;
                  font-weight: 600 !important;
                  color: #C2BBB6 !important;
                  text-transform: uppercase !important;
                }
                .work-detail-content .work-header-sep {
                  font-size: 11px !important;
                  line-height: 13px !important;
                  letter-spacing: 3.3px !important;
                  font-weight: 600 !important;
                  color: #C2BBB6 !important;
                  margin: 0 10px !important;
                }
                .work-detail-content .work-header-with {
                  font-size: 11px !important;
                  line-height: 13px !important;
                  letter-spacing: 3.3px !important;
                  font-weight: 600 !important;
                  color: #293339 !important;
                  text-transform: uppercase !important;
                }
                .work-detail-content .work-header-with a,
                .work-detail-content .work-header-with a * {
                  font-size: 11px !important;
                  line-height: 13px !important;
                  letter-spacing: 3.3px !important;
                  font-weight: 600 !important;
                  color: #293339 !important;
                  text-transform: uppercase !important;
                  text-decoration: none !important;
                  transition: color 200ms ease !important;
                }
                .work-detail-content .work-header-with a:hover,
                .work-detail-content .work-header-with a:hover * {
                  color: #1893d2 !important;
                  text-decoration: underline !important;
                }
                .work-detail-content h1,
                .work-detail-content h2,
                .work-detail-content h3,
                .work-detail-content h4,
                .work-detail-content .work-section-title {
                  font-size: 24px !important;
                  line-height: 29px !important;
                  letter-spacing: 0px !important;
                  font-weight: 400 !important;
                  color: #C2BBB6 !important;
                  margin-bottom: 24px !important;
                  margin-top: 0 !important;
                  text-transform: none !important;
                  display: block !important;
                }
                .work-detail-content p,
                .work-detail-content p *,
                .work-detail-content div:not(.work-section-title):not(.work-header-line),
                .work-detail-content span:not(.work-header-date):not(.work-header-sep):not(.work-header-with):not(.work-header-with *),
                .work-detail-content li {
                  font-size: 18px !important;
                  line-height: 28px !important;
                  letter-spacing: 0px !important;
                  font-weight: 400 !important;
                  color: #293339 !important;
                  text-transform: none !important;
                }
                .work-detail-content p {
                  margin-bottom: 20px !important;
                }
                .work-detail-content a:not(.work-header-with a) {
                  color: #293339 !important;
                  text-decoration: none !important;
                  transition: color 200ms ease !important;
                }
                .work-detail-content a:not(.work-header-with a):hover {
                  color: #1893d2 !important;
                  text-decoration: underline !important;
                }
              `}</style>
              {formattedContent ? (
                <div
                  className="work-detail-content leading-relaxed"
                  style={{
                    fontSize: "18px",
                    lineHeight: "28px",
                    letterSpacing: "0px",
                    fontWeight: 400,
                    color: "#293339",
                    textTransform: "none"
                  }}
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
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
                to={`/work/${getWorkNameSlug(nextProject)}`}
                state={{
                  category: location.state?.category || work?.category,
                  title: nextProject.title,
                  buttonText: nextProject.buttonText,
                  thumbnail:
                    nextProjectImageUrls[0] ||
                    projectFallbacks[cleanSlugStr(nextProject.slug)]?.poster ||
                    projectFallbacks[cleanSlugStr(nextProject.buttonText)]?.poster ||
                    projectFallbacks[cleanSlugStr(nextProject.title)]?.poster ||
                    (cleanSlugStr(nextProject.title || "").includes("oregon")
                      ? projectFallbacks["created-for-oregon-health-science-university"]?.poster
                      : null),
                  videoUrl:
                    nextProject.mediaUrl ||
                    nextProject.videoUrl ||
                    projectFallbacks[cleanSlugStr(nextProject.slug)]?.videoUrl ||
                    projectFallbacks[cleanSlugStr(nextProject.buttonText)]?.videoUrl ||
                    projectFallbacks[cleanSlugStr(nextProject.title)]?.videoUrl ||
                    (cleanSlugStr(nextProject.title || "").includes("oregon")
                      ? projectFallbacks["created-for-oregon-health-science-university"]?.videoUrl
                      : null)
                }}
                className="group block"
              >
                <div className="text-right">
                  <p className="text-right text-[11px] leading-tight tracking-[3.5px] text-[#C2BBB6] uppercase transition-colors duration-300 group-hover:text-[#1893d2]">
                    NEXT PROJECT: {nextProject.buttonText || nextProject.title}
                  </p>
                  <div className="mt-1 flex justify-end">
                    <FiArrowRight
                      aria-hidden="true"
                      className="text-[#C2BBB6] transition-colors duration-300 group-hover:text-[#1893d2]"
                    />
                  </div>
                  <div className="mt-2 flex justify-end">
                    <img
                      src={
                        nextProjectImageUrls[0] ||
                        projectFallbacks[cleanSlugStr(nextProject.slug)]?.poster ||
                        projectFallbacks[cleanSlugStr(nextProject.buttonText)]?.poster ||
                        projectFallbacks[cleanSlugStr(nextProject.title)]?.poster ||
                        projectFallbacks[simplify(nextProject.title)]?.poster ||
                        (cleanSlugStr(nextProject.title || "").includes("oregon")
                          ? projectFallbacks["created-for-oregon-health-science-university"]?.poster
                          : null) ||
                        noImageUrl
                      }
                      alt={nextProject.title || "Next Project"}
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
                  state={{
                    category: project.category || location.state?.category,
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
                      onError={(event) => handleImageError(event, projectImageUrls)}
                    />
                    {project.hoverImage && !isDaveyImage(project.hoverImage) && (
                      <img
                        src={getImageUrl(project.hoverImage)}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
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
    </>
  );
};

export default Workdetail;