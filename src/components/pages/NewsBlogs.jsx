import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backarrow from "../../assets/newsImages/backarrow.svg";

const NewsBlogs = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/news/slug/${slug}`);
        const data = await response.json();
        if (data.success) {
          setNews(data.data);
        } else {
          setError("News not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news");
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-gray-500 text-lg">{error || "News not found"}</p>
        <button
          onClick={() => navigate("/news")}
          className="text-[#1893DB] hover:underline mt-4"
        >
          ← Back to all News
        </button>
      </div>
    );
  }

  return (
    <div className="lg:px-22 md:px-13 px-7 max-sm:mt-18">
      {/* Image */}
      <div className="mb-8">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-[620px] object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x620?text=No+Image";
          }}
        />
      </div>

      <div className="flex md:flex-row flex-col place-items-baseline gap-6 md:gap-14 mb-10">
        <button
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 text-[#1893DB] cursor-pointer hover:opacity-80 transition-opacity min-w-fit"
        >
          <img src={backarrow} alt="Back arrow" className="w-5 h-5" />
          <span className="text-[13px] font-normal leading-[28px] hover:text-[#94999C]">
            Back to all News
          </span>
        </button>

        <div className="w-full">
          <h1 className="text-[36px] md:text-[36px] font-normal leading-[43px]">
            {news.title}
          </h1>
          <p className="text-[#C4BFBB] lg:text-[9px] md:text-[9px] text-[9px] leading-[28px] tracking-[2px] font-normal mt-6 md:mt-5">
            {news.date}
          </p>

          {/* ✅ DYNAMIC CONTENT */}
          <div className="mt-10 md:mt-10 lg:mr-52">
            {news.content ? (
              <div
                className="text-[#293339] text-[16px] md:text-[16px] font-normal leading-[30px]"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            ) : (
              <p className="text-gray-500">No content available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogs;