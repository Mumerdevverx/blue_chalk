import React from 'react';
import logoOne from "../../assets/about/aboutlogo/logoOne.jpg";
import logoTwo from "../../assets/about/aboutlogo/logoTwo.jpg";
import logoThree from "../../assets/about/aboutlogo/logoThree.jpg";
import logoFour from "../../assets/about/aboutlogo/logoFour.jpg";
import logoFive from "../../assets/about/aboutlogo/logoFive.jpg";
import logoSix from "../../assets/about/aboutlogo/logoSix.jpg";
import logoSeven from "../../assets/about/aboutlogo/logoSeven.jpg";
import logoEight from "../../assets/about/aboutlogo/logoEight.jpg";
import logoNine from "../../assets/about/aboutlogo/logoNine.jpg";
import logoTen from "../../assets/about/aboutlogo/logoTen.jpg";
import logoEleven from "../../assets/about/aboutlogo/logoEleven.jpg";
import logo12 from "../../assets/about/aboutlogo/logo12.jpg";
import logo13 from "../../assets/about/aboutlogo/logo13.jpg";
import logo14 from "../../assets/about/aboutlogo/logo14.jpg";
import logo15 from "../../assets/about/aboutlogo/logo15.jpg";
import logo16 from "../../assets/about/aboutlogo/logo16.jpg";
import logo17 from "../../assets/about/aboutlogo/logo17.jpg";
import logo18 from "../../assets/about/aboutlogo/logo18.jpg";
import logo19 from "../../assets/about/aboutlogo/logo19.jpg";
import logo20 from "../../assets/about/aboutlogo/logo20.jpg";
import logo21 from "../../assets/about/aboutlogo/logo21.jpg";
import logo22 from "../../assets/about/aboutlogo/logo22.jpg";
import logo23 from "../../assets/about/aboutlogo/logo23.jpg";
import logo24 from "../../assets/about/aboutlogo/logo24.jpg";
import logo25 from "../../assets/about/aboutlogo/logo25.jpg";
import logo26 from "../../assets/about/aboutlogo/logo26.jpg";
import logo27 from "../../assets/about/aboutlogo/logo27.jpg";
import logo28 from "../../assets/about/aboutlogo/logo28.jpg";
import logo29 from "../../assets/about/aboutlogo/logo29.jpg";
import logo30 from "../../assets/about/aboutlogo/logo30.jpg";
import logo31 from "../../assets/about/aboutlogo/logo31.jpg";
import logo32 from "../../assets/about/aboutlogo/logo32.jpg";
import logo33 from "../../assets/about/aboutlogo/logo33.jpg";
import logo34 from "../../assets/about/aboutlogo/logo34.jpg";
import logo35 from "../../assets/about/aboutlogo/logo35.jpg";

const AboutClientLogo = () => {
  const logoImages = [
    logoOne, logoTwo, logoThree, logoFour, logoFive,
    logoSix, logoSeven, logoEight, logoNine, logoTen,
    logoEleven, logo12, logo13, logo14, logo15,
    logo16, logo17, logo18, logo19, logo20,
    logo21, logo22, logo23, logo24, logo25,
    logo26, logo27, logo28, logo29, logo30,
    logo31, logo32, logo33, logo34, logo35,
  ];

  return (
    <section className="w-full max-w-[1155px] mx-auto mt-[80px]">
      <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[50px]">
        Blue Chalk Clients & Partners
      </h2>

      {/* Responsive Grid - Mobile: 2 cols, Tablet: 3 cols, Desktop: 5 cols */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {logoImages.map((image, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-3 md:p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image}
              alt={`Client ${index + 1}`}
              className="w-full h-[60px] sm:h-[80px] md:h-[100px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
              onError={(e) => {
                console.error(`❌ Logo ${index + 1} failed to load:`, image);
                e.target.src = 'https://via.placeholder.com/150x100?text=Logo';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutClientLogo;