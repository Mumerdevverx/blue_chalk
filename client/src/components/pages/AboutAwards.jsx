import React from 'react';
import awardOne from "../../assets/about/award/awardOne.jpg";
import awardTwo from "../../assets/about/award/awardTwo.jpg";
import awardThree from "../../assets/about/award/awardThree.jpg";

const AboutAwards = () => {
  const awards = [
    {
      title: "Addy Awards",
      image: awardOne,
    },
    {
      title: "Davey Awards",
      image: awardTwo,
    },
    {
      title: "Northwest Regional Emmys",
      image: awardThree,
    },
    {
      title: "AdWeek Arc Awards",
      image: awardOne,
    },
    {
      title: "DC Environmental Film Festival",
      image: awardTwo,
    },
    {
      title: "NYX Video Awards",
      image: awardThree,
    },
  ];

  return (
    <section className="w-full max-w-[1155px] mx-auto mt-[30px] sm:mt-[35px] md:mt-[40px] px-4 sm:px-6 md:px-0">
      <h2 className="text-[28px] sm:text-[32px] md:text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[20px] sm:mb-[25px] md:mb-[30px]">
        Awards
      </h2>

      <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] text-[#152B3D] mb-[25px] sm:mb-[30px] md:mb-[35px]">
        Blue Chalk Media has been honored with numerous awards including:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[30px] sm:mt-[40px] md:mt-[50px] gap-[20px] sm:gap-[25px] md:gap-[30px]">
        {awards.map((award, index) => (
          <div
            key={index}
            className="border-t border-[#D9D9D9] pt-[10px] flex items-center justify-between min-h-[60px] sm:min-h-[65px] md:min-h-[70px] hover:bg-gray-50 transition-colors duration-200 px-2 sm:px-3 md:px-0"
          >
            <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#0089D0] hover:underline underline-offset-2 transition-all duration-200 flex-1 pr-2">
              {award.title}
            </h3>

            <img
              src={award.image}
              alt={award.title}
              className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] object-contain flex-shrink-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutAwards;