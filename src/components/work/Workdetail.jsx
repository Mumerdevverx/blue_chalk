import React from "react";
import { Link, useParams } from "react-router-dom";
import workdetailone from "../../assets/workimages/workdetailone.jpg";

const Workdetail = () => {
  const { id } = useParams();

  // Video data based on project ID
  const videoData = {
    1: "https://www.youtube.com/embed/4iUpvDhoPOw",
    2: "https://www.youtube.com/embed/another-video-id",
    3: "https://www.youtube.com/embed/third-video-id",
  };

  const videoUrl = videoData[id] || "https://www.youtube.com/embed/4iUpvDhoPOw";

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[110px] md:mt-[115px] pb-6 lg:px-0 md:px-13 px-7 sm:px-6 md:px-0">
      {/* Video Container */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>

      {/* Back to Work Button */}
      <div className="mt-6 pt-4">
        <Link
          to="/work"
          className="text-[15px] text-[#0089D0] hover:underline transition-all duration-200 flex items-center gap-2"
        >
          <span>&larr;</span> Back to Work
        </Link>
      </div>

      {/* Title and Next Project - Flex Row */}
      <div className="flex flex-col md:flex-row justify-between  gap-70 mt-8">
        {/* Left Side - Title and Date */}
        <div className="flex-1">
          <div>
            <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-normal text-[#293339] leading-[1.2]">
              Atomic Echoes: Untold Stories from World War II
            </h1>

            {/* Divider Line */}
            <div className="border-b border-[#D9D9D9] mt-5"></div>

            {/* Date and Credit */}
            <p className="text-[14px] md:text-[15px] text-[#9EA5BB]  tracking-[2px] mt-3">
              AUG. 1, 2025 : WITH BLUE CHALK MEDIA
            </p>
          </div>
          <div className="mt-20 mb-5">
            <h1 className="mb-4 text-[#C2BBB6] text-[24px] ">
              About the Project
            </h1>
            <p className="mb-5">
              Atomic Echoes: Untold Stories from World War II is an original
              Blue Chalk documentary that explores the intertwined legacies of
              Hiroshima and Nagasaki through the eyes of two women whose
              families stood on opposite sides of World War II.
            </p>
            <p className="mb-5">
              The film follows authors Karin Tanabe and Victoria Kelly as they
              trace their family histories—Karin’s great-great-uncle, who was
              from Hiroshima, dedicated his life to peace-building after the
              bombing, while Victoria’s grandfather, an American veteran who
              served in Nagasaki, carried the trauma of what he witnessed for
              the rest of his life.
            </p>
            <p className="mb-5">
              Through conversations with the last remaining Japanese hibakusha
              and American atomic veterans, along with historians and family
              members, Karin and Victoria uncover personal stories of loss,
              resilience, and reconciliation. Against the backdrop of the
              recently marked 80th anniversary of the bombings, Atomic Echoes
              offers a rare, intimate perspective on the nuclear age and its
              enduring human cost.
            </p>
            <p className="mb-5">
              Atomic Echoes aired on public television stations nationwide on
              August 1, 2025, and is available to stream on PBS platforms.
            </p>
          </div>

          {/* Contributors Section */}
          <div className="mt-16">
            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-normal text-[#C2BBB6] leading-[1.2] mb-6">
              Contributors
            </h2>

            <div className="flex gap-10">
              {/* Left Column */}
              <div className="text-[14px] text-[#293339] leading-[1.8] flex-1">
                <p className="py-1">
                  Beatrice Becette, Director/Producer
                </p>
                <p className="py-1 ">
                  Chris Janjic, Director of Photography
                </p>
                <p className="py-1">
                  Greg Moyer, Executive Producer
                </p>
                <p className="py-1 ">
                  Pam Huling, Executive Producer
                </p>
                <p className="py-1 ">
                  Karin Tanabe, Producer
                </p>
                <p className="py-1 ">
                  Victoria Kelly, Producer
                </p>
                <p className="py-1 ">
                  Tim McLaughlin, Editor
                </p>
                <p className="py-1 ">
                  Conner Lee, Graphics
                </p>
                <p className="py-1 ">
                  Miró Merrill, Graphics
                </p>
                <p className="py-1 ">
                  Kenzie Bruce, Consulting Producer
                </p>
                <p className="py-1 ">
                  Amy Polansky, Supervising Producer
                </p>
                <p className="py-1 ">
                  Jessica Stewart, Supervising Producer
                </p>
              </div>

              {/* Right Column */}
              <div className="text-[14px] text-[#293339] leading-[1.8] flex-1">
                <p className="py-1 ">
                  Kunio Tanabe, Translator
                </p>
                <p className="py-1 ">
                  Megumi Nishikura, Translator
                </p>
                <p className="py-1 ">
                  Ruth Aravena, Communications & Digital Operations Director
                </p>
                <p className="py-1">
                  Nagasaki Foundation for the Promotion of Peace, Special Thanks
                </p>
                <p className="py-1 ">
                  Nagasaki Atomic Bomb Museum, Special Thanks
                </p>
                <p className="py-1 ">
                  Nagasaki Film & Media Commission (JFC)/Nagasaki Prefecture
                  Tourism Association, Special Thanks
                </p>
                <p className="py-1 ">
                  Hiroshima Film Commission (JFC), Special Thanks
                </p>




              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Next Project with Image */}
        <div className="flex flex-col items-end gap-4 flex-shrink-0 group">
          <div className="text-right">
            <Link
              to="/work/next"
              className="text-[12px] text-[#C2BBB6] group-hover:text-[#3D93D2] tracking-[2.5px] transition-all duration-300 leading-tight block"
            >
              NEXT PROJECT: MYFACE: OUR 
 BEAUTY. OUR STORIES. OUR POWER. →
            </Link>
          </div>
          <img
            src={workdetailone}
            alt="Next Project"
            className="w-20 h-15 object-cover rounded-md grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Workdetail;

 