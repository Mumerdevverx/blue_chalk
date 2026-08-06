import React, { useState } from 'react';

// Import all team images
import teamOne from "../../assets/about/team/teamOne.jpg";
import teamOnes from "../../assets/about/team/teamOnes.jpg";
import teamTwo from "../../assets/about/team/teamTwo.jpg";
import teamTwos from "../../assets/about/team/teamTwos.jpg";
import teamThree from "../../assets/about/team/teamThree.jpg";
import teamThrees from "../../assets/about/team/teamThrees.jpg";
import teamFour from "../../assets/about/team/teamFour.jpg";
import teamFours from "../../assets/about/team/teamFours.jpg";

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
      description: "Greg Moyer founded Blue Chalk Media in 2013 with a vision to create compelling, cinematic nonfiction content that resonates with audiences worldwide. Under his leadership, the company has grown into an award-winning production house known for its authentic storytelling and human-centered approach."
    },
    {
      id: 2,
      name: "Pam Huling",
      pronouns: "(She/Her)",
      position: "CHIEF REVENUE OFFICER",
      image: teamTwo,
      hoverImage: teamTwos,
      description: "Pam Huling is chief revenue officer and co-founder of Blue Chalk, where she drives business development and strategic partnerships. With a background in media sales and production, Pam has been instrumental in building the company's diverse client roster and expanding its global reach."
    },
    {
      id: 3,
      name: "Mariko Fujinaka",
      pronouns: "(She/Her)",
      position: "Post-Production Manager",
      image: teamThree,
      hoverImage: teamThrees,
      description: "Mariko Fujinaka joined Blue Chalk in 2018 and brings a wealth of experience in documentary writing and post-production. Her keen eye for detail and narrative structure has elevated countless projects, from branded content to feature-length documentaries."
    },
    {
      id: 4,
      name: "Natalie Taylor",
      pronouns: "(She/Her)",
      position: "EXECUTIVE PRODUCER",
      image: teamFour,
      hoverImage: teamFours,
      description: "Natalie Taylor is an executive producer who has been with Blue Chalk since 2014. With over a decade of experience in nonfiction production, Natalie oversees complex projects from concept to completion, ensuring each story is told with integrity and impact."
    }
  ];

  const handleToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className='bg-[#F5F4F2] py-[40px] sm:py-[50px] md:py-[60px]'>
      <section className="w-full max-w-[1155px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[30px] sm:mb-[40px] md:mb-[50px]">
          Meet the Teams
        </h2>

        {/* Grid layout for responsive team members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-[40px] sm:gap-y-[50px] md:gap-y-[60px]">
          {teamMembers.map((member, index) => {
            return (
              <div key={member.id} className="text-center">
                {/* Image - Centered */}
                <div
                  onClick={() => handleToggle(index)}
                  className="group w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] xl:w-[260px] xl:h-[260px] rounded-full overflow-hidden cursor-pointer mx-auto transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:hidden"
                    loading="lazy"
                    onError={(e) => {
                      console.error("❌ Image failed to load:", member.image);
                      e.target.src = 'https://via.placeholder.com/200?text=Team+Member';
                    }}
                  />
                  <img
                    src={member.hoverImage}
                    alt={member.name}
                    className="w-full h-full object-cover hidden group-hover:block"
                    loading="lazy"
                    onError={(e) => {
                      console.error("❌ Hover image failed to load:", member.hoverImage);
                      e.target.src = 'https://via.placeholder.com/200?text=Team+Member';
                    }}
                  />
                </div>

                {/* Name and Pronouns */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mt-3 sm:mt-4 px-2">
                  <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-[#0089D0] font-normal">
                    {member.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-[#0089D0] font-normal">
                    {member.pronouns}
                  </p>
                </div>

                {/* Position */}
                <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] tracking-[2px] sm:tracking-[3px] text-[#152B3D] uppercase px-2">
                  {member.position}
                </p>

                {/* Details - Shows when clicked */}
                {selectedIndex === index && (
                  <div className="mt-4 text-left px-2 sm:px-3 md:px-4">
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.65] text-[#152B3D]">
                      {member.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-[#152B3D]">
                        CONTACT / FOLLOW:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3">
                        <a href="#" className="text-[#0089D0] hover:underline text-xs sm:text-sm transition-colors duration-200 hover:text-blue-700">LinkedIn</a>
                        <a href="#" className="text-[#0089D0] hover:underline text-xs sm:text-sm transition-colors duration-200 hover:text-blue-700">Twitter</a>
                        <a href="#" className="text-[#0089D0] hover:underline text-xs sm:text-sm transition-colors duration-200 hover:text-blue-700">Instagram</a>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="mt-4 text-[12px] sm:text-[13px] font-semibold text-[#0089D0] hover:underline transition-colors duration-200 hover:text-blue-700"
                    >
                      CLOSE
                    </button>
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