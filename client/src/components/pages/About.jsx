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

// Import components
import AboutAwards from "./AboutAwards";
import AboutPeopleData from "./AboutPeopleData"; // ← Updated import
import AboutClientLogo from "./AboutClientLogo";

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const images = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <div className="w-full">

      {/* ================= VIDEO ================= */}
      <div className="w-full flex items-center justify-center">
        <div
          className="relative w-full max-w-[1155px] overflow-hidden cursor-pointer"
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
                  className="w-[100px] h-[100px] text-white group-hover:text-blue-500 transition-colors duration-300"
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
      <section className="w-full max-w-[1155px] mx-auto mt-[70px]">

        {/* ================= ABOUT US ================= */}
        <h1 className="text-[36px] leading-[43px] text-[#293339] mb-[30px]">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[80px]">

          {/* Left Column */}
          <div className="text-[17px] leading-[1.65] text-[#152B3D]">
            <p className="mb-[28px]">
              Blue Chalk Media is an award-winning, full-service production
              company and creative agency widely recognized for our
              signature cinematic nonfiction style and authentic expression
              of the human experience.
            </p>
            <p className="mb-[28px]">
              We serve clients all over the world in industries ranging from
              branded entertainment to advocacy and corporate storytelling.
            </p>
            <p>
              Since our founding in 2013, we have delivered over 1,200
              projects and have earned 230+ honors for a diverse client roster.
            </p>
          </div>

          {/* Right Column */}
          <div className="text-[17px] leading-[1.65] text-[#152B3D]">
            <p className="mb-[28px]">
              including television networks, advertising agencies, healthcare
              organizations, nonprofits and editorial thought leaders.
            </p>
            <p className="mb-[28px]">
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
        <div className="mt-[85px]">
          <h2 className="text-[36px] leading-[43px] md:text-[40px] font-bgw-400 text-[#152B3D] mb-[25px]">
            Blue Chalk On Assignment
          </h2>
          <p className="text-[17px] leading-[1.65] text-[#152B3D] font-bgw-400">
            From Asia to Europe—scroll through some of the images we've
          </p>
          <p className="text-[17px] leading-[1.65] text-[#152B3D] font-bgw-400">
            captured while on assignment around the world.
          </p>
        </div>
      </section>

      {/* ================= 9 IMAGE GALLERY ================= */}
      <div className="w-full mt-[50px] overflow-hidden">
        <div className="flex w-full h-[380px]">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full flex-1 min-w-0 overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[4]"
            >
              <img
                src={image}
                alt={`Assignment ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <section className="w-full max-w-[1155px] mx-auto mt-[80px]">
        <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[30px]">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[80px] gap-y-[20px]">
          <p className="text-[17px] text-[#152B3D]">
            Television and video production
          </p>
          <p className="text-[17px] text-[#152B3D]">
            Podcasting
          </p>
          <p className="text-[17px] text-[#152B3D]">
            Documentary Filmmaking
          </p>
          <p className="text-[17px] text-[#152B3D]">
            Post-Production
          </p>
          <p className="text-[17px] text-[#152B3D]">
            Motion Graphics
          </p>
        </div>
      </section>

      {/* ================= CLIENTS & PARTNERS ================= */}
      <AboutClientLogo />

      {/* ================= AWARDS SECTION ================= */}
      <AboutAwards />

      {/* ================= MEET THE TEAM SECTION ================= */}
      <AboutPeopleData /> {/* ← Updated component name */}

      {/* ================= CAREERS ================= */}
      <section className="w-full max-w-[1155px] mx-auto mt-[40px] pb-[60px]">
        <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[75px]">
          Careers
        </h2>

        <p className="max-w-[550px] text-[16px] md:text-[17px] leading-[1.4] text-[#8C9BA8] mb-[45px]">
          We're always looking to work with people who share our values—people
          who are both talented individuals and excellent collaborators. If you don't
          see a job listing below that suits your skill set, please fill out our{" "}
          <a
            href="#"
            className="text-[#0089D0] hover:underline underline-offset-2"
          >
            creative partners interest form
          </a>{" "}
          to let us know more about your background and skills. And don't forget to
          follow us on social media to be the first to know about job new openings.
        </p>

        <p className="max-w-[550px] text-[16px] md:text-[17px] leading-[1.4] text-[#8C9BA8]">
          Blue Chalk Media is an equal opportunity employer committed to an
          inclusive workplace. We do not tolerate sexual harassment or discrimination
          based on race, color, religion, gender identity, age, national origin,
          veteran status or disability. We believe that our differences make us
          stronger and that working together with respect for each individual is
          essential to the success of our company as a whole.
        </p>
      </section>

    </div>
  );
};

export default About;