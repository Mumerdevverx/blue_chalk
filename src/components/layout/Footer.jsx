import React from "react";
import bluetwitter from "../../assets/footerlogo/bluetwitter.svg"
import facebook from "../../assets/footerlogo/facebook.svg"
import instagram from "../../assets/footerlogo/instagram.svg"
import mail from "../../assets/footerlogo/mail.svg"
import phone from "../../assets/footerlogo/phone.svg"
import whitetwitter from "../../assets/footerlogo/whitetwitter.svg"

const Footer = () => {
  return (
    <footer className="w-full bg-[#263238] text-[#bdbdbd]">
      <div className="max-w-[1170px] lg:ml-18 min-h-[270px] lg:px-7 px-7  py-[40px] md:px-14   flex flex-col md:flex-row justify-between">
        
        {/* Left Side */}
        <div className="mb-0 md:mb-0">
          {/* Address */}
          <div className="text-[16px] mt-8 leading-[23px] text-[#C2BBB6]">
            <p>68 Jay Street Suite 201</p>
            <p>Brooklyn, NY 11201</p>
          </div>

          {/* Phone */}
          <div className="flex items-center mt-[32px] gap-3">
            <img src={phone} alt="Phone" className="w-[16px] h-[16px]" />
            <span className="text-[16px] text-[#C2BBB6]">
              347.410.8445
            </span>
            <img src={whitetwitter} alt="Phone" className="w-[16px] h-[16px]" />
          </div>

          {/* Email */}
          <div className="flex items-center lg:mt-[24px] max-sm:mt-2 gap-3">
            <img src={mail} alt="Email" className="w-[16px] h-[16px]" />
            <a
              href="mailto:hello@bluechalk.com"
              className="text-[#049bd7] text-[16px] hover:underline"
            >
              hello@bluechalk.com
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col mt-4 md:mt-8 items-start md:items-start mr-0 lg:mr-[180px]">
          
          {/* Links */}
          <div className="text-[14px] max-sm:w-[70%] text-[#777f83] flex flex-wrap items-center">
            <a
              href="/privacy-policy"
              className="hover:text-[#4d8baa] hover:underline"
            >
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a
              href="/terms-of-use"
              className="hover:text-[#4d8baa] hover:underline"
            >
              Terms of Use
            </a>
            <span className="mx-2">|</span>
            <span>© 2026 Blue Chalk Media</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center mt-7 gap-3">
            <a
              href="https://x.com/BlueChalkMedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={bluetwitter}
                alt="Twitter"
                className="w-[16px] h-[16px]"
              />
            </a>
            <a
              href="https://www.facebook.com/BlueChalkMedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Facebook"
                className="w-[16px] h-[16px]"
              />
            </a>
            <a
              href="https://www.instagram.com/bluechalkmedia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram}
                alt="Instagram"
                className="w-[16px] h-[16px]"
              />
            </a>
            <a
              href="https://bluechalk.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={mail}
                alt="Email"
                className="w-[16px] h-[16px]"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;