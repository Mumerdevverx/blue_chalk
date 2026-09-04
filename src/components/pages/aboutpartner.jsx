import React, { useState, useRef, useEffect } from "react";
import { MdCloudDone, MdEmail } from "react-icons/md";
import { MdHelpOutline, MdMoreVert } from "react-icons/md";
 
const Partners = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const options = [
    "Saw something about you on social media",
    "Discovered your website",
    "Saw an ad",
    "Saw you speak at an industry event",
    "A friend told me about you",
    "I know someone who works for you",
  ];
 
  // Handler functions
  const handleNext = () => {
    console.log("Next clicked");
  };
 
  const handleClear = () => {
    console.log("Clear form clicked");
  };
 
  const handleMoreOptions = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <div className="mt-28 lg:px-25.5 md:px-13 px-7">
      <h1 className="text-[36px] md:text-[36px] lg:text-[36px] leading-[1.2] font-basis-web text-[#293339]">
        Partners
      </h1>
      <div className="px-4 h-[calc(100vh-10px)] overflow-y-scroll ">
        <div className="max-w-xl mt-17">
          <div className="bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-gray-300 shadow-sm overflow-hidden">
            {/* Header Content */}
            <div className="px-6 sm:px-8 mb-2">
              <h1 className="lg:text-[32px] sm:text-4xl font-basis-web text-gray-900 tracking-tight">
                Like Blue Chalk? We like you, too.
              </h1>
 
              <p className="mt-3 lg:text-[15px] text-black leading-relaxed font-basis-web">
                Tell us a little more about yourself. We'll be in touch if an
                opportunity to collaborate comes up.
              </p>
 
              <p className="mt-3 mb-4 lg:text-[15px] text-black leading-relaxed font-basis-web ">
                Fine print: By submitting this form you agree to be added to the
                Blue Chalk newsletter.
              </p>
            </div>
 
            {/* Account Info Section */}
            {/* Account Info Section */}
            <div className="px-6 sm:px-8 py-4 bg-gray-50/50 border-t border-gray-300 gap-2 text-sm text-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-gray-500 break-all">
                    talhaasif0077@gmail.com
                  </span>
                  <button
                    type="button"
                    className="text-indigo-500 underline font-medium focus:outline-none focus:underline whitespace-nowrap"
                  >
                    Switch accounts
                  </button>
                </div>
                <div
                  className="flex items-center gap-1 text-gray-400"
                  title="All changes saved in Drive"
                >
                  <MdCloudDone className="text-lg text-gray-500" />
                </div>
              </div>
 
              <div
                className="flex items-center mt-2 gap-1.5 text-xs text-gray-500"
                title="Your email is not shared"
              >
                <MdEmail className="text-base text-gray-400 text-[18px]" />
                <span className="text-[14px] text-gray-700">Not shared</span>
              </div>
            </div>
 
            {/* Required Field Notice */}
            <div className="px-6 sm:px-8 py-3 bg-white border-t border-gray-300 flex items-center justify-between lg:text-[14px]">
              <span className="text-red-500 font-normal">
                * Indicates required question
              </span>
            </div>
          </div>
        </div>
 
        <div className="max-w-xl my-8 space-y-4">
          {/* First Name Question Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Last Name Question Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Email Question Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="email"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
 
        <div className="max-w-xl my-8 space-y-4">
          {/* Phone Question Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="tel"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Website Question Card with Subtitle */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-900">
                Website
              </label>
              <p className="text-sm text-black mt-1">
                Please include http://...
              </p>
            </div>
            <div className="relative w-full sm:w-2/3">
              <input
                type="url"
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Home Country Question Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Home Country <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Home City */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Home City <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                required
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Home State */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900">
              Home State
            </label>
            <p className="text-sm text-black mt-1">If based in the U.S.</p>
            <div className="relative w-full sm:w-2/3 mt-6">
              <input
                type="text"
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
 
        <div className="max-w-xl my-8 space-y-4">
          {/* How did you hear about us? Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
 
            <div className="space-y-4">
              {options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="radio"
                    name="hearAboutUs"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-5 h-5 text-indigo-700 border-gray-300 focus:ring-indigo-600 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">
                    {option}
                  </span>
                </label>
              ))}
 
              {/* Other Option with Text Input */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="radio"
                  name="hearAboutUs"
                  value="Other"
                  checked={selectedOption === "Other"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-5 h-5 text-indigo-700 border-gray-300 focus:ring-indigo-600 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm sm:text-base text-gray-700">
                    Other:
                  </span>
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      setSelectedOption("Other");
                    }}
                    className="flex-1 pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>
 
          {/* Referred by Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 sm:p-8">
            <label className="block text-base font-medium text-gray-900 mb-6">
              Referred by
            </label>
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Your answer"
                className="w-full pb-1 text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:border-indigo-700 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
 
          {/* Action Buttons Section */}
          <div className="max-w-2xl mx-auto my-8 space-y-6">
            {/* Action Buttons Row */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-[#777777] font-medium text-sm rounded border border-gray-300"
              >
                Next
              </button>
 
              <button
                type="button"
                onClick={handleClear}
                className="text-[#777777] hover:bg-gray-200 py-2.5 px-1 font-medium text-sm focus:outline-none focus:underline"
              >
                Clear form
              </button>
            </div>
 
            {/* Security Warning */}
            <p className="text-xs text-gray-500">
              Never submit passwords through Google Forms.
            </p>
 
            {/* Google Forms Branding Footer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <MdHelpOutline className="text-base text-gray-400 text-[24px]" />
                <span className="lg:text-[13px] font-semibold tracking-wide text-gray-700">
                  Google Forms
                </span>
              </div>
 
              <span className="text-gray-900 text-center flex-1 px-4 truncate">
                This form was created inside Blue Chalk Media.
              </span>
 
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={handleMoreOptions}
                  className="text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                  title="More options"
                >
                  <MdMoreVert className="text-lg" />
                </button>
 
                {/* Popup Menu */}
                {isOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-56 bg-white rounded shadow-lg border border-gray-200 py-2 z-50 text-sm">
                    <a
                      href="#report-abuse"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2.5 underline text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Report abuse
                    </a>
                    <a
                      href="#terms"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2.5 underline text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2.5 underline text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Partners;
 