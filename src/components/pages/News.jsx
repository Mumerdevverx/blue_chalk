import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL, { resolveNewsImageUrl } from "../../config/api";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [publicEmail, setPublicEmail] = useState("hello@bluechalk.com");

  useEffect(() => {
    const fetchPublicEmail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/email/public-recipient`);
        const data = await res.json();
        if (data.success && data.recipientEmail) {
          setPublicEmail(data.recipientEmail);
        }
      } catch (err) {
        // keep fallback hello@bluechalk.com
      }
    };
    fetchPublicEmail();
  }, []);

  useEffect(() => {
    if (!newsletterMessage) return undefined;
    const timeoutId = window.setTimeout(() => setNewsletterMessage(""), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [newsletterMessage]);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name?.value?.trim() || "";
    const email = form.elements.email?.value?.trim() || "";
    const title = form.elements.title?.value?.trim() || "";
    const company = form.elements.company?.value?.trim() || "";

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage("Please enter a valid name and email address.");
      return;
    }

    setIsSubmittingNewsletter(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, title, company })
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterMessage("Thank you! Your newsletter request has been received.");
        form.reset();
      } else {
        setNewsletterMessage(data.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setNewsletterMessage("Failed to submit. Please try again later.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/news?page=${page}&limit=20&summary=true`);
        const data = await response.json();
        
        if (data.success) {
          // ✅ Yahan se custom sorting hata di hai.
          // Backend pehle se hi naya data (200, 199, 198...) bhej raha hai.
          if (page === 1) {
            setNews(data.data); 
          } else {
            setNews((prev) => [...prev, ...data.data]); 
          }
          
          if (data.count <= page * 20) {
            setHasMore(false);
          }
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white mt-20 pt-[30px] pb-[60px] sm:pt-[40px] md:pt-[45px] md:pb-[80px]">
      <div className="w-full lg-flex-1 px-0 md:px-[50px] lg:px-1">
        
        {/* TOP HEADINGS */}
        <div className="flex w-full items-center justify-between pb-[28px] max-sm:px-8">
          <div className="w-full lg:w-[73%]">
            <h1 className="text-[36px] ml-20 md:text-[36px] font-normal leading-[43px] text-[#152B3D]">News</h1>
          </div>
          <div className="hidden w-[27%] lg:block">
            <h1 className="text-[28px] font-normal lg:pt-4 leading-[43px] text-[#c5c0bd] sm:text-[30px] md:text-[36px]">Work With Us</h1>
          </div>
        </div>

        <div className="flex w-full flex-col lg:flex-row">
          <div className="w-full lg:w-[71%]">
            {news.length === 0 && loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : news.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No news articles found.</p>
            ) : (
              <>
                {news.map((item) => (
                  <div key={item._id} className="group flex w-full flex-col border-t border-[#eeeeee] md:flex-row">
                    <div className="w-full shrink-0 md:w-[40%]">
                      <Link to={`/news/${item.slug}`} className="block">
                        <img
                          src={resolveNewsImageUrl(item.image)}
                          alt={item.title}
                          className="h-[230px] md:h-[290px] lg:h-[275px] w-full grayscale transition duration-300 group-hover:grayscale-0"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
                        />
                      </Link>
                    </div>
                    <Link 
                      to={`/news/${item.slug}`}
                      className="group flex w-[55%] flex-col justify-center lg:px-10 md:px-5 py-[30px] hover:text-[#1893DB] md:py-[30px] max-sm:px-8">
                      <h2 className="text-[24px] font-normal leading-[30px] text-[#152B3D] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[24px]">
                        {item.title}
                      </h2>
                      <p className="pt-1 text-[11px] tracking-[2px] text-[#a5a5a5] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[11px] uppercase leading-[28px]">
                        {item.date}
                      </p>
                      <p className="mt-[3px] text-[18px] leading-[28px] text-[#152B3D] transition-colors duration-300 group-hover:text-[#1893DB] md:text-[18px]">
                        {item.description}{" "}
                        <span className="text-[#C6C2C2] group-hover:text-[#1893DB] font-medium text-[17px] inline-flex items-center gap-1 transition group-hover:translate-x-1">
                          Read More →
                        </span>
                      </p>
                    </Link>
                  </div>
                ))}

                {/* LOAD MORE BUTTON */}
                {hasMore && (
                  <div className="flex justify-center mt-10 mb-8 w-full">
                    <button 
                      onClick={loadMore} 
                      disabled={loading}
                      className="px-8 py-3 bg-[#0089D0] text-white text-[13px] font-semibold tracking-[1px] hover:bg-white hover:text-[#0089D0] border border-[#0089D0] transition duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "LOADING..." : "LOAD MORE NEWS"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full border-[#eeeeee] pt-[40px] lg:px-0 md:px-0 lg:w-[27%] lg:pl-[34px] lg:pt-[5px] max-sm:px-8">
            <h1 className="lg:hidden block mb-[30px] text-[36px] font-normal leading-[43px] text-[#c5c0bd] md:text-[36px] mt-10">Work With Us</h1>
            <div>
              <p className="text-[15px] text-[#777f83] md:text-[15px] leading-[22px]">Use the email below to reach out.</p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(publicEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[12px] flex items-center gap-[9px] text-[#0089D0] hover:underline text-[22px] md:text-[22px] leading-[28px]"
              >
                <span className="flex h-[22px] w-[22px] text-[16px] shrink-0 items-center justify-center rounded-full bg-[#0089D0] text-[11px] text-white">✉</span>
                <span>{publicEmail}</span>
              </a>
            </div>
            <div className="mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[60px]">
              <h2 className="text-[36px] font-normal leading-[43px] text-[#c5c0bd] md:text-[36px]">Get Our Newsletter</h2>
              <p className="mt-[28px] text-[15px] leading-[22px] text-[#777f83] md:text-[15px]">Subscribe to our newsletter to keep up to date on new projects from Blue Chalk Media.</p>
              <form className="mt-[20px] w-full" onSubmit={handleNewsletterSubmit} noValidate>
                <input type="text" name="name" placeholder="Name*" className="h-[38px] w-full border-b border-[#d9d9d9] bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D] focus:placeholder:opacity-0" />
                <input type="text" inputMode="email" name="email" placeholder="Email*" className="h-[38px] w-full border-b border-[#d9d9d9] bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D] focus:placeholder:opacity-0" />
                <input type="text" name="title" placeholder="Title (optional)" className="h-[38px] w-full border-b border-[#d9d9d9] bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa] focus:placeholder:opacity-0" />
                <input type="text" name="company" placeholder="Company (optional)" className="h-[38px] w-full border-b border-[#d9d9d9] bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa] focus:placeholder:opacity-0" />
                <div className="relative">
                  <button type="submit" disabled={isSubmittingNewsletter} className="h-[40px] w-full border border-[#0089D0] bg-[#0089D0] text-[11px] leading-[11px] font-semibold tracking-[1px] text-white transition duration-200 hover:bg-white hover:text-[#0089D0] disabled:opacity-50">
                    {isSubmittingNewsletter ? "SUBMITTING..." : "SUBSCRIBE"}
                  </button>
                  {newsletterMessage && (
                    <div className="absolute bottom-full right-0 z-[100] mb-3 flex w-[calc(100vw-40px)] max-w-md items-start gap-3 whitespace-normal break-words rounded-md border border-gray-300 bg-white px-5 py-4 text-sm text-black shadow-lg" role="status">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#f26522] font-bold text-white">!</span>
                      <span>{newsletterMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;