import React, { useState } from "react";

// Import all team images
import teamOne from "../../assets/about/team/teamOne.jpg";
import teamOnes from "../../assets/about/team/teamOnes.jpg";
import teamTwo from "../../assets/about/team/teamTwo.jpg";
import teamTwos from "../../assets/about/team/teamTwos.jpg";
import teamThree from "../../assets/about/team/teamThree.jpg";
import teamThrees from "../../assets/about/team/teamThrees.jpg";
import teamFour from "../../assets/about/team/teamFour.jpg";
import teamFours from "../../assets/about/team/teamFours.jpg";

import closeicon from "../../assets/about/team/closeicon.svg";

const AboutPeopleData = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Greg Moyer",
      pronouns: "(He/Him)",
      position: "FOUNDER AND CEO",
      image: teamOne,
      hoverImage: teamOnes,
      description:
        "Greg Moyer founded Blue Chalk Media in 2013 with a vision to create compelling, cinematic nonfiction content that resonates with audiences worldwide. Under his leadership, the company has grown into an award-winning production house known for its authentic storytelling and human-centered approach.",
    },
    {
      id: 2,
      name: "Pam Huling",
      pronouns: "(She/Her)",
      position: "CHIEF REVENUE OFFICER",
      image: teamTwo,
      hoverImage: teamTwos,
      description:
        "Pam Huling is chief revenue officer and co-founder of Blue Chalk, where she drives business development and strategic partnerships. With a background in media sales and production, Pam has been instrumental in building the company's diverse client roster and expanding its global reach.",
    },
    {
      id: 3,
      name: "Mariko Fujinaka",
      pronouns: "(She/Her)",
      position: "Post-Production Manager",
      image: teamThree,
      hoverImage: teamThrees,
      description:
        "Mariko Fujinaka joined Blue Chalk in 2018 and brings a wealth of experience in documentary writing and post-production. Her keen eye for detail and narrative structure has elevated countless projects, from branded content to feature-length documentaries.",
    },
    {
      id: 4,
      name: "Natalie Taylor",
      pronouns: "(She/Her)",
      position: "EXECUTIVE PRODUCER",
      image: teamFour,
      hoverImage: teamFours,
      description:
        "Natalie Taylor is an executive producer who has been with Blue Chalk since 2014. With over a decade of experience in nonfiction production, Natalie oversees complex projects from concept to completion, ensuring each story is told with integrity and impact.",
    },
  ];

  const handleToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F5F4F2] py-[40px] sm:py-[50px] md:py-[60px]">
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-0">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] max-sm:pl-4 md:pl-4 lg:pl-0 mb-[40px] md:mb-[60px] lg:mb-[50px]">
          Meet the Teams
        </h2>

        {/* Grid layout for responsive team members */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-10 lg:gap-x-12 gap-y-[40px] sm:gap-y-[50px] md:gap-y-[60px]">
          {teamMembers.map((member, index) => {
            return (
              <div key={member.id} className="text-center">
                {/* Image - Centered */}
                <div
                  onClick={() => handleToggle(index)}
                  className="group w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] xl:w-[270px] xl:h-[270px] rounded-full overflow-hidden cursor-pointer mx-auto transition-transform duration-300 "
                >
                  {/* Default Image - Pure CSS Filter se #B1DAEF (Light Blue) color diya gaya */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:hidden"
                    style={{
                      filter:
                        "sepia(0.5) hue-rotate(180deg) saturate(5) opacity(0.6)",
                    }}
                    loading="lazy"
                    onError={(e) => {
                      console.error("❌ Image failed to load:", member.image);
                      e.target.src =
                        "https://via.placeholder.com/200?text=Team+Member";
                    }}
                  />

                  {/* Hover Image - Bilkul waise hi Black & White (Grayscale) */}
                  <img
                    src={member.hoverImage}
                    alt={member.name}
                    className="w-full h-full object-cover hidden group-hover:block grayscale "
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        "❌ Hover image failed to load:",
                        member.hoverImage,
                      );
                      e.target.src =
                        "https://via.placeholder.com/200?text=Team+Member";
                    }}
                  />
                </div>

                {/* Name and Pronouns */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-3 sm:mt-4 px-2">
                  <h3 className="text-[18px] md:text-[24px] lg:text-[24px] md:leading-[24px] leading-[18px] text-[#0089D0] font-normal">
                    {member.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-[#0089D0] font-normal">
                    {member.pronouns}
                  </p>
                </div>

                {/* Position */}
                <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11px] tracking-[2px] sm:tracking-[3px] text-[#152B3D] uppercase px-2">
                  {member.position}
                </p>

                {/* Details - Shows when clicked */}
                {selectedIndex === index && (
                  <div className="mt-4 text-left px-2 sm:px-3 md:px-4">
                    <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D]">
                      {member.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[11px] md:text-[11px] lg:text-[11px]  leading-[28px] text-[#3C93D8]">
                        CONTACT / FOLLOW:
                      </p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
                        {/* LinkedIn Icon (FIXED) */}
                        <a
                          href="#"
                          className="w-[25px] h-[25px] bg-[#0089D0] rounded-xs flex items-center justify-center hover:bg-[#0379b5] transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <svg
                            className="w-[14px] h-[14px]"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </a>

                        {/* Twitter Icon (Unchanged) */}
                        <a
                          href="#"
                          className="w-[25px] h-[25px] bg-[#0089D0] rounded-xs flex items-center justify-center hover:bg-[#0379b5] transition-colors duration-200"
                          aria-label="Twitter"
                        >
                          <svg
                            className="w-[14px] h-[14px] fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>

                        {/* Email Icon (Unchanged) */}
                        <a
                          href="#"
                          className="w-[25px] h-[25px] bg-[#0089D0] rounded-xs flex items-center justify-center hover:bg-[#0379b5] transition-colors duration-200"
                          aria-label="Email"
                        >
                          <svg
                            className="w-[14px] h-[14px] fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* ✅ FIXED: Correctly aligned Close Button + Close Icon */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedIndex(null)}
                        className="lg:mt-2.5 mt-2  text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#293339]  transition-colors duration-200 hover:text-[#0089D0]"
                      >
                        CLOSE
                      </button>
                      {/* ✅ Variable name corrected from {close} to {closeicon} */}
                      <img
                        src={closeicon}
                        alt="Close Icon"
                        className="lg:w-7 lg:h-7 md:w-8 md:h-8 w-8 h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AboutPeopleData;