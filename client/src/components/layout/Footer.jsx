import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#263238] text-[#bdbdbd]">
      <div className="max-w-[1170px] mx-auto min-h-[270px] px-6 py-[78px] flex justify-between">
        
        {/* Left Side */}
        <div>
          {/* Address */}
          <div className="text-[15px] leading-[23px] text-[#c5c5c5]">
            <p>68 Jay Street Suite 201</p>
            <p>Brooklyn, NY 11201</p>
          </div>

          {/* Phone */}
          <div className="flex items-center mt-[32px] gap-3">
            <FaPhoneAlt
              className="text-[#c5c5c5] text-[14px]"
              style={{ transform: "rotate(90deg)" }}
            />

            <span className="text-[15px] text-[#c5c5c5]">
              347.410.8445
            </span>

            <FaPhoneAlt
              className="ml-[15px] text-[#c5c5c5] text-[14px]"
              style={{ transform: "rotate(90deg)" }}
            />
          </div>

          {/* Email */}
          <div className="flex items-center mt-[24px] gap-3">
            <FaEnvelope className="text-[#049bd7] text-[15px]" />

            <a
              href="mailto:hello@bluechalk.com"
              className="text-[#049bd7] text-[15px] hover:underline"
            >
              hello@bluechalk.com
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-start mr-[180px]">
          
          {/* Links */}
          <div className="text-[14px] text-[#777f83]">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <span className="mx-2">|</span>

            <a href="#" className="hover:text-white">
              Terms of Use
            </a>

            <span className="mx-2">|</span>

            <span>© 2026 Blue Chalk Media</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-[12px] mt-[30px]">
            <a href="#" className="text-[#049bd7] text-[15px]">
              <FaTwitter />
            </a>

            <a href="#" className="text-[#049bd7] text-[15px]">
              <FaFacebookF />
            </a>

            <a href="#" className="text-[#049bd7] text-[15px]">
              <FaInstagram />
            </a>

            <a href="#" className="text-[#049bd7] text-[15px]">
              <FaEnvelope />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;