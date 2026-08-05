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
      position: "CHIEF REVENUE OFFICER ",
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
    <div className='bg-[#F5F4F2] py-[60px]'>
      <section className="w-full max-w-[1155px] px-4 md:px-20">
        <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[50px]">
          Meet the Teams
        </h2>

        {/* Equal distribution with flex */}
        <div className="flex justify-between items-start gap-x-4 md:gap-x-8 lg:gap-x-12">
          {teamMembers.map((member, index) => {
            return (
              <div key={member.id} className="flex-1 text-center">
                {/* Image - Centered */}
                <div
                  onClick={() => handleToggle(index)}
                  className="group w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden cursor-pointer mx-auto"
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

                <div className="flex items-center justify-center gap-2 mt-4">
  <h3 className="text-[18px] md:text-[20px] lg:text-[23px] text-[#0089D0] font-normal">
    {member.name}
  </h3>

  <p className="text-[14px] md:text-[20px] text-[#0089D0]  mt-1 font-normal">
    {member.pronouns}
  </p>
</div>

                {/* Position - Below pronouns */}
                <p className="mt-1 text-[10px] md:text-[11px] tracking-[3px] text-[#152B3D]">
                  {member.position}
                </p>

                {/* Details - Shows when clicked */}
                {selectedIndex === index && (
                  <div className="mt-4 text-left  p-4 ">
                    <p className="text-[14px] md:text-[16px] leading-[1.65] text-[#152B3D]">
                      {member.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[14px] md:text-[16px] font-semibold text-[#152B3D]">
                        CONTACT / FOLLOW:
                      </p>
                      <div className="flex justify-center gap-4 mt-3">
                        <a href="#" className="text-[#0089D0] hover:underline text-sm">LinkedIn</a>
                        <a href="#" className="text-[#0089D0] hover:underline text-sm">Twitter</a>
                        <a href="#" className="text-[#0089D0] hover:underline text-sm">Instagram</a>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedIndex(null)}
                      className="mt-4 text-[13px] font-semibold text-[#0089D0] hover:underline"
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