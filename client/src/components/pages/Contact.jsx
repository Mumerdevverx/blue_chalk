import React from "react";

const Contact = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto py-6 mt-20 px-7 lg:px-9 md:px-12">
        <h1 className="font-basis-web leading-[43px] text-[36px] font-semibold text-[#293339]">
          Contact Us
        </h1>
      </div>

      {/* Maps Section - Mobile: Stacked, Desktop: Side by Side */}
      <div className="flex flex-col font-basis-web md:grid md:grid-cols-2">
        {/* LEFT SIDE: Brooklyn Map */}
        <div className="w-full">
          <div className="h-[300px] sm:h-[400px] md:h-[450px] bg-gray-200 relative overflow-hidden">
            <div className="map-wrapper w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.1234567890!2d-73.9876543!3d40.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7a1b7%3A0x1234567890abcdef!2s68%20Jay%20St%20%23201%2C%20Brooklyn%2C%20NY%2011201!5e0!3m2!1sen!2sus!4v1234567890"
                className="w-full h-full"
                loading="lazy"
                title="Brooklyn Office Map"
              />
            </div>
          </div>

          {/* Brooklyn Address - Below Map on Mobile, Side by Side on Desktop */}
          <div className="px-7 lg:px-25 md:px-12 py-10 md:py-12 lg:mb-20 md:mb-20 mb-20 ">
            <h2 className="text-[24px] leading-[29px] font-basis-web text-[#293339] hover:text-[#1893D2] mb-3">
              Blue Chalk Brooklyn
            </h2>
            <div className="text-[15px] leading-[28px] text-[#293339]">
              <p>68 Jay Street Suite 201</p>
              <p>Brooklyn, NY 11201</p>

              {/* Email */}
              <div className="flex items-center gap-3.5 pt-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5"
                >
                  <path
                    d="M10,0 C15.5078125,0 20,4.4921875 20,10 C20,15.5371094 15.5078125,20 10,20 C4.46289062,20 0,15.5371094 0,10 C0,4.4921875 4.46289062,0 10,0 Z M10,10.8789062 L16.25,6.20117188 C16.25,5.76171875 15.8984375,5.41992188 15.4589844,5.41992188 L4.54101562,5.41992188 C4.1015625,5.76171875 3.75,5.76171875 3.75,6.20117188 L10,10.8789062 Z M16.25,13.7988281 L16.25,7.82226562 L10,12.5 L3.75,7.82226562 L3.75,13.7988281 C3.75,14.2382812 4.1015625,14.5800781 4.54101562,14.5800781 L15.4589844,14.5800781 C15.8984375,14.5800781 16.25,14.2382812 16.25,13.7988281 Z"
                    fill="#1893D2"
                  />
                </svg>

                <a
                  href="mailto:hello@bluechalk.com"
                  className="text-blue-600 hover:underline break-all"
                >
                  hello@bluechalk.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3.5 lg:pt-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5"
                >
                  <path
                    d="M10,0 C15.5273438,0 20,4.47265625 20,10 C20,15.5273438 15.5273438,20 10,20 C4.47265625,20 0,15.5273438 0,10 C0,4.47265625 4.47265625,0 10,0 Z M5.40039062,15.859375 C10.8789062,15.2539062 15.2441406,10.9667969 15.859375,5.40039062 L12.5878906,4.1015625 L10.8105469,7.64648438 L12.4902344,9.32617188 C11.6894531,10.6054688 10.6054688,11.6894531 9.32617188,12.4902344 L7.64648438,10.8105469 L4.1015625,12.578125 L5.40039062,15.859375 Z"
                    fill="#1893D2"
                  />
                </svg>

                <a
                  href="tel:3474108445"
                  className="text-blue-600 hover:underline"
                >
                  347.410.8445
                </a>
              </div>
              <div className="lg:mt-7 border-b border-gray-200"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Portland Map */}
        <div className="w-full">
          <div className="h-[300px] sm:h-[400px] md:h-[450px] bg-gray-300 relative overflow-hidden">
            <div className="map-wrapper w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.1234567890!2d-122.6543210!3d45.5598765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a0a123456789%3A0x9876543210abcdef!2s1737%20NE%20Alberta%20St%20%23207%2C%20Portland%2C%20OR%2097211!5e0!3m2!1sen!2sus!4v1234567890"
                className="w-full h-full"
                loading="lazy"
                title="Portland Office Map"
              />
            </div>
          </div>

          {/* Portland Address - Below Map on Mobile, Side by Side on Desktop */}
          <div className="px-7 lg:px-12 xl:px-24 md:px-12 py-10 md:py-12 mb-5">
            <h2 className="text-[24px] leading-[29px] font-basis-web text-[#293339] mb-3">
              Blue Chalk Portland
            </h2>
            <div className="text-[15px] leading-[28px] text-[#293339]">
              <p>1737 NE Alberta, Suite 207</p>
              <p>Portland, OR 97211</p>

              <div className="flex items-center gap-3.5 pt-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5"
                >
                  <path
                    d="M10,0 C15.5078125,0 20,4.4921875 20,10 C20,15.5371094 15.5078125,20 10,20 C4.46289062,20 0,15.5371094 0,10 C0,4.4921875 4.46289062,0 10,0 Z M10,10.8789062 L16.25,6.20117188 C16.25,5.76171875 15.8984375,5.41992188 15.4589844,5.41992188 L4.54101562,5.41992188 C4.1015625,5.76171875 3.75,5.76171875 3.75,6.20117188 L10,10.8789062 Z M16.25,13.7988281 L16.25,7.82226562 L10,12.5 L3.75,7.82226562 L3.75,13.7988281 C3.75,14.2382812 4.1015625,14.5800781 4.54101562,14.5800781 L15.4589844,14.5800781 C15.8984375,14.5800781 16.25,14.2382812 16.25,13.7988281 Z"
                    fill="#1893D2"
                  />
                </svg>

                <a
                  href="mailto:hello@bluechalk.com"
                  className="text-blue-600 hover:underline break-all"
                >
                  hello@bluechalk.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Fully Responsive */}
      <div className="bg-[#F5F4F2] border-t font-basis-web border-gray-200 py-12 sm:py-16 lg:py-20 px-7 md:px-12 lg:px-25">
        <div className=" ">
          {/* Left Content */}

          <div>
            <h2 className="text-[36px] font-basis-web text-[#C2BBB6] leading-[43px] mb-4 lg:mb-4">
              Get Our Newsletter
            </h2>
          </div>
          <div className="lg:flex lg:items-center lg:justify-between ">
            <div className="">
              <p className="hidden lg:block text-base sm:text-lg lg:text-[15px] leading-[22px] text-[#9EA2AA] ">
                Subscribe to our newsletter <br />
                to keep up to date on new <br /> projects from Blue Chalk <br />{" "}
                Media.
              </p>
              <p className="lg:hidden block text-[15px] leading-[22px] text-[#9EA2AA]">
                Subscribe to our newsletter to keep up to date on new projects
                from Blue Chalk Media.
              </p>
            </div>
            <div className="lg:w-1/2 xl:w-3/4 w-full mt-6 lg:mt-0">
              <form>
                {/* Mobile only: 2-column layout (Name|Email, Title|Company) */}
                <div className="block md:hidden flex flex-col border border-[#e8e8e8] bg-white">
                  {/* Row 1: Name | Email */}
                  <div className="grid grid-cols-2 border-b border-[#e8e8e8]">
                    <input
                      type="text"
                      placeholder="Name*"
                      className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] outline-none text-sm sm:text-base border-r border-[#e8e8e8]"
                    />
                    <input
                      type="email"
                      placeholder="Email*"
                      className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Row 2: Title | Company */}
                  <div className="grid grid-cols-2">
                    <input
                      type="text"
                      placeholder="Title (optional)"
                      className="w-full h-[40px] px-4 sm:px-5 text-[#7F7F7F] outline-none text-sm sm:text-base border-r border-[#e8e8e8]"
                    />
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Subscribe Button - Full width on mobile only */}
                  <button
                    type="submit"
                    className="bg-[#1f93d1] text-white uppercase font-semibold hover:bg-[#167bb0] transition h-[46px] w-full text-[11px] leading-[11px]"
                  >
                    Subscribe
                  </button>
                </div>

                {/* Tablet & Desktop: Original 3-column layout */}
                <div className="hidden  md:grid md:grid-cols-[1fr_1fr_auto] border border-[#e8e8e8] bg-white lg:ml-4 ">
                  {/* Left Inputs */}
                  <div className="border-b md:border-b-0 md:border-r border-[#e8e8e8] ">
                    <input
                      type="text"
                      placeholder="Name*"
                      className="w-full lg:h-[46px] h-[38px]  px-5 outline-none text-sm sm:text-base text-[#363639] placeholder-[#363639] "
                    />

                    <div className="border-t border-[#e8e8e8]">
                      <input
                        type="text"
                        placeholder="Title (optional)"
                        className="w-full lg:h-[46px] h-[38px] px-5 outline-none text-sm sm:text-base text-[#7F7F7F]"
                      />
                    </div>
                  </div>

                  {/* Right Inputs */}
                  <div className="border-b md:border-b-0 md:border-r border-[#e8e8e8]">
                    <input
                      type="email"
                      placeholder="Email*"
                      className="w-full lg:h-[46px] h-[38px]  px-5 outline-none text-sm sm:text-base text-[#363639] placeholder-[#363639] "
                    />

                    <div className="border-t border-[#e8e8e8]">
                      <input
                        type="text"
                        placeholder="Company (optional)"
                        className="w-full lg:h-[46px] h-[38px]  px-5 outline-none text-sm sm:text-base text-[#7F7F7F]"
                      />
                    </div>
                  </div>

                  {/* Button - Inline on tablet and desktop */}
                  <button
                    type="submit"
                    className="bg-[#1f93d1] text-white uppercase font-semibold md:text-[11px] transition lg:h-[92px] h-[84px] w-full lg:w-[310px] md:w-[230px] px-6 sm:px-8 text-sm sm:text-base leading-[11px] hover:bg-white hover:text-[#1f93d1] hover:border hover:border-[#1f93d1] transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
