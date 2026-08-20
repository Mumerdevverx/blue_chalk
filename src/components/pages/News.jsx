import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news");
        const data = await response.json();
        if (data.success) {
          setNews(data.data);
        } else {
          setError("Failed to load news");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white mt-20 pt-[30px] pb-[60px] sm:pt-[40px] md:pt-[45px] md:pb-[80px]">
      <div className="mx-auto w-full lg-flex-1 px-0 md:px-[50px] lg:px-25">
        {/* TOP HEADINGS */}
        <div className="flex w-full items-center justify-between pb-[28px] max-sm:px-8">
          <div className="w-full lg:w-[73%]">
            <h1 className="text-[36px] md:text-[36px] font-normal leading-[43px] text-[#152B3D]">
              News
            </h1>
          </div>
          <div className="hidden w-[27%] lg:block">
            <h1 className="text-[28px] font-normal ml-8 lg:pt-4 leading-[43px] text-[#c5c0bd] sm:text-[30px] md:text-[36px]">
              Work With Us
            </h1>
          </div>
        </div>

        <div className="flex w-full flex-col lg:flex-row">
          <div className="w-full lg:w-[73%]">
            {news.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No news articles found.</p>
            ) : (
              news.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full flex-col border-t border-[#eeeeee] md:flex-row"
                >
                  <div className="w-full shrink-0 md:w-[40%]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[230px] md:h-[290px] lg:h-[267px] grayscale hover:grayscale-0 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="group flex w-full flex-col justify-center lg:px-10 md:px-5 py-[30px] hover:text-[#1893DB] md:py-[30px] max-sm:px-8">
                    <h2 className="text-[24px] font-normal leading-[30px] text-[#152B3D] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[24px]">
                      {item.title}
                    </h2>
                    <p className="pt-2 text-[11px] tracking-[2px] text-[#a5a5a5] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[11px] leading-[28px]">
                      {item.date}
                    </p>
                    <p className="mt-[3px] text-[18px] leading-[28px] text-[#152B3D] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[18px]">
                      {item.description}
                    </p>
                    <Link
  to={`/news/${item.slug}`}   // ✅ YEH SAHI HAI
  className="mt-2 text-[#1893DB] font-medium text-[16px] hover:underline inline-flex items-center gap-1 transition group-hover:translate-x-1"
>
  Read More →
</Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right sidebar (same as before) */}
          <div className="w-full border-[#eeeeee] pt-[40px] lg:px-0 md:px-0 lg:w-[27%] lg:pl-[34px] lg:pt-[5px] max-sm:px-8">
            <h1 className="lg:hidden block mb-[30px] text-[36px] font-normal leading-[43px] text-[#c5c0bd] md:text-[36px] mt-10">
              Work With Us
            </h1>
            <div>
              <p className="text-[15px] text-[#777f83] md:text-[15px] leading-[22px]">
                Use the email below to reach out.
              </p>
              <a
                href="mailto:hello@bluechalk.com"
                className="mt-[12px] flex items-center gap-[9px] text-[#0089D0] hover:underline text-[22px] md:text-[22px] leading-[28px]"
              >
                <span className="flex h-[22px] w-[22px] text-[16px] shrink-0 items-center justify-center rounded-full bg-[#0089D0] text-[11px] text-white">
                  ✉
                </span>
                <span>hello@bluechalk.com</span>
              </a>
            </div>
            <div className="mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[60px]">
              <h2 className="text-[36px] font-normal leading-[43px] text-[#c5c0bd] md:text-[36px]">
                Get Our Newsletter
              </h2>
              <p className="mt-[28px] text-[15px] leading-[22px] text-[#777f83] md:text-[15px]">
                Subscribe to our newsletter to keep up to date on new projects
                from Blue Chalk Media.
              </p>
              <form className="mt-[20px] w-full">
                <input
                  type="text"
                  placeholder="Name*"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D]"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D]"
                />
                <input
                  type="text"
                  placeholder="Title (optional)"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa]"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className="h-[38px] w-full bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa]"
                />
                <button
                  type="submit"
                  className="h-[40px] w-full bg-[#0089D0] text-[11px] leading-[11px] font-semibold tracking-[1px] text-white transition duration-200 hover:bg-white hover:text-[#0089D0] hover:border border-[#0089D0]"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;