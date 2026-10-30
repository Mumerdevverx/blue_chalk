import React, { useState, useEffect } from "react";
import closeicon from "../../assets/about/team/closeicon.svg";
import API_BASE_URL from "../../config/api";

// Fallback static team
const fallbackMembers = [
  {
    id: 1,
    name: "Greg Moyer",
    pronouns: "(He/Him)",
    position: "FOUNDER AND CEO",
    image: "https://via.placeholder.com/270x270?text=Greg",
    hoverImage: "https://via.placeholder.com/270x270?text=Greg+BW",
    description: "Greg Moyer founded Blue Chalk Media in 2013 with a vision to create compelling, cinematic nonfiction content that resonates with audiences worldwide. Under his leadership, the company has grown into an award-winning production house known for its authentic storytelling and human-centered approach.",
  },
  // ... other fallback members if needed
];

const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/270x270?text=Team+Member';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url}`;
};

const AboutPeopleData = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/team`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const sortedMembers = [...data.data].sort((first, second) => {
            const priority = (name) => {
              const normalizedName = name?.trim().toLowerCase();
              if (normalizedName === "greg moyer") return 0;
              if (normalizedName === "pam huling") return 1;
              return 2;
            };
            const priorityDifference = priority(first.name) - priority(second.name);
            if (priorityDifference !== 0) {
              return priorityDifference;
            }

            const firstOrder = Number(first.order);
            const secondOrder = Number(second.order);
            const firstHasOrder = Number.isFinite(firstOrder);
            const secondHasOrder = Number.isFinite(secondOrder);

            if (firstHasOrder && secondHasOrder) {
              return firstOrder - secondOrder;
            }

            if (firstHasOrder !== secondHasOrder) {
              return firstHasOrder ? -1 : 1;
            }

            return 0;
          });
          setMembers(sortedMembers);
        } else {
          setMembers(fallbackMembers);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
        setMembers(fallbackMembers);
      }
      setLoading(false);
    };
    fetchTeam();
  }, []);

  const handleToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="bg-[#F5F4F2] py-[40px] sm:py-[50px] md:py-[60px]">
        <div className="text-center py-10">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F4F2] py-[40px] sm:py-[50px] md:py-[60px]">
      <section className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 md:px-12 lg:px-0">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] max-sm:pl-4 md:pl-4 lg:pl-0 mb-[40px] md:mb-[60px] lg:mb-[50px]">
          Meet the Team
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-10 lg:gap-x-12 gap-y-[40px] sm:gap-y-[50px] md:gap-y-[60px]">
          {members.map((member, index) => {
            const imageSrc = getImageUrl(member.image);
            const hoverSrc = getImageUrl(member.hoverImage);
            return (
              <div key={member._id || index} className="text-center">
                <div
                  onClick={() => handleToggle(index)}
                  className="group relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] xl:w-[270px] xl:h-[270px] rounded-full overflow-hidden cursor-pointer mx-auto"
                >
                  <img
                    src={imageSrc}
                    alt={member.name}
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                    style={{ filter: "sepia(0.5) hue-rotate(180deg) saturate(5) opacity(0.6)" }}
                    loading="lazy"
                  />
                  <img
                    src={hoverSrc}
                    alt={member.name}
                    className="absolute inset-0 z-10 w-full h-full object-cover grayscale opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1 text-[#44A7D8] hover:text-[#078ed1] sm:gap-2 mt-3 sm:mt-4 px-2">
                  <h3 className="text-[18px] md:text-[24px] lg:text-[24px] md:leading-[24px] leading-[18px]   font-normal">
                    {member.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[24px] font-normal">
                    {member.pronouns}
                  </p>
                </div>
                <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11px] tracking-[2px] sm:tracking-[3px] text-[#152B3D] uppercase px-2">
                  {member.position}
                </p>

                {selectedIndex === index && (
                  <div className="mt-4 w-[calc(100%+16px)] sm:w-[calc(100%+24px)] md:w-[calc(100%+32px)] text-left">
                    <p className="text-[16px] md:text-[16px] lg:text-[16px] leading-[1.55] text-[#152B3D]">
                      {member.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-[11px] md:text-[11px] lg:text-[11px] leading-[28px] text-[#3C93D8]">
                        CONTACT / FOLLOW:
                      </p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-[25px] h-[25px] bg-[#0c9ce4] rounded-xs flex items-center justify-center hover:bg-[#56b9eb] transition-colors duration-200">
                            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="white"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-[25px] h-[25px] bg-[#1199DE] rounded-xs flex items-center justify-center hover:bg-[#56b9eb] transition-colors duration-200">
                            <svg className="w-[14px] h-[14px] fill-white" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="w-[25px] h-[25px] bg-[#1199DE] rounded-xs flex items-center justify-center hover:bg-[#56b9eb] transition-colors duration-200">
                            <svg className="w-[14px] h-[14px] fill-white" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" /></svg>
                          </a>
                        )}
                      </div>
                    </div>
                    <div 
                     onClick={() => setSelectedIndex(null)}
                    className="flex gap-2 mt-4 cursor-pointer">
                      <button
                       
                        className="lg:mt-2.5 mt-2 text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#293339] transition-colors duration-200 hover:text-[#0089D0]"
                      >
                        CLOSE
                      </button>
                      <img src={closeicon} alt="Close Icon" className="lg:w-7 lg:h-7 md:w-8 md:h-8 w-8 h-8" />
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