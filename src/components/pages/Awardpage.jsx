import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import awardpage from "../../assets/about/award/awardpage.png";
import API_BASE_URL from "../../config/api";

const getImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/600x400?text=No+Image";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
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
  const [award, setAward] = useState(null);
  const [nextAward, setNextAward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAward = async () => {
      try {
        // Fetch all awards to match admin panel order
        const allRes = await fetch(`${API_BASE_URL}/api/awards`);
        const allData = await allRes.json();
        let sorted = [];

        if (allData.success && Array.isArray(allData.data) && allData.data.length > 0) {
          sorted = sortAwards(allData.data);
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
        } else {
          setAward({
            title: "Award Not Found",
            year: "",
            category: "",
            breadcrumb: "Awards",
            image: awardpage,
            description: "",
          });
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
      }

      setLoading(false);
    };

    fetchAward();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-600"></div>
      </div>
    );
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
                text-[#293339]
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

      {/* Description */}
   {award.description && (
  <div className="text-[#293339] text-[15px] sm:text-[16px] leading-[1.7] prose max-w-none">
    <div dangerouslySetInnerHTML={{ __html: award.description }} />
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
  );
};

export default Awardpage;