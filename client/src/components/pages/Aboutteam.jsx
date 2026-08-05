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

// DEBUG: Check if images are imported
console.log("✅ Images imported:", {
  teamOne,
  teamTwo,
  teamThree,
  teamFour
});

const AboutTeam = () => {
  console.log("🔥 AboutTeam component rendered!"); // DEBUG

  const [selectedIndex, setSelectedIndex] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Greg Moyer (He/Him)",
      position: "FOUNDER AND CEO",
      image: teamOne,
      hoverImage: teamOnes,
      description: "Greg Moyer founded Blue Chalk Media in 2013..."
    },
    {
      id: 2,
      name: "Pam Huling (She/Her)",
      position: "CHIEF REVENUE OFFICER AND CO-FOUNDER",
      image: teamTwo,
      hoverImage: teamTwos,
      description: "Pam Huling is chief revenue officer and co-founder of Blue Chalk..."
    },
    {
      id: 3,
      name: "Mariko Fujinaka (She/Her)",
      position: "SUPERVISING WRITER AND POST-PRODUCTION PRODUCER",
      image: teamThree,
      hoverImage: teamThrees,
      description: "Mariko Fujinaka joined Blue Chalk in 2018..."
    },
    {
      id: 4,
      name: "Natalie Taylor (She/Her)",
      position: "EXECUTIVE PRODUCER",
      image: teamFour,
      hoverImage: teamFours,
      description: "Natalie Taylor is an executive producer who has been with Blue Chalk since 2014..."
    }
  ];

  const handleToggle = (index) => {
    console.log("🖱️ Clicked member:", index); // DEBUG
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  // DEBUG: Check team members data
  console.log("📋 Team Members:", teamMembers);

  return (
    <section className="w-full max-w-[1155px] mx-auto px-4 md:px-20 py-[60px]">
      {/* DEBUG: Test if this shows */}
      <div className="bg-red-500 text-white p-4 mb-4">
        🔥 DEBUG: If you see this, the component is working!
      </div>

      <h2 className="text-[36px] md:text-[40px] font-normal text-[#152B3D] mb-[50px]">
        Meet the Teams {/* ← Change this text */}
      </h2>

      {/* DEBUG: Check if grid renders */}
      <div className="bg-yellow-200 p-2 mb-4">
        Grid should render below this line
      </div>

      {/* Grid with gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {teamMembers.map((member, index) => {
          console.log(`📸 Rendering member ${index}:`, member.name); // DEBUG
          
          return (
            <div key={member.id} className="text-center border-2 border-blue-500 p-4">
              {/* DEBUG: Member card border */}
              <div className="bg-green-200 text-xs mb-2">
                Member #{index + 1}
              </div>

              {/* Image */}
              <div
                onClick={() => handleToggle(index)}
                className="group w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden cursor-pointer mx-auto border-4 border-purple-500"
              >
                {/* DEBUG: Image alt text */}
                <div className="text-xs bg-black text-white p-1">
                  Image: {member.name}
                </div>
                
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:hidden"
                  loading="lazy"
                  onError={(e) => {
                    console.error("❌ Image failed to load:", member.image);
                    e.target.src = 'https://via.placeholder.com/200'; // Fallback image
                  }}
                  onLoad={() => {
                    console.log("✅ Image loaded:", member.name);
                  }}
                />
                <img
                  src={member.hoverImage}
                  alt={member.name}
                  className="w-full h-full object-cover hidden group-hover:block"
                  loading="lazy"
                  onError={(e) => {
                    console.error("❌ Hover image failed to load:", member.hoverImage);
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="mt-5 text-[20px] md:text-[23px] text-[#0089D0] font-normal">
                {member.name}
              </h3>

              {/* Position */}
              <p className="mt-1 text-[10px] md:text-[11px] tracking-[3px] text-[#152B3D]">
                {member.position}
              </p>

              {/* Details */}
              {selectedIndex === index && (
                <div className="mt-6 text-left bg-gray-100 p-4 rounded">
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#152B3D]">
                    {member.description.substring(0, 100)}... {/* Show only first 100 chars for testing */}
                  </p>

                  <div className="mt-6">
                    <p className="text-[16px] md:text-[17px] font-semibold text-[#152B3D]">
                      CONTACT / FOLLOW:
                    </p>
                    <div className="flex justify-center gap-5 mt-4">
                      <a href="#" className="text-[#0089D0] hover:underline">LinkedIn</a>
                      <a href="#" className="text-[#0089D0] hover:underline">Twitter</a>
                      <a href="#" className="text-[#0089D0] hover:underline">Instagram</a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="mt-5 text-[14px] font-semibold text-[#0089D0] hover:underline"
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
  );
};

export default AboutTeam;