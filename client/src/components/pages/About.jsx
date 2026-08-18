import React, { useRef, useState } from "react";

import peoples from "../../assets/peoples.jpg";
import aboutvideo from "../../assets/aboutvideo.mp4";

import one from "../../assets/about/one.jpg";
import two from "../../assets/about/two.jpg";
import three from "../../assets/about/three.jpg";
import four from "../../assets/about/four.jpg";
import five from "../../assets/about/five.jpg";
import six from "../../assets/about/six.jpg";
import seven from "../../assets/about/seven.jpg";
import eight from "../../assets/about/eight.jpg";
import nine from "../../assets/about/nine.jpg";

// Import client logos directly
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

// Import components
import AboutAwards from "./AboutAwards";
import AboutPeopleData from "./AboutPeopleData";

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const images = [one, two, three, four, five, six, seven, eight, nine];

  // Client logos array
  const logoImages = [
    logoOne,
    logoTwo,
    logoThree,
    logoFour,
    logoFive,
    logoSix,
    logoSeven,
    logoEight,
    logoNine,
    logoTen,
    logoEleven,
    logo12,
    logo13,
    logo14,
    logo15,
    logo16,
    logo17,
    logo18,
    logo19,
    logo20,
    logo21,
    logo22,
    logo23,
    logo24,
    logo25,
    logo26,
    logo27,
    logo28,
    logo29,
    logo30,
    logo31,
    logo32,
    logo33,
    logo34,
    logo35,
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <div className="w-full pt-[70px] px-0 sm:px-0 md:px-0 lg:px-0.5 ">
      {/* ================= VIDEO ================= */}
      <div className="w-full flex items-center justify-center lg:px-0 md:px-13 px-7 ">
        <div
          className="relative w-full max-w-[1200px] overflow-hidden cursor-pointer"
          onClick={!isPlaying ? handlePlay : undefined}
        >
          {/* Image */}
          {!isPlaying && (
            <img
              src={peoples}
              alt="About"
              className="w-full h-auto object-contain"
            />
          )}

          {/* Video */}
          <video
            ref={videoRef}
            src={aboutvideo}
            controls={isPlaying}
            playsInline
            className={`w-full h-auto object-contain ${
              isPlaying ? "block" : "hidden"
            }`}
          />

          {/* Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="group">
                <svg
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] text-white group-hover:text-blue-500 transition-colors duration-300"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M11 7L25 16L11 25V7Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="w-full max-w-[1200px] mx-auto mt-[40px] sm:mt-[50px] md:mt-[35px] lg:px-0 md:px-13 px-7">
        {/* ================= ABOUT US ================= */}
        <h1 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] sm:leading-[43px] text-[#293339] mb-[20px] sm:mb-[25px] md:mb-[20px] ">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0 md:gap-x-[80px]">
          {/* Left Column */}
          <div className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
            <p className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
              Blue Chalk Media is an award-winning, full-service production
              company and creative agency widely recognized for our signature
              cinematic nonfiction style and authentic expression of the human
              experience.
            </p>
            <p className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
              We serve clients all over the world in industries ranging from
              branded entertainment to advocacy and corporate storytelling.
            </p>
            <p>
              Since our founding in 2013, we have delivered over 1,200 projects
              and have earned 230+ honors for a diverse client roster, including
            </p>
          </div>

          {/* Right Column */}
          <div className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
            <p className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
              television networks, advertising agencies, healthcare
              organizations, nonprofits and editorial thought leaders.
            </p>
            <p className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
              We've also produced impactful documentary films that have been
              official selections at over 50 international film festivals,
              solidifying our reputation as a premier creator of high-impact
              documentaries and broadcast-quality media.
            </p>
            <p>
              Blue Chalk has offices in Brooklyn, NY and Portland, OR and was
              acquired in 2024 by the London-based{" "}
              <a
                href="https://www.thisisauspicious.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0089D0] hover:underline hover:decoration-[#0089D0] underline-offset-2"
              >
                Auspicious Group.
              </a>
            </p>
          </div>
        </div>

        {/* ================= ON ASSIGNMENT ================= */}
        <div className="mt-[90px] md:mt-[65px] lg:mt-[85px] max-sm:mb-10">
          <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-bgw-400 text-[#152B3D] mb-[15px] sm:mb-[20px] md:mb-[25px]">
            Blue Chalk On Assignment
          </h2>
          <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D] font-bgw-400">
            From Asia to Europe—scroll through some of the images we've
          </p>
          <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D] font-bgw-400">
            captured while on assignment around the world.
          </p>
        </div>
      </section>

      {/* ================= 9 IMAGE GALLERY ================= */}
      <div className="w-full mt-[30px] sm:mt-[40px] md:mt-[50px] overflow-hidden">
        <div className="flex flex-wrap sm:flex-nowrap w-full h-[200px] sm:h-[280px] md:h-[380px]">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full flex-1 min-w-[50px] sm:min-w-0 overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[4]"
            >
              <img
                src={image}
                alt={`Assignment ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <section className="w-full max-w-[1200px] mx-auto mt-[50px] sm:mt-[60px] md:mt-[80px]  lg:px-0 md:px-13 px-7">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[20px] sm:mb-[25px] md:mb-[30px]">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-[30px] sm:gap-x-[50px] md:gap-x-[80px] gap-y-[0px] sm:gap-y-[0px] md:gap-y-[0px] max-sm:gap-6">
          {/* left side */}
          <div>
            <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
              Television and video production
            </p>
            <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
              Podcasting
            </p>
            <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
              Documentary Filmmaking
            </p>
          </div>
          {/* right side */}
          <div className="md:mt-7">
             <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
            Post-Production
          </p>

          <p className=" text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
            Motion Graphics
          </p>
          </div>
         
        </div>
      </section>

      {/* ================= CLIENTS & PARTNERS - DIRECTLY IN ABOUT.JS ================= */}
      <section className="w-full mx-auto lg:px-25 mt-[50px] sm:mt-[60px] md:mt-[80px] md:px-13 px-7 ">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[30px] sm:mb-[40px] md:mb-[50px]">
          Blue Chalk Clients & Partners
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-10">
          {logoImages.map((image, index) => (
            <div
              key={`logo-${index}`}
              className="flex items-center justify-center p-2 sm:p-3 md:p-4 lg:mr-0 md:mr-10 mr-0 bg-white rounded-lg transition-shadow duration-300"
            >
              <img
                src={image}
                alt={`Client ${index + 1}`}
                className="w-full h-[110px] md:h-[110px] lg:h-[140px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error(`❌ Logo ${index + 1} failed to load:`, image);
                  e.target.src =
                    "https://via.placeholder.com/150x100?text=Logo";
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= AWARDS SECTION ================= */}
      <AboutAwards />

      {/* ================= MEET THE TEAM SECTION ================= */}
      <AboutPeopleData />

      {/* ================= CAREERS ================= */}
      <section className="w-full max-w-[1200px] mx-auto mt-[60px] md:mt-[76px] lg:mt-[60px] pb-[60px] md:pb-[50px] lg:pb-[60px] lg:px-0 md:px-13 px-7">
        <h2 className="text-[36px] md:text-[32px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[40px] sm:mb-[50px] md:mb-[75px]">
          Careers
        </h2>

        <p className="max-w-full md:max-w-[550px] max-sm:mt-20 text-[16px] md:text-[16px] lg:text-[16px] leading-[1.5] text-[#8C9BA8] mb-[25px] sm:mb-[35px] md:mb-[45px]">
          We're always looking to work with people who share our values—people
          who are both talented individuals and excellent collaborators. If you
          don't see a job listing below that suits your skill set, please fill
          out our{" "}
          <a
            href="https://bluechalk.com/partners/"
            className="text-[#0089D0] hover:underline underline-offset-2"
          >
            creative partners interest form
          </a>{" "}
          to let us know more about your background and skills. And don't forget
          to follow us on social media to be the first to know about job new
          openings.
        </p>

        <p className="max-w-full md:max-w-[550px]  text-[16px] md:text-[16px] lg:text-[16px] leading-[1.5] text-[#8C9BA8]">
          Blue Chalk Media is an equal opportunity employer committed to an
          inclusive workplace. We do not tolerate sexual harassment or
          discrimination based on race, color, religion, gender identity, age,
          national origin, veteran status or disability. We believe that our
          differences make us stronger and that working together with respect
          for each individual is essential to the success of our company as a
          whole.
        </p>
      </section>
    </div>
  );
};

export default About;
