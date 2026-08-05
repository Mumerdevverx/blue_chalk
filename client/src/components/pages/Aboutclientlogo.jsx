import React from 'react';
import logoOne from "../../assets/about/aboutlogo/logoOne.jpg";
import logoTwo from "../../assets/about/aboutlogo/logoTwo.jpg";
import logoThree from "../../assets/about/aboutlogo/logoThree.jpg";
import logoFour from "../../assets/about/aboutlogo/logoFour.jpg";
import logoFive from "../../assets/about/aboutlogo/logoFive.jpg";

const AboutClientLogo = () => {
  const logoImages = [
    logoOne,
    logoTwo,
    logoThree,
    logoFour,
    logoFive,
  ];

  return (
    <section className="w-full max-w-[1155px] mx-auto mt-[80px]">
      <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mt-[80px] mb-[50px]">
        Blue Chalk Clients & Partners
      </h2>

      <div className="w-full mt-[60px]">
        <div className="flex items-center justify-between gap-[60px] md:gap-[90px] lg:gap-[110px]">
          {logoImages.map((image, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Client ${index + 1}`}
                className="w-full max-w-[180px] h-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutClientLogo;