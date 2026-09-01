import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import awardpage from "../../assets/about/award/awardpage.png";

const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/600x400?text=No+Image';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const Awardpage = () => {
  const { slug } = useParams();
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/awards/slug/${slug}`);
        const data = await res.json();
        if (data.success) {
          setAward(data.data);
        } else {
          // fallback – show placeholder with static data
          setAward({
            title: "Award Not Found",
            year: "",
            category: "",
            breadcrumb: "Awards",
            image: awardpage,
            description: ""
          });
        }
      } catch (error) {
        console.error('Error fetching award:', error);
        setAward({
          title: "Award Not Found",
          year: "",
          category: "",
          breadcrumb: "Awards",
          image: awardpage,
          description: ""
        });
      }
      setLoading(false);
    };
    fetchAward();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!award) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Award not found</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[110px] md:mt-[115px] pb-6 lg:px-0 md:px-13 px-7 sm:px-6 md:px-0">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2 text-[14px] text-[#9EA5BB] mb-14">
            <Link to="/about" className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339] transition-colors">
              Awards
            </Link>
            <span>&gt;</span>
            <span className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339]">
              {award.breadcrumb || award.title}
            </span>
          </div>

          <p className="text-[15px] text-[#9EA5BB] mb-5">{award.year}</p>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-12">
            <div>
              <h1 className="text-[36px] md:text-[42px] lg:text-[20px] font-normal text-[#293339] leading-[1.2]">
                {award.title}
              </h1>
            </div>
            <div>
              <p className="text-[18px] text-[#0089D0] font-medium">
                {award.category}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img src={getImageUrl(award.image)} alt={award.title} className="w-48 h-auto" />
        </div>
      </div>

      {award.description && (
        <div className="mt-8 text-[#293339] text-[16px] leading-relaxed">
          <p>{award.description}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center pt-6 gap-2">
        <Link
          to="/about"
          className="text-[15px] text-[#0089D0] hover:underline transition-all duration-200 flex items-center gap-2"
        >
          <span>&larr;</span> Back to About Us
        </Link>
        <Link
          to={`/awardpage/${award.slug}`}
          className="text-[15px] text-[#0089D0] hover:underline transition-all duration-200 flex items-center gap-2"
        >
          More about {award.breadcrumb || award.title} <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
};

export default Awardpage;