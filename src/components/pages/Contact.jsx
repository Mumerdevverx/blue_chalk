import React, { useState, useEffect } from "react";
import Map, { Marker } from 'react-map-gl/mapbox'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import API_BASE_URL from "../../config/api";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  
  // Hover state (pin aur map colors ke liye zaroori hai)
  const [hoveredMap, setHoveredMap] = useState(null);

  // Map instances ko save karne ke liye states
  const [brooklynMap, setBrooklynMap] = useState(null);
  const [portlandMap, setPortlandMap] = useState(null);

  useEffect(() => {
    if (!newsletterMessage) return undefined;
    const timeoutId = window.setTimeout(() => {
      setNewsletterMessage("");
    }, 4000);
    return () => window.clearTimeout(timeoutId);
  }, [newsletterMessage]);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const visibleInputs = [...form.querySelectorAll("input")].filter(
      (input) => input.offsetParent !== null
    );
    const name = visibleInputs
      .find((input) => input.placeholder === "Name*")
      ?.value.trim();
    const email = visibleInputs
      .find((input) => input.placeholder === "Email*")
      ?.value.trim();

    if (!name) {
      setNewsletterMessage(
        "Please include an '@' in the email address. 'Email' is missing an '@'."
      );
      return;
    }
    if (!email) {
      setNewsletterMessage(
        "Please include an '@' in the email address. 'Email' is missing an '@'."
      );
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage(
        "Please include an '@' in the email address. 'Email' is missing an '@'."
      );
      return;
    }

    setNewsletterMessage("Thank you! Your newsletter request has been received.");
    form.reset();
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/contact`);
        const data = await response.json();
        if (data.success) {
          setContacts(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const getOffice = (name) => {
    return (
      contacts.find((contact) => {
        const officeName = String(contact.officeName || "").trim().toLowerCase();
        const targetName = name.trim().toLowerCase();
        return officeName === targetName || officeName.includes(targetName);
      }) || null
    );
  };

  const brooklyn = getOffice("brooklyn");
  const portland = getOffice("portland");

  // Colors apply karne ka function (Default aur Hover dono ke liye)
  const applyColors = (mapInstance, isHovered) => {
    if (!mapInstance || typeof mapInstance.setPaintProperty !== 'function') return;
    
    if (isHovered) {
      // HOVER STATE (Blue water, white roads)
      mapInstance.setPaintProperty('water', 'fill-color', '#1893D2');
      mapInstance.setPaintProperty('road-simple', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('road-street', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('road-street-low', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('background', 'background-color', '#f0f4f8');
    } else {
      // DEFAULT STATE (Grey water #7D7D7D, white roads)
      mapInstance.setPaintProperty('water', 'fill-color', '#7D7D7D'); 
      mapInstance.setPaintProperty('road-simple', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('road-street', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('road-street-low', 'line-color', '#ffffff');
      mapInstance.setPaintProperty('background', 'background-color', '#ffffff'); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 mt-20 px-7 lg:px-9 md:px-12">
        <h1 className="font-basis-web leading-[43px] text-[36px] font-semibold text-[#293339]">
          Contact Us
        </h1>
      </div>

      <div className="flex flex-col font-basis-web md:grid md:grid-cols-2">
        
        {/* LEFT SIDE: Brooklyn Map */}
        <div className="w-full">
          <div
            className="aspect-square lg:aspect-auto lg:h-[450px] w-full bg-gray-200 relative overflow-hidden"
            onMouseEnter={() => {
              setHoveredMap("brooklyn");
              applyColors(brooklynMap, true);
            }}
            onMouseLeave={() => {
              setHoveredMap(null);
              applyColors(brooklynMap, false);
            }}
          >
            <div className="map-wrapper w-full h-full">
              {MAPBOX_TOKEN ? <Map
                initialViewState={{
                  longitude: -73.9871,
                  latitude: 40.7025,
                  zoom: 14.5
                }}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                attributionControl={false}
                logoPosition="bottom-left"
                cooperativeGestures={true} 
                style={{ width: '100%', height: '100%' }}
                onLoad={(e) => {
                  setBrooklynMap(e.target);
                  applyColors(e.target, false); 
                }}
              >
                <Marker longitude={-73.9871} latitude={40.7025} anchor="bottom">
                  <div style={{ transform: 'translate(0, -4px)' }}>
                    <svg height="41px" width="27px" viewBox="0 0 27 41">
                      <g fillRule="nonzero">
                        <g transform="translate(3.0, 29.0)" fill="#000000">
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse>
                        </g>
                        {/* Pin Color Logic: Grey default, Blue on hover */}
                        <g fill={hoveredMap === "brooklyn" ? "#1893D2" : "#7D7D7D"}>
                          <path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"></path>
                        </g>
                        <g opacity="0.25" fill="#000000">
                          <path d="M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"></path>
                        </g>
                        <g transform="translate(8.0, 8.0)">
                          <circle fill="#000000" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle>
                          <circle fill="#FFFFFF" cx="5.5" cy="5.5" r="5.4999962"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                </Marker>
              </Map> : (
                <div className="flex h-full items-center justify-center p-6 text-center text-gray-600">
                  Map unavailable. Set VITE_MAPBOX_ACCESS_TOKEN to enable it.
                </div>
              )}
            </div>
          </div>

          {/* Brooklyn Address */}
          <div className="px-7 lg:px-25 md:px-12 py-10 md:py-12 lg:mb-20 md:mb-20 mb-20">
            <h2 className="text-[24px] leading-[29px] font-basis-web text-[#293339] hover:text-[#1893D2] mb-3">
              Blue Chalk {brooklyn?.officeName || "Brooklyn"}
            </h2>
            <div className="text-[15px] leading-[28px] text-[#293339]">
              {brooklyn ? (
                <>
                  <p>{brooklyn.address.street}</p>
                  <p>{brooklyn.address.city}, {brooklyn.address.state} {brooklyn.address.zipCode}</p>
                </>
              ) : (
                <>
                  <p>68 Jay Street Suite 201</p>
                  <p>Brooklyn, NY 11201</p>
                </>
              )}

              <div className="flex items-center gap-3.5 pt-4">
                <svg width="18" height="18" viewBox="0 0 20 20" className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5">
                  <path d="M10,0 C15.5078125,0 20,4.4921875 20,10 C20,15.5371094 15.5078125,20 10,20 C4.46289062,20 0,15.5371094 0,10 C0,4.4921875 4.46289062,0 10,0 Z M10,10.8789062 L16.25,6.20117188 C16.25,5.76171875 15.8984375,5.41992188 15.4589844,5.41992188 L4.54101562,5.41992188 C4.1015625,5.76171875 3.75,5.76171875 3.75,6.20117188 L10,10.8789062 Z M16.25,13.7988281 L16.25,7.82226562 L10,12.5 L3.75,7.82226562 L3.75,13.7988281 C3.75,14.2382812 4.1015625,14.5800781 4.54101562,14.5800781 L15.4589844,14.5800781 C15.8984375,14.5800781 16.25,14.2382812 16.25,13.7988281 Z" fill="#1893D2" />
                </svg>
                <a href={`mailto:${brooklyn?.email || "hello@bluechalk.com"}`} className="text-blue-600 hover:underline break-all">
                  {brooklyn?.email || "hello@bluechalk.com"}
                </a>
              </div>

              <div className="flex items-center gap-3.5 lg:pt-3">
                <svg width="18" height="18" viewBox="0 0 20 20" className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5">
                  <path d="M10,0 C15.5273438,0 20,4.47265625 20,10 C20,15.5273438 15.5273438,20 10,20 C4.47265625,20 0,15.5273438 0,10 C0,4.47265625 4.47265625,0 10,0 Z M5.40039062,15.859375 C10.8789062,15.2539062 15.2441406,10.9667969 15.859375,5.40039062 L12.5878906,4.1015625 L10.8105469,7.64648438 L12.4902344,9.32617188 C11.6894531,10.6054688 10.6054688,11.6894531 9.32617188,12.4902344 L7.64648438,10.8105469 L4.1015625,12.578125 L5.40039062,15.859375 Z" fill="#1893D2" />
                </svg>
                <a href={`tel:${brooklyn?.phone || "3474108445"}`} className="text-blue-600 hover:underline">
                  {brooklyn?.phone || "347.410.8445"}
                </a>
              </div>
              <div className="lg:mt-7 border-b border-gray-200"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Portland Map */}
        <div className="w-full">
          <div
            className="aspect-square lg:aspect-auto lg:h-[450px] w-full bg-gray-300 relative overflow-hidden"
            onMouseEnter={() => {
              setHoveredMap("portland");
              applyColors(portlandMap, true);
            }}
            onMouseLeave={() => {
              setHoveredMap(null);
              applyColors(portlandMap, false);
            }}
          >
            <div className="map-wrapper w-full h-full">
              {MAPBOX_TOKEN ? <Map
                initialViewState={{
                  longitude: -122.6543210,
                  latitude: 45.5598765,
                  zoom: 14.5
                }}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                attributionControl={false}
                logoPosition="bottom-left"
                cooperativeGestures={true} 
                style={{ width: '100%', height: '100%' }}
                onLoad={(e) => {
                  setPortlandMap(e.target);
                  applyColors(e.target, false); 
                }}
              >
                <Marker longitude={-122.6543210} latitude={45.5598765} anchor="bottom">
                  <div style={{ transform: 'translate(0, -4px)' }}>
                    <svg height="41px" width="27px" viewBox="0 0 27 41">
                      <g fillRule="nonzero">
                        <g transform="translate(3.0, 29.0)" fill="#000000">
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse>
                          <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse>
                        </g>
                        {/* Pin Color Logic: Grey default, Blue on hover */}
                        <g fill={hoveredMap === "portland" ? "#1893D2" : "#7D7D7D"}>
                          <path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"></path>
                        </g>
                        <g opacity="0.25" fill="#000000">
                          <path d="M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"></path>
                        </g>
                        <g transform="translate(8.0, 8.0)">
                          <circle fill="#000000" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle>
                          <circle fill="#FFFFFF" cx="5.5" cy="5.5" r="5.4999962"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                </Marker>
              </Map> : (
                <div className="flex h-full items-center justify-center p-6 text-center text-gray-600">
                  Map unavailable. Set VITE_MAPBOX_ACCESS_TOKEN to enable it.
                </div>
              )}
            </div>
          </div>

          {/* Portland Address */}
          <div className="px-7 lg:px-12 xl:px-24 md:px-12 py-10 md:py-12 mb-5">
            <h2 className="text-[24px] leading-[29px] font-basis-web text-[#293339] mb-3">
              Blue Chalk {portland?.officeName || "Portland"}
            </h2>
            <div className="text-[15px] leading-[28px] text-[#293339]">
              {portland ? (
                <>
                  <p>{portland.address.street}</p>
                  <p>{portland.address.city}, {portland.address.state} {portland.address.zipCode}</p>
                </>
              ) : (
                <>
                  <p>1737 NE Alberta, Suite 207</p>
                  <p>Portland, OR 97211</p>
                </>
              )}

              <div className="flex items-center gap-3.5 pt-4">
                <svg width="18" height="18" viewBox="0 0 20 20" className="flex-shrink-0 w-5 h-5 md:w-5 md:h-5">
                  <path d="M10,0 C15.5078125,0 20,4.4921875 20,10 C20,15.5371094 15.5078125,20 10,20 C4.46289062,20 0,15.5371094 0,10 C0,4.4921875 4.46289062,0 10,0 Z M10,10.8789062 L16.25,6.20117188 C16.25,5.76171875 15.8984375,5.41992188 15.4589844,5.41992188 L4.54101562,5.41992188 C4.1015625,5.76171875 3.75,5.76171875 3.75,6.20117188 L10,10.8789062 Z M16.25,13.7988281 L16.25,7.82226562 L10,12.5 L3.75,7.82226562 L3.75,13.7988281 C3.75,14.2382812 4.1015625,14.5800781 4.54101562,14.5800781 L15.4589844,14.5800781 C15.8984375,14.5800781 16.25,14.2382812 16.25,13.7988281 Z" fill="#1893D2" />
                </svg>
                <a href={`mailto:${portland?.email || "hello@bluechalk.com"}`} className="text-blue-600 hover:underline break-all">
                  {portland?.email || "hello@bluechalk.com"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Unchanged */}
      <div className="bg-[#F5F4F2] border-t font-basis-web border-gray-200 py-12 sm:py-16 lg:py-20 px-7 md:px-12 lg:px-25">
        <div className=" ">
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
              <form onSubmit={handleNewsletterSubmit} noValidate>
                <div className="block md:hidden flex flex-col border border-[#e8e8e8] bg-white">
                  <div className="grid grid-cols-2 border-b border-[#e8e8e8]">
                    <input type="text" placeholder="Name*" className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] placeholder:opacity-100 outline-none text-sm sm:text-base border-r border-[#e8e8e8] focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    <input type="text" inputMode="email" placeholder="Email*" className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] placeholder:opacity-100 outline-none text-sm sm:text-base focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                  </div>
                  <div className="grid grid-cols-2">
                    <input type="text" placeholder="Title (optional)" className="w-full h-[40px] px-4 sm:px-5 text-[#7F7F7F] placeholder:opacity-100 outline-none text-sm sm:text-base border-r border-[#e8e8e8] focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    <input type="text" placeholder="Company (optional)" className="w-full h-[40px] px-4 sm:px-5 text-[#363639] placeholder-[#363639] placeholder:opacity-100 outline-none text-sm sm:text-base focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                  </div>
                  <div className="relative">
                    <button type="submit" className="bg-[#1f93d1] border border-[#1f93d1] text-white uppercase font-semibold hover:bg-white hover:text-[#1f93d1] transition h-[46px] w-full text-[11px] leading-[11px]">
                      Subscribe
                    </button>
                    {newsletterMessage && (
                      <div className="absolute bottom-full right-0 z-[100] mb-3 flex w-[calc(100vw-40px)] max-w-md items-start gap-3 whitespace-normal break-words rounded-md border border-gray-300 bg-white px-5 py-4 text-sm text-black shadow-lg" role="status" aria-live="polite">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#f26522] font-bold text-white" aria-hidden="true">!</span>
                        <span>{newsletterMessage}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:grid md:grid-cols-[1fr_1fr_auto] border border-[#e8e8e8] bg-white lg:ml-4">
                  <div className="border-b md:border-b-0 md:border-r border-[#e8e8e8]">
                    <input type="text" placeholder="Name*" className="w-full lg:h-[46px] h-[38px] px-5 outline-none text-sm sm:text-base text-[#363639] placeholder-[#363639] placeholder:opacity-100 focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    <div className="border-t border-[#e8e8e8]">
                      <input type="text" placeholder="Title (optional)" className="w-full lg:h-[46px] h-[38px] px-5 outline-none text-sm sm:text-base text-[#7F7F7F] placeholder:opacity-100 focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    </div>
                  </div>
                  <div className="border-b md:border-b-0 md:border-r border-[#e8e8e8]">
                    <input type="text" inputMode="email" placeholder="Email*" className="w-full lg:h-[46px] h-[38px] px-5 outline-none text-sm sm:text-base text-[#363639] placeholder-[#363639] placeholder:opacity-100 focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    <div className="border-t border-[#e8e8e8]">
                      <input type="text" placeholder="Company (optional)" className="w-full lg:h-[46px] h-[38px] px-5 outline-none text-sm sm:text-base text-[#7F7F7F] placeholder:opacity-100 focus:bg-[#f8fbfd] focus:ring-1 focus:ring-[#1f93d1]" />
                    </div>
                  </div>
                  <div className="relative">
                    <button type="submit" className="bg-[#1f93d1] text-white uppercase font-semibold md:text-[11px] transition lg:h-[92px] h-[84px] w-full lg:w-[310px] md:w-[230px] px-6 sm:px-8 text-sm sm:text-base leading-[11px] hover:bg-white hover:text-[#1f93d1] hover:border hover:border-[#1f93d1]">
                      Subscribe
                    </button>
                    {newsletterMessage && (
                      <div className="absolute bottom-full right-0 z-[100] mb-3 flex w-[calc(100vw-40px)] max-w-md items-start gap-3 whitespace-normal break-words rounded-md border border-gray-300 bg-white px-5 py-4 text-sm text-black shadow-lg" role="status" aria-live="polite">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#f26522] font-bold text-white" aria-hidden="true">!</span>
                        <span>{newsletterMessage}</span>
                      </div>
                    )}
                  </div>
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