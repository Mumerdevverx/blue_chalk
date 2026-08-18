import React from "react";
import atomics from "../../assets/newsImages/atomics.jpg";
import backarrow from "../../assets/newsImages/backarrow.svg";

const NewsBlogs = () => {
  return (
    <div className="lg:px-32 md:px-13 px-7 max-sm:mt-18">
      {/* Image */}
      <div className="mb-8">
        <img
          src={atomics}
          alt="Atomic Echoes documentary"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Navigation & Title - Side by Side */}
      <div className="flex md:flex-row flex-col place-items-baseline gap-6 md:gap-14 mb-10">
        {/* Left - Back Arrow */}
        <div className="flex items-center gap-2 text-[#1893DB] cursor-pointer hover:opacity-80 transition-opacity min-w-fit">
          <img src={backarrow} alt="Back arrow" className="w-5 h-5" />
          <span className="text-[13px] font-normal leading-[28px] hover:text-[#94999C]">
            Back to all News
          </span>
        </div>

        {/* Right - Title and Date */}
        <div className="">
          <h1 className="text-[36px] md:text-[36px] font-normal leading-[43px]">
            Blue Chalk's Atomic Echoes to Premiere on Public Television Stations
            Nationwide August 1
          </h1>
          <p className="text-[#C4BFBB] lg:text-[9px] md:text-[9px] text-[9px] leading-[28px] tracking-[2px] font-normal mt-6 md:mt-5">
            JULY 8, 2025
          </p>
          {/* Article Content */}
          <div className="mt-10 md:mt-10 lg:mr-52">
            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              Marking the 80th anniversary of the Hiroshima and Nagasaki atomic
              bombing,{" "}
              <em className="text-[#1893DB] hover:underline cursor-pointer">
                Atomic Echoes: Untold Stories of World War II
              </em>{" "}
              , a new documentary from Blue Chalk Media, will air on public
              television stations nationwide beginning the week of August 1. The
              film includes rarely seen archival footage and interviews with
              100-year-old American veterans who were eyewitnesses to the
              devastation in the immediate aftermath of nuclear warfare.
            </p>

            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              <em>Atomic Echoes follows Karin Tanabe and Victoria Kelly</em> ,
              two friends whose families were on opposite sides of the war, as
              they embark on an emotional journey to uncover their family
              legacies. Through their exploration, the film sheds light on the
              enduring scars of the “hibakusha”—the estimated 650,000 Japanese
              survivors of the bombings and the “atomic veterans”—the estimated
              200,000 American soldiers who responded in the immediate aftermath
              of the bombings.
            </p>

            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              Karin Tanabe and Victoria Kelly bring deeply personal connections
              to this project. Karin is a bestselling historical fiction
              novelist and former Politico reporter whose great-great-uncle was
              the first president of Hiroshima University and dedicated his life
              to peace-building after the bomb. Victoria is an award-winning
              author and poet whose grandfather, an American atomic veteran who
              served in Nagasaki, died young, haunted by his experiences.
            </p>
            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              Directed and produced by Beatrice Becette and executive produced
              by Greg Moyer,<em> Atomic Echoes</em> was filmed in both Japan and
              the United States and combines deeply personal storytelling with
              interviews from the last remaining survivors. The film offers a
              new perspective on the nuclear age and its lasting consequences,
              urging reflection and peace as this pivotal anniversary
              approaches.
            </p>
            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              <em>“With Atomic Echoes</em> , we’re preserving the voices of
              those who have experienced one of history’s most significant and
              devastating events,” said Greg Moyer. “This story and its lessons
              are vital, and we’re honored by the trust placed in us by Karin,
              Victoria, and the survivors who have bravely shared with us.”{" "}
            </p>
            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              As the remaining survivors enter their later years, Atomic Echoes
              stands as a powerful testament to their experiences, and a
              reminder of the human cost of nuclear warfare. The film invites
              viewers to listen, reflect, and reckon with a past that continues
              to shape our present.
            </p>
            <p className="text-[#293339] mb-4 text-[16px] md:text-[16px] font-normal leading-[30px]">
              For press inquiries, interview requests, or more information,
              please contact{" "}
              <span className="text-[#1893DB] hover:underline cursor-pointer">
                {" "}
                hello@bluechalk.com
              </span>
            </p>
            <p className="text-[#293339] text-[16px] md:text-[16px] font-bold leading-[30px]">
              Watch the official trailer{" "}
              <a
                href="https://www.youtube.com/watch?v=4iUpvDhoPOw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1893DB] hover:underline"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogs;
