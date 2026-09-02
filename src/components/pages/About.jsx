import React, { useRef, useState, useEffect } from "react";
import peoples from "../../assets/peoples.jpg";
import aboutvideo from "../../assets/aboutvideo.mp4";
import AboutAwards from "./AboutAwards";
import AboutPeopleData from "./AboutPeopleData";

// ✅ Helper for image URL
const getImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/600x400?text=No+Image';
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // State for dynamic data
  const [aboutData, setAboutData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback static data (design ke hisaab se)
  const fallbackAbout = {
    aboutUsText: "Blue Chalk Media is an award-winning, full-service production company and creative agency widely recognized for our signature cinematic nonfiction style and authentic expression of the human experience.",
    aboutUsRightText: "television networks, advertising agencies, healthcare organizations, nonprofits and editorial thought leaders.",
    onAssignmentTitle: "Blue Chalk On Assignment",
    onAssignmentText: "From Asia to Europe—scroll through some of the images we've captured while on assignment around the world.",
    services: ["Television and video production", "Podcasting", "Documentary Filmmaking", "Post-Production", "Motion Graphics"],
    careersText: "We're always looking to work with people who share our values—people who are both talented individuals and excellent collaborators. If you don't see a job listing below that suits your skill set, please fill out our creative partners interest form to let us know more about your background and skills. And don't forget to follow us on social media to be the first to know about job new openings.",
    videoUrl: ""
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, galleryRes, clientsRes] = await Promise.all([
          fetch('http://localhost:5000/api/about'),
          fetch('http://localhost:5000/api/gallery'),
          fetch('http://localhost:5000/api/clients')
        ]);
        const aboutJson = await aboutRes.json();
        const galleryJson = await galleryRes.json();
        const clientsJson = await clientsRes.json();

        if (aboutJson.success) setAboutData(aboutJson.data);
        if (galleryJson.success) setGalleryImages(galleryJson.data);
        if (clientsJson.success) setClientLogos(clientsJson.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const about = aboutData || fallbackAbout;
  const images = galleryImages.length > 0 ? galleryImages : [];
  const logos = clientLogos.length > 0 ? clientLogos : [];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full pt-[70px] px-0 sm:px-0 md:px-0 lg:px-0.5">
      {/* VIDEO */}
      <div className="w-full flex items-center justify-center lg:px-0 md:px-13 px-7">
        <div
          className="relative w-full max-w-[1200px] overflow-hidden cursor-pointer"
          onClick={!isPlaying ? handlePlay : undefined}
        >
          {!isPlaying && (
            <img src={peoples} alt="About" className="w-full h-auto object-contain" />
          )}
          <video
            ref={videoRef}
            src={about.videoUrl || aboutvideo}
            controls={isPlaying}
            playsInline
            className={`w-full h-auto object-contain ${isPlaying ? "block" : "hidden"}`}
          />
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

      {/* ABOUT US */}
      <section className="w-full max-w-[1200px] mx-auto mt-[40px] sm:mt-[50px] md:mt-[35px] lg:px-0 md:px-13 px-7">
        <h1 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] sm:leading-[43px] text-[#293339] mb-[20px] sm:mb-[25px] md:mb-[20px]">
          About Us
        </h1>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0 md:gap-x-[80px]">

  {/* Left Side */}
  <div className="text-[18px] leading-[1.55] text-[#152B3D]">
    {about.aboutUsText.split('\n').map((para, idx) => (
      <p key={idx} className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
        {para}
      </p>
    ))}
  </div>

  {/* Right Side */}
  <div className="text-[18px] leading-[1.55] whitespace-pre-wrap text-[#152B3D]">
    {about.aboutUsRightText.split('\n').map((para, idx) => (
      <p key={idx} className="mb-[20px] sm:mb-[24px] md:mb-[28px]">
        {para}
      </p>
    ))}
  </div>

</div>

        {/* ON ASSIGNMENT */}
        <div className="mt-[90px] md:mt-[65px] lg:mt-[85px] max-sm:mb-10">
          <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-bgw-400 text-[#152B3D] mb-[15px] sm:mb-[20px] md:mb-[25px]">
            {about.onAssignmentTitle}
          </h2>
          <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D] font-bgw-400">
            {about.onAssignmentText.split('\n')[0]}
          </p>
          {about.onAssignmentText.split('\n').length > 1 && (
            <p className="text-[18px] md:text-[18px] lg:text-[18px] leading-[1.55] text-[#152B3D] font-bgw-400">
              {about.onAssignmentText.split('\n')[1]}
            </p>
          )}
        </div>
      </section>

      {/* 9 IMAGE GALLERY */}
      <div className="w-full mt-[30px] sm:mt-[40px] md:mt-[50px] overflow-hidden">
        <div className="flex flex-wrap sm:flex-nowrap w-full h-[200px] sm:h-[280px] md:h-[380px]">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={img._id || index}
                className="relative h-full flex-1 min-w-[50px] sm:min-w-0 overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[4]"
              >
                <img
                  src={getImageUrl(img.imageUrl)}
                  alt={img.title || `Assignment ${index + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            // Fallback: show static images (if you want to keep them)
            Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="relative h-full flex-1 min-w-[50px] sm:min-w-0 overflow-hidden bg-gray-200"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SERVICES */}
      <section className="w-full max-w-[1200px] mx-auto mt-[50px] sm:mt-[60px] md:mt-[80px] lg:px-0 md:px-13 px-7">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[20px] sm:mb-[25px] md:mb-[30px]">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] sm:gap-x-[50px] md:gap-x-[80px]">

  {/* Left Column */}
  <div>
    {about.services.slice(0, 3).map((service, idx) => (
      <p
        key={idx}
        className="text-[18px] whitespace-pre-wrap leading-[1.55] text-[#152B3D]"
      >
        {service}
      </p>
    ))}
  </div>

  {/* Right Column */}
  <div>
    {about.services.slice(3).map((service, idx) => (
      <p
        key={idx}
        className="text-[18px] whitespace-pre-wrap leading-[1.55] text-[#152B3D]"
      >
        {service}
      </p>
    ))}
  </div>

</div>
      </section>

      {/* CLIENTS & PARTNERS */}
      <section className="w-full mx-auto lg:px-25 mt-[50px] sm:mt-[60px] md:mt-[80px] md:px-13 px-7">
        <h2 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[30px] sm:mb-[40px] md:mb-[50px]">
          Blue Chalk Clients & Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-10">
          {logos.length > 0 ? (
            logos.map((logo, index) => (
              <div
                key={logo._id || index}
                className="flex items-center justify-center p-2 sm:p-3 md:p-4 lg:mr-0 md:mr-10 mr-0 bg-white rounded-lg transition-shadow duration-300"
              >
                <img
                  src={getImageUrl(logo.imageUrl)}
                  alt={logo.name || `Client ${index + 1}`}
                  className="w-full h-[110px] md:h-[110px] lg:h-[140px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150x100?text=Logo";
                  }}
                />
              </div>
            ))
          ) : (
            // Fallback to static logos? Could keep empty or show placeholder.
            <div className="col-span-full text-center text-gray-400">No clients added yet</div>
          )}
        </div>
      </section>

      {/* AWARDS */}
      <AboutAwards />

      {/* MEET THE TEAM */}
      <AboutPeopleData />

      {/* CAREERS */}
      <section className="w-full max-w-[1200px] mx-auto mt-[60px] md:mt-[76px] lg:mt-[60px] pb-[60px] md:pb-[50px] lg:pb-[60px] lg:px-0 md:px-13 px-7">
        <h2 className="text-[36px] md:text-[32px] lg:text-[36px] leading-[1.2] font-normal text-[#152B3D] mb-[40px] sm:mb-[50px] md:mb-[75px]">
          Careers
        </h2>
        <div className="max-w-full md:max-w-[550px] text-[16px] md:text-[16px] lg:text-[16px] leading-[1.5] text-[#8C9BA8]">
          {about.careersText.split('\n').map((para, idx) => (
            <p key={idx} className="mb-[25px] sm:mb-[35px] md:mb-[45px]">
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;