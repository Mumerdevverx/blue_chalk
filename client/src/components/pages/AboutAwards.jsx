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
    <section className="w-full mb-30 max-w-[1155px]  mx-auto mt-[40px]">
      <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[30px]">
        Awards
      </h2>

      <p className="text-[17px] leading-[1.65] text-[#152B3D] mb-[35px]">
        Blue Chalk Media has been honored with numerous awards including:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-20 gap-[30px]">
        {awards.map((award, index) => (
          <div
            key={index}
            className="border-t border-[#D9D9D9] pt-[10px] flex items-center justify-between min-h-[70px]"
          >
            <h3 className="text-[15px] md:text-[16px] font-semibold text-[#0089D0] hover:underline underline-offset-2">
              {award.title}
            </h3>

            <img
              src={award.image}
              alt={award.title}
              className="w-[50px] h-[50px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutAwards;