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

import awardOne from "../../assets/about/award/awardOne.jpg";
import awardTwo from "../../assets/about/award/awardTwo.jpg";
import awardThree from "../../assets/about/award/awardThree.jpg";

import teamOne from "../../assets/about/team/teamOne.jpg";
import teamOnes from "../../assets/about/team/teamOnes.jpg";

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
];

const [isSelected, setIsSelected] = useState(false);



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
      <h1 className="font-bgw-400 text-[36px] leading-[43px] text-[#293339] mb-[30px]">
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

          <h2 className="text-[36px] leading-[43px] md:text-[40px] font-bgw-400 text-[#152B3D] mb-[25px]">
            Blue Chalk On Assignment
          </h2>

          <p className="text-[17px] leading-[1.65] text-[#152B3D] font-bgw-400">
            From Asia to Europe—scroll through some of the images we’ve
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
        
        <section className="w-full max-w-[1155px] mx-auto mt-[40px]">
  <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[30px]">
    Awards
  </h2>

  <p className="text-[17px] leading-[1.65] text-[#152B3D] mb-[35px]">
    Blue Chalk Media has been honored with numerous awards including:
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px]">
    {awards.map((award, index) => (
      <div
        key={index}
        className="border-t border-[#D9D9D9] pt-[10px] flex items-center justify-between min-h-[70px]"
      >
        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#0089D0] hover:underline underline-offset-2">
          {award.title}
        </h3>

        <img
          src={award.image}
          alt={award.title}
          className="w-[55px] h-[55px] object-contain"
        />
      </div>
    ))}
  </div>
</section>



{/* ================= MEET THE TEAM ================= */}
<section className="w-full max-w-[1155px] mx-auto py-[60px]">
  <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[50px]">
    Meet the Team
  </h2>

  <div className="flex justify-center">
    <div className="w-full max-w-[330px] text-center">

      {/* Image */}
      <div
        onClick={() => setIsSelected(!isSelected)}
        className="group relative w-[260px] h-[260px] mx-auto rounded-full overflow-hidden cursor-pointer"
      >
        {/* Default Image */}
        <img
          src={teamOne}
          alt="Greg Moyer"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Hover Image */}
        <img
          src={teamOnes}
          alt="Greg Moyer"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Name */}
      <h3 className="mt-[25px] text-[23px] md:text-[24px] text-[#0089D0] font-normal">
        Greg Moyer (He/Him)
      </h3>

      {/* Position */}
      <p className="mt-[3px] text-[11px] tracking-[3px] text-[#152B3D]">
        FOUNDER AND CEO
      </p>

      {/* Details - Show on Click */}
      {isSelected && (
        <div className="mt-[30px] text-left">
          <p className="text-[17px] leading-[1.65] text-[#152B3D]">
            Greg Moyer founded Blue Chalk Media in 2013 intending to create a
            world-class visual communications company whose productions
            demonstrate the power, importance, and appeal of documentary-style
            storytelling. Hundreds of films and awards later, Blue Chalk has
            become known for its cinematic production style and journalistic
            approach to stories, a reflection of Greg’s early love for visual
            journalism as an aspiring photographer and newspaper photo editor.
            Prior to Blue Chalk, Greg spent over 25 years in senior management
            roles for a variety of non-fiction television brands, including
            Discovery Channel, TLC, Animal Planet, VOOM HD and Food Network.
            While head of programming, Greg led Discovery to five George
            Foster Peabody Awards for editorial excellence. In his final role
            as a television channel executive, Greg managed the launch of the
            Food Network into 63 countries outside North America.
          </p>
        </div>
      )}
    </div>
  </div>
</section>

<section className="w-full max-w-[1155px] mx-auto mt-[40px] pb-[60px]">
  {/* Heading */}
  <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[75px]">
    Careers
  </h2>

  {/* First Paragraph */}
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

  {/* Second Paragraph */}
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