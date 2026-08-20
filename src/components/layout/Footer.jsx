import React, { useState, useEffect } from "react";
import bluetwitter from "../../assets/footerlogo/bluetwitter.svg";
import facebook from "../../assets/footerlogo/facebook.svg";
import instagram from "../../assets/footerlogo/instagram.svg";
import mail from "../../assets/footerlogo/mail.svg";
import phone from "../../assets/footerlogo/phone.svg";
import whitetwitter from "../../assets/footerlogo/whitetwitter.svg";

// ✅ FALLBACK DATA (agar API fail ho)
const fallbackFooter = {
  address: {
    street: "68 Jay Street Suite 201",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11201",
    fullAddress: "68 Jay Street Suite 201, Brooklyn, NY 11201",
  },
  phone: "347.410.8445",
  email: "hello@bluechalk.com",
  socialLinks: {
    twitter: "https://x.com/BlueChalkMedia",
    facebook: "https://www.facebook.com/BlueChalkMedia",
    instagram: "https://www.instagram.com/bluechalkmedia",
    emailLink: "https://bluechalk.com/contact/",
  },
  footerLinks: {
    privacyPolicy: "/privacy-policy",
    termsOfUse: "/terms-of-use",
    copyrightText: "© 2026 Blue Chalk Media",
  },
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FOOTER DATA FROM API
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/footer");
        const data = await response.json();
        if (data.success) {
          setFooterData(data.data);
        } else {
          setFooterData(fallbackFooter);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching footer:", error);
        setFooterData(fallbackFooter);
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <footer className="w-full bg-[#263238] text-[#bdbdbd] py-10 text-center">
        <p className="text-[#C2BBB6]">Loading footer...</p>
      </footer>
    );
  }

  // ✅ Agar data nahi aaya toh fallback use karo
  const data = footerData || fallbackFooter;

  return (
    <footer className="w-full bg-[#263238] text-[#bdbdbd]">
      <div className="max-w-[1170px] lg:ml-18 min-h-[270px] lg:px-7 px-7 py-[40px] md:px-14 flex flex-col md:flex-row justify-between">
        {/* Left Side */}
        <div className="mb-0 md:mb-0">
          {/* ✅ DYNAMIC ADDRESS */}
          <div className="text-[16px] mt-8 leading-[23px] text-[#C2BBB6]">
            <p>{data.address?.street}</p>
            <p>
              {data.address?.city}, {data.address?.state} {data.address?.zipCode}
            </p>
          </div>

          {/* ✅ DYNAMIC PHONE */}
          <div className="flex items-center mt-[32px] gap-3">
            <img src={phone} alt="Phone" className="w-[16px] h-[16px]" />
            <span className="text-[16px] text-[#C2BBB6]">{data.phone}</span>
            <img src={whitetwitter} alt="Phone" className="w-[16px] h-[16px]" />
          </div>

          {/* ✅ DYNAMIC EMAIL */}
          <div className="flex items-center lg:mt-[24px] max-sm:mt-2 gap-3">
            <img src={mail} alt="Email" className="w-[16px] h-[16px]" />
            <a
              href={`mailto:${data.email}`}
              className="text-[#049bd7] text-[16px] hover:underline"
            >
              {data.email}
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col mt-4 md:mt-8 items-start md:items-start mr-0 lg:mr-[180px]">
          {/* ✅ DYNAMIC LINKS */}
          <div className="text-[14px] max-sm:w-[70%] text-[#777f83] flex flex-wrap items-center">
            <a
              href={data.footerLinks?.privacyPolicy || "/privacy-policy"}
              className="hover:text-[#4d8baa] hover:underline"
            >
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a
              href={data.footerLinks?.termsOfUse || "/terms-of-use"}
              className="hover:text-[#4d8baa] hover:underline"
            >
              Terms of Use
            </a>
            <span className="mx-2">|</span>
            <span>{data.footerLinks?.copyrightText || "© 2026 Blue Chalk Media"}</span>
          </div>

          {/* ✅ DYNAMIC SOCIAL ICONS */}
          <div className="flex items-center mt-7 gap-3">
            {data.socialLinks?.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={bluetwitter}
                  alt="Twitter"
                  className="w-[16px] h-[16px] hover:opacity-80 transition"
                />
              </a>
            )}
            {data.socialLinks?.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-[16px] h-[16px] hover:opacity-80 transition"
                />
              </a>
            )}
            {data.socialLinks?.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-[16px] h-[16px] hover:opacity-80 transition"
                />
              </a>
            )}
            {data.socialLinks?.emailLink && (
              <a
                href={data.socialLinks.emailLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={mail}
                  alt="Email"
                  className="w-[16px] h-[16px] hover:opacity-80 transition"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;