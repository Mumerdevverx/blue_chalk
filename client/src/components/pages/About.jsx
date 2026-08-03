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

import logoOne from "../../assets/about/aboutlogo/logoOne.jpg";
import logoTwo from "../../assets/about/aboutlogo/logoTwo.jpg";
import logoThree from "../../assets/about/aboutlogo/logoThree.jpg";
import logoFour from "../../assets/about/aboutlogo/logoFour.jpg";
import logoFive from "../../assets/about/aboutlogo/logoFive.jpg";

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

  const logoImages = [
    logoOne,
    logoTwo,
    logoThree,
    logoFour,
    logoFive,
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
        <h1 className="text-[35px] md:text-[40px] font-normal text-[#152B3D] mb-[30px]">
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
              We’ve also produced impactful documentary films that have been
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

          <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[25px]">
            Blue Chalk On Assignment
          </h2>

          <p className="text-[17px] leading-[1.65] text-[#152B3D]">
            From Asia to Europe—scroll through some of the images we’ve
          </p>

          <p className="text-[17px] leading-[1.65] text-[#152B3D]">
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
              className="
                relative
                h-full
                flex-1
                min-w-0
                overflow-hidden
                cursor-pointer
                transition-all
                duration-500
                ease-in-out
                hover:flex-[4]
              "
            >
              <img
                src={image}
                alt={`Assignment ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  grayscale
                  hover:grayscale-0
                  transition-all
                  duration-500
                "
              />
            </div>
          ))}

        </div>
      </div>

      {/* ================= SERVICES + CLIENTS ================= */}
      <section className="w-full max-w-[1155px] mx-auto mt-[80px]">

        {/* ================= SERVICES ================= */}
        <section>

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

        {/* ================= CLIENTS ================= */}
        <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mt-[80px] mb-[50px]">
          Blue Chalk Clients & Partners
        </h2>

        {/* ================= CLIENT LOGOS ================= */}
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
          className="
            w-full
            max-w-[180px]
            h-[120px]
            object-contain
            grayscale
            hover:grayscale-0
            transition-all
            duration-300
          "
        />
      </div>
    ))}

  </div>
</div>

      </section>

    </div>
  );
};

export default About;