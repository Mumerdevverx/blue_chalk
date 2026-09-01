import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import awardOne from "../../assets/about/award/awardOne.jpg";
import awardTwo from "../../assets/about/award/awardTwo.jpg";
import awardThree from "../../assets/about/award/awardThree.jpg";

// Fallback static awards (same as original)
const fallbackAwards = [
  { title: "Addy Awards", image: awardOne, slug: "addy-awards" },
  { title: "Davey Awards", image: awardTwo, slug: "davey-awards" },
  { title: "Northwest Regional Emmys", image: awardThree, slug: "northwest-regional-emmys" },
  { title: "AdWeek Arc Awards", image: awardOne, slug: "adweek-arc-awards" },
  { title: "DC Environmental Film Festival", image: awardTwo, slug: "dc-environmental-film-festival" },
  { title: "NYX Video Awards", image: awardThree, slug: "nyx-video-awards" },
];

const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/50x50?text=No+Image';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const AboutAwards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/awards');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setAwards(data.data);
        } else {
          setAwards(fallbackAwards);
        }
      } catch (error) {
        console.error('Error fetching awards:', error);
        setAwards(fallbackAwards);
      }
      setLoading(false);
    };
    fetchAwards();
  }, []);

  if (loading) {
    return (
      <section className="w-full max-w-[1200px] mx-auto mt-[110px] md:mt-[140px] pb-6 lg:px-0 md:px-13 px-7 sm:px-6 md:px-0">
        <div className="text-center py-10">Loading awards...</div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[110px] md:mt-[140px] pb-6 lg:px-0 md:px-13 px-7 sm:px-6 md:px-0">
      <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#293339] mb-[20px] sm:mb-[25px] md:mb-[20px]">
        Awards
      </h2>
      <p className="text-[15px] md:text-[15px] lg:text-[15px] leading-[1.49] text-[#9EA5BB]">
        Blue Chalk Media has been honored with numerous <br /> awards including:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[30px] sm:mt-[40px] md:mt-[30px] gap-[20px] sm:gap-[25px] md:gap-[30px]">
        {awards.map((award, index) => (
          <div
            key={award._id || index}
            className="border-t border-[#D9D9D9] pt-2.5 flex items-center justify-between min-h-[60px] sm:min-h-[65px] md:min-h-[70px] transition-colors duration-200 px-2 sm:px-3 md:px-0"
          >
            <h3 className="text-[18px] md:text-[18px] font-bold text-[#0089D0] flex-1 pr-2">
              <Link
                to={`/awardpage/${award.slug}`}
                className="hover:border-b border-[#0089D0] transition-all duration-200 pb-0.5"
              >
                {award.title}
              </Link>
            </h3>
            <img
              src={getImageUrl(award.image)}
              alt={award.title}
              className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] object-contain flex-shrink-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutAwards;