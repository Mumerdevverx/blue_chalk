import React from "react";
import { Link } from "react-router-dom";
import atomic from "../../assets/newsImages/atomic.jpg";
import win from "../../assets/newsImages/win.jpg";

const News = () => {
  const news = [
    {
      image: atomic,
      title:
        "Blue Chalk’s Atomic Echoes to Premiere on Public Television Stations Nationwide August 1",
      date: "JULY 8, 2025",
      description:
        "Marking the 80th anniversary of the Hiroshima and Nagasaki atomic bombing, Atomic Echoes: Untold Stories of World War II, a new documentary from Blue Chalk ...",
    },
    {
      image: win,
      title:
        "Blue Chalk Wins Three Telly Awards, Bringing Total to 31",
      date: "MAY 28, 2025",
      description:
        "Blue Chalk-supported projects received three honors at this year’s Telly Awards, bringing our total number of wins from the competition to 31. Firebreak, an ...",
    },
  ];

  return (
    <div className="w-full bg-white mt-20 pt-[30px] pb-[60px] sm:pt-[40px] md:pt-[45px] md:pb-[80px]">
      
      <div className="mx-auto w-full max-w-[1280px] px-[20px] sm:px-[25px] lg:px-10">

        {/* ================= TOP HEADINGS ================= */}
        <div className="flex w-full items-center justify-between pb-[28px]">
          
          {/* News Heading */}
          <div className="w-full lg:w-[73%]">
            <h1 className="text-[28px] font-normal leading-none text-[#152B3D] sm:text-[30px] md:text-[34px]">
              News
            </h1>
          </div>

          {/* Work With Us Heading */}
          <div className="hidden w-[27%] lg:block">
            <h1 className="text-[28px] font-normal ml-8 leading-none text-[#c5c0bd] sm:text-[30px] md:text-[34px]">
              Work With Us
            </h1>
          </div>

        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex w-full flex-col lg:flex-row">

          {/* ================= LEFT NEWS ================= */}
          <div className="w-full lg:w-[73%]">

            {news.map((item, index) => (
              <div
                key={index}
                className="flex w-full flex-col border-t border-[#eeeeee]  md:flex-row"
              >

                {/* Image */}
                <div className="w-full shrink-0 md:w-[40%]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[230px] grayscale hover:grayscale-0 w-full object-cover sm:h-[250px] md:h-[267px]"
                  />
                </div>

                {/* News Content */}
                <div className="flex w-full     flex-col justify-center px-[15px] py-[25px] sm:px-[20px] sm:py-[30px] md:w-[55%] md:px-[25px] lg:px-[35px]">

                  <h2 className="text-[19px] hover:text-blue-500 font-normal leading-[1.4] text-[#152B3D] sm:text-[20px] md:text-[22px] lg:text-[23px]">
                    {item.title}
                  </h2>

                  <p className="mt-[8px] hover:text-blue-500 text-[9px] tracking-[2px] text-[#a5a5a5] sm:text-[10px] md:text-[11px]">
                    {item.date}
                  </p>

                  <p className="mt-[12px] hover:text-blue-500 text-[14px] leading-[1.6] text-[#152B3D] sm:text-[15px] md:text-[16px] lg:text-[17px]">
                    {item.description}

                    <Link
                      to="#"
                      className="ml-[5px] text-[#999999] hover:text-[#0089D0] hover:underline"
                    >
                      Read more
                    </Link>
                  </p>

                </div>
              </div>
            ))}

          </div>

          {/* ================= RIGHT WORK WITH US ================= */}
          <div className="w-full border-[#eeeeee] pt-[40px] md:px-[20px] lg:w-[27%]  lg:pl-[34px] lg:pt-[5px]">

            {/* Mobile Heading */}
            <h1 className="mb-[30px] block  text-[28px] font-normal leading-none text-[#c5c0bd] sm:text-[30px] md:text-[34px] lg:hidden">
              Work With Us
            </h1>

            {/* Email Section */}
            <div>
              <p className="text-[13px] text-[#777f83] sm:text-[14px]">
                Use the email below to reach out.
              </p>

              <a
                href="mailto:hello@bluechalk.com"
                className="mt-[12px] flex items-center gap-[9px] text-[17px] text-[#0089D0] hover:underline sm:text-[18px] md:text-[19px]"
              >
                <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#0089D0] text-[11px] text-white">
                  ✉
                </span>

                <span>hello@bluechalk.com</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[105px]">

              <h2 className="text-[30px] font-normal leading-[1.15] text-[#c5c0bd] sm:text-[34px] md:text-[36px]">
                Get Our
                <br />
                Newsletter
              </h2>

              <p className="mt-[28px] max-w-[330px] text-[13px] leading-[1.6] text-[#777f83] sm:text-[14px]">
                Subscribe to our newsletter to keep up to date on new projects
                from Blue Chalk Media.
              </p>

              {/* Newsletter Form */}
              <form className="mt-[20px] w-full">

                {/* Name */}
                <input
                  type="text"
                  placeholder="Name*"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D]"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email*"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#152B3D]"
                />

                {/* Title */}
                <input
                  type="text"
                  placeholder="Title (optional)"
                  className="h-[38px] w-full border-b border-white bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa]"
                />

                {/* Company */}
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className="h-[38px] w-full bg-[#f1f1f1] px-[10px] text-[13px] text-[#152B3D] outline-none placeholder:text-[#aaa]"
                />

                {/* Subscribe */}
                <button
                  type="submit"
                  className="h-[40px] w-full bg-[#0089D0] text-[12px] font-semibold tracking-[1px] text-white transition duration-200 hover:bg-[#0075b5]"
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