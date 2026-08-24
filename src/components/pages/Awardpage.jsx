import React from "react";
import { Link, useParams } from "react-router-dom";
import awardpage from "../../assets/about/award/awardpage.png"

const Awardpage = () => {
  // You can use useParams() if you have dynamic routes
  // const { awardId } = useParams();

  // Example data - you can fetch this from an API or props
  const awardData = {
    title: "Atria Senior Living: The Next Chapter",
    year: "2022",
    category: "Best Webisode Series",
    breadcrumb: "Addy Awards",
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[110px] md:mt-[115px] pb-6 lg:px-0 md:px-13 px-7 sm:px-6 md:px-0">
      {/* Breadcrumb */}
      <div className="flex justify-between ">
        <div>
      <div className="flex items-center gap-2 text-[14px] text-[#9EA5BB] mb-14">
        <Link to="/" className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339] transition-colors">
          Awards
        </Link>
        <span>&gt;</span>
        <span className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339]">
          {awardData.breadcrumb}
        </span>
      </div>

      {/* Year */}
      <p className="text-[15px] text-[#9EA5BB] mb-5">{awardData.year}</p>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-12">
        <div>
        <h1 className="text-[36px] md:text-[42px] lg:text-[20px] font-normal text-[#293339] leading-[1.2] ">
          {awardData.title}

        </h1>
        </div>
        <div>
            <p className="text-[18px] text-[#0089D0] font-medium ">
            {awardData.category}
          </p>
        </div>
      </div>
      </div>
      {/* Award Category */}
      <div>
        <img src={awardpage} alt="" />
      </div>
      </div>
      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center pt-6 gap-2 ">
        <Link
          to="/about"
          className="text-[15px] text-[#0089D0] hover:underline transition-all duration-200 flex items-center gap-2"
        >
          <span></span> Back to About Us
        </Link>

        <Link
          to={`/awardpage/${awardData.breadcrumb.toLowerCase().replace(/\s/g, "-")}`}
          className="text-[15px] text-[#0089D0] hover:underline transition-all duration-200 flex items-center gap-2"
        >
          More about {awardData.breadcrumb} <span></span>
        </Link>
      </div>
    </section>
  );
};

export default Awardpage;
 