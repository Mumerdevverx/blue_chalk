import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../config/api";

// Authentic Blue Chalk team members data
const fallbackMembers = [
  {
    "id": 1,
    "name": "Greg Moyer",
    "rawName": "Greg Moyer (He/Him)",
    "pronouns": "(He/Him)",
    "title": "Founder and CEO",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/6c/c2/6cc23d1f7602377f5d225cabfafbaf0e.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/3c/4d/3c4d7a59fac1a8711d25d1c61f099b60.jpg",
    "bio": "Greg Moyer founded Blue Chalk Media in 2013 intending to create a world-class visual communications company whose productions demonstrate the power, importance, and appeal of documentary-style storytelling. Hundreds of films and awards later, Blue Chalk has become known for its cinematic production style and journalistic approach to stories, a reflection of Greg’s early love for visual journalism as an aspiring photographer and newspaper photo editor. Prior to Blue Chalk, Greg spent over 25 years in senior management roles for a variety of non-fiction television brands, including Discovery Channel, TLC, Animal Planet, VOOM HD and Food Network. While head of programming, Greg led Discovery to five George Foster Peabody Awards for editorial excellence. In his final role as a television channel executive, Greg managed the launch of the Food Network into 63 countries outside North America.",
    "rawBio": "<p><span><span>Greg Moyer founded Blue Chalk Media in 2013 intending to create a world-class visual communications company whose productions demonstrate the power, importance, and appeal of documentary-style storytelling. Hundreds of films and awards later, Blue Chalk has become known for its cinematic production style and journalistic approach to stories, a reflection of Greg’s early love for visual journalism as an aspiring photographer and newspaper photo editor. Prior to Blue Chalk, Greg spent over 25 years in senior management roles for a variety of non-fiction television brands, including Discovery Channel, TLC, Animal Planet, VOOM HD and Food Network. While head of programming, Greg led Discovery to five George Foster Peabody Awards for editorial excellence. In his final role as a television channel executive, Greg managed the launch of the Food Network into 63 countries outside North America.</span></span><br></p>",
    "linkedin": "http://www.linkedin.com/pub/greg-moyer/4/605/954/",
    "twitter": "http://twitter.com/GregBMoyer",
    "instagram": null,
    "email": "greg@bluechalk.com"
  },
  {
    "id": 2,
    "name": "Pam Huling",
    "rawName": "Pam Huling (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Chief Revenue Officer",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/c2/c8/c2c8c1740134839ffb9b91a4c2102b92.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/08/65/0865fcebaf381ec95dbbcf17906c5871.jpg",
    "bio": "Pam Huling, chief revenue officer and co-founder of Blue Chalk. She has been named one of the Top Women in Digital by Cynopsis Media. Prior to Blue Chalk, she was the Director of Photo Services at Discovery Communications where she oversaw all aspects of photography for nearly 15 years, supporting more than 100 television brands worldwide. Currently, Pam is an adjunct professor in the visual communications department at Syracuse University's Newhouse School. She is a graduate of New England Conservatory of Music, having received a scholarship at the age of 17, and has a degree in graphic design as well.",
    "rawBio": "<p><span><span>Pam Huling, chief revenue officer and co-founder of Blue Chalk. She has been named one of the Top Women in Digital by Cynopsis Media. Prior to Blue Chalk, she was the Director of Photo Services at Discovery Communications where she oversaw all aspects of photography for nearly 15 years, supporting more than 100 television brands worldwide. Currently, Pam is an adjunct professor in the visual communications department at Syracuse University's Newhouse School. She is a graduate of New England Conservatory of Music, having received a scholarship at the age of 17, and has a degree in graphic design as well.</span></span><br></p>",
    "linkedin": "http://www.linkedin.com/pub/pam-huling/2/9a5/71a",
    "twitter": "https://twitter.com/pamhuling",
    "instagram": null,
    "email": "pam@bluechalk.com"
  },
  {
    "id": 3,
    "name": "Mariko Fujinaka",
    "rawName": "Mariko Fujinaka (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Post-Production Manager",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/95/92/9592e1bbd7f827a3122f587a773a201d.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/ba/19/ba19e7b95a5bcc323309d57acfecdcff.jpg",
    "bio": "Mariko Fujinaka joined Blue Chalk in 2018 to serve as supervising writer on a series of “explainer” videos for Pearson Education. She writes and copy edits and is now also a post-production producer. She has been involved in projects with such organizations as Thrive Global, HP, and Airbnb. In her previous work life Mariko was managing editor of a small book development firm that specialized in academic publishing. Her passions include sewing, knitting, trail running and candy.",
    "rawBio": "<p><span><span>Mariko Fujinaka joined Blue Chalk in 2018 to serve as supervising writer on a series of “explainer” videos for Pearson Education. She writes and copy edits and is now also a post-production producer. She has been involved in projects with such organizations as Thrive Global, HP, and Airbnb. In her previous work life Mariko was managing editor of a small book development firm that specialized in academic publishing. Her passions include sewing, knitting, trail running and candy. </span></span><br></p>",
    "linkedin": "https://www.linkedin.com/mynetwork/add-connections/",
    "twitter": null,
    "instagram": null,
    "email": "mariko.fujinaka@bluechalk.com"
  },
  {
    "id": 4,
    "name": "Natalie Taylor",
    "rawName": "Natalie Taylor (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Executive Producer",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/5d/3d/5d3d8fc339ba7afcd7407d45b27190d0.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/2b/3e/2b3eda22fc2e9dc6ea17b86c34d636f2.jpg",
    "bio": "Natalie Taylor is an exeucitve producer who has been with Blue Chalk since 2014. She built and led a team of producers, writers, editors and graphic designers to create more than 100 “explainer” videos for Pearson’s higher education digital platform. Natalie has also produced or directed projects for Discovery Education, TIME, Atlassian, the August Wilson Red Door Project and Fertility IQ. A native of eastern North Carolina, Natalie worked in research science, microbiology and zoology before pursuing filmmaking. She was a Roy H. Park Fellow at the University of North Carolina School of Journalism and Mass Communication. Natalie enjoys being in the garden, reading, owning chickens, biking and rock climbing.",
    "rawBio": "<p><span>Natalie Taylor is an exeucitve producer who has been with Blue Chalk since 2014. She built and led a team of producers, writers, editors and graphic designers to create more than 100 “explainer” videos for Pearson’s higher education digital platform. Natalie has also produced or directed projects for Discovery Education, TIME, Atlassian, the August Wilson Red Door Project and Fertility IQ. A native of eastern North Carolina, Natalie worked in research science, microbiology and zoology before pursuing filmmaking. She was a Roy H. Park Fellow at the University of North Carolina School of Journalism and Mass Communication. Natalie enjoys being in the garden, reading, owning chickens, biking and rock climbing. </span><br></p>",
    "linkedin": "http://www.linkedin.com/pub/natalie-taylor/6b/34b/9aa",
    "twitter": "https://twitter.com/leafcutternats",
    "instagram": null,
    "email": "natalie@bluechalk.com"
  },
  {
    "id": 5,
    "name": "Sebastián Weinberg",
    "rawName": "Sebastián Weinberg (He/Him)",
    "pronouns": "(He/Him)",
    "title": "Contributing Line Producer",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/52/6d/526d58ae03940181ce7ac5d9d23e83e0.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/08/c2/08c2b541ef47a5cec219f088ae27c387.jpg",
    "bio": "Sebastián Weinberg joined Blue Chalk Media in 2018. He has supervised numerous commercial, branded content, and documentary projects for clients such as Nike, Food Network, TIME, Wieden+Kennedy, Siegel+Gale, PBS, and The New Yorker. He is currently overseeing several productions for the upcoming launch of the Magnolia Network. Prior to joining Blue Chalk, Sebastián managed and produced multiple award-winning film, TV, and digital projects for such networks as Showtime, History Channel, CNN, ESPN, Hulu, and Maker Studios. His projects have premiered at the Sundance, Toronto, Tribeca, and SXSW film festivals. Sebastián grew up in New York City drinking coffee, playing the violin, and watching Bette Davis movies with his dad. He studied film and music performance at Vassar College. Sebastián lives in Philadelphia, PA.&nbsp;",
    "rawBio": "<p><span>Sebastián Weinberg joined Blue Chalk Media in 2018. He has supervised numerous commercial, branded content, and documentary projects for clients such as Nike, Food Network, TIME, Wieden+Kennedy, Siegel+Gale, PBS, and The New Yorker. He is currently overseeing several productions for the upcoming launch of the Magnolia Network. Prior to joining Blue Chalk, Sebastián managed and produced multiple award-winning film, TV, and digital projects for such networks as Showtime, History Channel, CNN, ESPN, Hulu, and Maker Studios. His projects have premiered at the Sundance, Toronto, Tribeca, and SXSW film festivals. Sebastián grew up in New York City drinking coffee, playing the violin, and watching Bette Davis movies with his dad. He studied film and music performance at Vassar College. Sebastián lives in Philadelphia, PA.&nbsp; </span><br></p>",
    "linkedin": "https://www.linkedin.com/in/sebastian-weinberg-00888020/",
    "twitter": null,
    "instagram": null,
    "email": "sebastian.weinberg@bluechalk.com"
  },
  {
    "id": 6,
    "name": "Beatrice Becette",
    "rawName": "Beatrice Becette (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Producer/Director",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/79/c6/79c60eb5ecd1bd9c8c8b9f2224452c30.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/87/63/876318145635cb82e4a33d5ee08cfd2b.jpg",
    "bio": "Beatrice Becette (Bea) is a Brooklyn-based producer, director, and writer focused on telling stories that inspire and unite us. She began her career at National Geographic where she produced documentary features and series for global audiences on broadcast and digital. Over her tenure in the industry, she’s produced &amp; directed educational, entertainment, and branded content for various clients including; Discovery, Magnolia, Disney, National Geographic, Nat Geo Kids,&nbsp;Realtor.com, and Lowe’s. Beatrice is a graduate of American University where she majored in Film and double minored in Marketing and Creative Writing. In her free time, she enjoys singing in the a cappella group she founded, beach trips, park picnics, and reading at home with her cat, Leo",
    "rawBio": "<p>Beatrice Becette (Bea) is a Brooklyn-based producer, director, and writer focused on telling stories that inspire and unite us. She began her career at National Geographic where she produced documentary features and series for global audiences on broadcast and digital. Over her tenure in the industry, she’s produced &amp; directed educational, entertainment, and branded content for various clients including; Discovery, Magnolia, Disney, National Geographic, Nat Geo Kids,&nbsp;Realtor.com, and Lowe’s. Beatrice is a graduate of American University where she majored in Film and double minored in Marketing and Creative Writing. In her free time, she enjoys singing in the a cappella group she founded, beach trips, park picnics, and reading at home with her cat, Leo<br></p>",
    "linkedin": "https://www.linkedin.com/in/beatrice-becette-6333a089/",
    "twitter": null,
    "instagram": null,
    "email": "beatrice.becette@bluechalk.com"
  },
  {
    "id": 7,
    "name": "Mariel Rodriguez-McGill",
    "rawName": "Mariel Rodriguez-McGill (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Producer/Director",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/0e/a5/0ea594db6c22b73162c02ca99983df27.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/59/cd/59cda91cb42c8ff679d18285984bc4bc.jpg",
    "bio": "Mariel Rodriguez-McGill is a video journalist focused on documentary filmmaking with a passion for telling inspirational and compelling stories. Mariel began her career as a producer, director, and editor at Rocky Mountain PBS in Denver, Colorado, where she helped develop the web series “Great Ingredients,” and the historical documentary series “Colorado Experience.” Mariel served for three years as Colorado's Deputy Film Commissioner during which time she directed an hour-long film on the National Governors Association, and her first feature-length documentary, “Built Beautiful,” exploring the intersection of architecture and neuroscience as they relate to health and well-being. Most recently, she co-directed “Stay the Course,” a half-hour film following high school students navigating adolescence along the shores of the Bronx River. She received a BA from Boston College and holds master’s degrees from the University of Denver and Columbia Journalism School.",
    "rawBio": "<p>Mariel Rodriguez-McGill is a video journalist focused on documentary filmmaking with a passion for telling inspirational and compelling stories. Mariel began her career as a producer, director, and editor at Rocky Mountain PBS in Denver, Colorado, where she helped develop the web series “Great Ingredients,” and the historical documentary series “Colorado Experience.” Mariel served for three years as Colorado's Deputy Film Commissioner during which time she directed an hour-long film on the National Governors Association, and her first feature-length documentary, “Built Beautiful,” exploring the intersection of architecture and neuroscience as they relate to health and well-being. Most recently, she co-directed “Stay the Course,” a half-hour film following high school students navigating adolescence along the shores of the Bronx River. She received a BA from Boston College and holds master’s degrees from the University of Denver and Columbia Journalism School.<br></p>",
    "linkedin": "https://www.linkedin.com/in/mrodriguez-mcgill/",
    "twitter": "https://mobile.twitter.com/marieleats",
    "instagram": null,
    "email": "mariel.rodriguezmcgill@bluechalk.com"
  },
  {
    "id": 8,
    "name": "Matthew Slutsky",
    "rawName": "Matthew Slutsky (He/Him)",
    "pronouns": "(He/Him)",
    "title": "Contributing Producer",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/0d/e9/0de904f04d54c33445b8b5cf7c5b8e6e.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/cd/51/cd51226400d5517ede08fe9fb818e9ef.jpg",
    "bio": "Matthew Slutsky is a senior producer who joined Blue Chalk in 2017 to help develop and produce new film projects after years working in the political and online advocacy realms. Matthew has produced many storytelling projects, including “The Time Is Now,” a 2019 Super Bowl ad that promoted medical marijuana; “High Stakes: America’s Journey to the Affordable Care Act,” a 2020 short documentary created with the Commonwealth Fund; and the digital Food Network series “Fix Me a Plate,” staring celebrity chef Alex Guarnaschelli. Matthew lives in Philadelphia, PA, with his wife, young son and daughter, and a highly excitable sheepdog.",
    "rawBio": "<p><span><span>Matthew Slutsky is a senior producer who joined Blue Chalk in 2017 to help develop and produce new film projects after years working in the political and online advocacy realms. Matthew has produced many storytelling projects, including “The Time Is Now,” a 2019 Super Bowl ad that promoted medical marijuana; “High Stakes: America’s Journey to the Affordable Care Act,” a 2020 short documentary created with the Commonwealth Fund; and the digital Food Network series “Fix Me a Plate,” staring celebrity chef Alex Guarnaschelli. Matthew lives in Philadelphia, PA, with his wife, young son and daughter, and a highly excitable sheepdog.</span></span><br></p>",
    "linkedin": "https://www.linkedin.com/in/matthewslutsky",
    "twitter": null,
    "instagram": null,
    "email": "matthew.slutsky@bluechalk.com"
  },
  {
    "id": 9,
    "name": "José Márquez",
    "rawName": "José Márquez (He/Him)",
    "pronouns": "(He/Him)",
    "title": "Editor",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/0d/97/0d975b2508ef5561125e3528054ef025.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/55/c7/55c7d3d5788b8b98440ef50f6e228450.jpg",
    "bio": "José Márquez is an editor who has contributed to a number of projects, including “Pearson Spanish,” a series of 15 videos for Pearson’s Aula Abierto Elementary Spanish course; “The Best Men Can Be,” a series of short films for Gillette featuring ordinary men and their thoughts on masculinity; and “Growing Floret,” a miniseries about Floret farm for Chip and Joanna Gaines’ Magnolia Network. José grew up in a family of migrant workers in the Salinas Valley farming region of California. Hispanic culture and the area’s distinctive landscapes, as well as the high number of violent crimes, contributed to José’s passion for visual storytelling. When he’s not working, José enjoys creating art, trying to turn his home into a forest and spoiling his dog, Gus.",
    "rawBio": "<p><span>José Márquez is an editor who has contributed to a number of projects, including “Pearson Spanish,” a series of 15 videos for Pearson’s Aula Abierto Elementary Spanish course; “The Best Men Can Be,” a series of short films for Gillette featuring ordinary men and their thoughts on masculinity; and “Growing Floret,” a miniseries about Floret farm for Chip and Joanna Gaines’ Magnolia Network. José grew up in a family of migrant workers in the Salinas Valley farming region of California. Hispanic culture and the area’s distinctive landscapes, as well as the high number of violent crimes, contributed to José’s passion for visual storytelling. When he’s not working, José enjoys creating art, trying to turn his home into a forest and spoiling his dog, Gus.</span><br></p>",
    "linkedin": "https://www.linkedin.com/in/jos%C3%A9-m%C3%A1rquez-b60656107/",
    "twitter": null,
    "instagram": "https://www.instagram.com/itsjosemarquez/",
    "email": "jose.marquez@bluechalk.com"
  },
  {
    "id": 10,
    "name": "Maria Kjellstrand",
    "rawName": "Maria Kjellstrand (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Editor",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/66/ee/66ee4122f3d0f6bf7d6be0b5c323312a.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/5b/54/5b54cf3aacb6e640aaa33408b251398c.jpg",
    "bio": "Maria Kjellstrand is an editor who has been with Blue Chalk since 2016. She has worked on a number of projects, including “American Beat: Cops and Refugees Join Forces in Boise,” which aired on Idaho Public Television and won a Northwest Regional Emmy Award; “The Blackfeet Flood,” a documentary about the 1964 flood that devastated the Blackfeet Reservation in Montana; “Growing Floret,” a miniseries about Floret farm for Chip and Joanna Gaines’ Magnolia Network; and “Fix Me a Plate,” a Food Network web series hosted by chef Alex Guarnaschelli. A graduate of Carleton College in MN, Maria enjoys hiking in Portland’s Forest Park, borrowing way too many library books, and befriending other people’s dogs.",
    "rawBio": "<p><span><span>Maria Kjellstrand is an editor who has been with Blue Chalk since 2016. She has worked on a number of projects, including “American Beat: Cops and Refugees Join Forces in Boise,” which aired on Idaho Public Television and won a Northwest Regional Emmy Award; “The Blackfeet Flood,” a documentary about the 1964 flood that devastated the Blackfeet Reservation in Montana; “Growing Floret,” a miniseries about Floret farm for Chip and Joanna Gaines’ Magnolia Network; and “Fix Me a Plate,” a Food Network web series hosted by chef Alex Guarnaschelli. A graduate of Carleton College in MN, Maria enjoys hiking in Portland’s Forest Park, borrowing way too many library books, and befriending other people’s dogs.</span></span><br></p>",
    "linkedin": "https://www.linkedin.com/in/maria-kjellstrand-496278bb/",
    "twitter": "https://twitter.com/mariakjellstran",
    "instagram": null,
    "email": "maria.kjellstrand@bluechalk.com"
  },
  {
    "id": 11,
    "name": "Eric Maierson",
    "rawName": "Eric Maierson (He/Him)",
    "pronouns": "(He/Him)",
    "title": "Contributing Editor",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/9f/31/9f315b72298737f1b80723b857ec0f0a.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/7c/4c/7c4c4966601b235bb3ad4e0ae88a329d.jpg",
    "bio": "Eric Maierson is a writer and two-time Emmy-winning video editor and producer. His work has appeared on&nbsp;The New Times, The New Yorker, The Washington Post, and&nbsp;Time. Most recently he edited the first hour of a four-part series on veterans in America for PBS as well as the series \"Reset\"&nbsp;for&nbsp; Vice.tv . His work has received four Webby Awards, the Alfred I. Dupont-Columbia Award, the Edward R. Murrow Award, and 10 Emmy nominations, including two wins. Eric's short films have played at film festivals around the world, and his prose has appeared in&nbsp;The New Yorker, Playboy, Mountain Man Dance Moves: The McSweeney’s Book of Lists. He is also the writer and director of the critically acclaimed theatrical play \"Reprise.\" Originally from Houston, Eric earned his master of fine arts in creative writing at Emerson College. He lives in Brooklyn with his wife, Ellen, and their rascal dog, Beanie.",
    "rawBio": "<p>Eric Maierson is a writer and two-time Emmy-winning video editor and producer. His work has appeared on&nbsp;The New Times, The New Yorker, The Washington Post, and&nbsp;Time. Most recently he edited the first hour of a four-part series on veterans in America for PBS as well as the series \"Reset\"&nbsp;for&nbsp;<a href=\"http://vice.tv/\">Vice.tv</a>. His work has received four Webby Awards, the Alfred I. Dupont-Columbia Award, the Edward R. Murrow Award, and 10 Emmy nominations, including two wins. Eric's short films have played at film festivals around the world, and his prose has appeared in&nbsp;The New Yorker, Playboy, Mountain Man Dance Moves: The McSweeney’s Book of Lists. He is also the writer and director of the critically acclaimed theatrical play \"Reprise.\" Originally from Houston, Eric earned his master of fine arts in creative writing at Emerson College. He lives in Brooklyn with his wife, Ellen, and their rascal dog, Beanie.<br></p>",
    "linkedin": "https://www.linkedin.com/in/ericmaierson/",
    "twitter": "https://twitter.com/gboy",
    "instagram": null,
    "email": "eric.maierson@bluechalk.com"
  },
  {
    "id": 12,
    "name": "Ian Miller",
    "rawName": "Ian Miller (They/Them)",
    "pronouns": "(They/Them)",
    "title": "Associate Editor and Digital Asset Manager",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/a3/28/a32806dffdc04c3cc720fb5a3df2d58f.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/38/cc/38ccce9341e34006f31c0d2c4915c365.jpg",
    "bio": "Ian Miller is Associate Editor and Digital Asset Manager at Blue Chalk. They are a recent graduate of the University of Oregon with a major in journalism and minor in multimedia. Ian's fascination of nature, fine arts, and social&nbsp;and climate justice has led them to pursue a career in visual storytelling. Some of their recent work includes a large storytelling project with a science journalism class which documented and told the stories of the Holiday Farm Fire of 2020. Ian created a behind-the-scenes video of the project and a video story on a local firefighter and drone pilot who used&nbsp;his drone to prevent further destruction. Some of their favorite free-time passions are taking videos and photos of their adventures, writing music, playing guitar, collecting tattoos, and spending time with their partner and two fantastically strange dogs.&nbsp;",
    "rawBio": "<p>Ian Miller is Associate Editor and Digital Asset Manager at Blue Chalk. They are a recent graduate of the University of Oregon with a major in journalism and minor in multimedia. Ian's fascination of nature, fine arts, and social&nbsp;and climate justice has led them to pursue a career in visual storytelling. Some of their recent work includes a large storytelling project with a science journalism class which documented and told the stories of the Holiday Farm Fire of 2020. Ian created a behind-the-scenes video of the project and a video story on a local firefighter and drone pilot who used&nbsp;his drone to prevent further destruction. Some of their favorite free-time passions are taking videos and photos of their adventures, writing music, playing guitar, collecting tattoos, and spending time with their partner and two fantastically strange dogs.&nbsp;<br></p>",
    "linkedin": null,
    "twitter": null,
    "instagram": null,
    "email": "ian.miller@bluechalk.com"
  },
  {
    "id": 13,
    "name": "Isabella Brosel-Carlson",
    "rawName": "Isabella Brosel-Carlson (She/Her)",
    "pronouns": "(She/Her)",
    "title": "Business Development Intern",
    "image": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/d4/2b/d42bd78ceb43b3106e37f4c0696133e6.jpg",
    "hoverImage": "https://s3.amazonaws.com/bluechalk-prod-app/static/uploads/cache/3a/fa/3afaffda183d293ec48c618615b31afa.jpg",
    "bio": "Isabella Brosel-Carlson is a Business Development intern at Blue Chalk. She is currently pursuing a dual degree in International Business from Elon University and International Management from ESB Business School in Germany. Having lived in four different countries, Isabella thrives in multicultural environments and brings a distinct, global perspective to her work in business growth. Outside of the office, she enjoys exploring new cultures through travel, experimenting with new recipes, and dancing.",
    "rawBio": "<p><div>Isabella Brosel-Carlson is a Business Development intern at Blue Chalk. She is currently pursuing a dual degree in International Business from Elon University and International Management from ESB Business School in Germany. Having lived in four different countries, Isabella thrives in multicultural environments and brings a distinct, global perspective to her work in business growth. Outside of the office, she enjoys exploring new cultures through travel, experimenting with new recipes, and dancing.",
    "linkedin": "https://www.linkedin.com/in/isabella-brosel-carlson/",
    "twitter": null,
    "instagram": null,
    "email": "isabella.brosel@bluechalk.com"
  }
];

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const AboutPeopleData = () => {
  const [members, setMembers] = useState(fallbackMembers);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/team`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const sortedMembers = [...data.data].sort((first, second) => {
            const priority = (name) => {
              const normalizedName = name?.trim().toLowerCase();
              if (normalizedName === "greg moyer") return 0;
              if (normalizedName === "pam huling") return 1;
              return 2;
            };
            const priorityDifference = priority(first.name) - priority(second.name);
            if (priorityDifference !== 0) {
              return priorityDifference;
            }

            const firstOrder = Number(first.order);
            const secondOrder = Number(second.order);
            const firstHasOrder = Number.isFinite(firstOrder);
            const secondHasOrder = Number.isFinite(secondOrder);

            if (firstHasOrder && secondHasOrder) {
              return firstOrder - secondOrder;
            }

            if (firstHasOrder !== secondHasOrder) {
              return firstHasOrder ? -1 : 1;
            }

            return 0;
          });
          setMembers(sortedMembers);
        }
      } catch (error) {
        // Fallback members are already set
      }
    };
    fetchTeam();
  }, []);

  const handleToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className="staff about-content w-full lg:px-22 md:px-13 px-7">
      {/* Blue Chalk SVG Duotone Filter: Maps dark pixels to #1893D2 and highlights to #FFFFFF */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-filters"
        style={{ display: "none", position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <filter id="duotone">
          <feColorMatrix
            type="matrix"
            result="grayscale"
            values="1 0 0 0 0
                    1 0 0 0 0
                    1 0 0 0 0
                    0 0 0 1 0"
          />
          <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
            <feFuncR type="table" tableValues="0.094117 1" />
            <feFuncG type="table" tableValues="0.576470 1" />
            <feFuncB type="table" tableValues="0.823529 1" />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </svg>

      <h2>Meet the Team</h2>

      <ul>
        {members.map((member, index) => {
          const isSelected = selectedIndex === index;
          const imageSrc = getImageUrl(member.image);
          const hoverSrc = getImageUrl(member.hoverImage) || imageSrc;
          const memberTitle = member.title || member.position || "";
          const memberBio = member.bio || member.description || "";
          const displayName = member.name || member.rawName || "";
          const displayPronouns = member.pronouns || "";

          return (
            <li
              key={member.id || member._id || index}
              className={`a-staff ${isSelected ? "state-visible" : ""}`}
            >
              <div className="div-staff">
                {/* Photo Swap: duotone headshot swaps with B&W fun portrait on hover */}
                <div
                  className="staff-thumbnail has-fun"
                  onClick={() => handleToggle(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleToggle(index);
                    }
                  }}
                  aria-expanded={isSelected}
                  aria-label={`View ${displayName} bio`}
                >
                  <div
                    style={{ backgroundImage: `url(${imageSrc})` }}
                    className="image not-fun"
                  />
                  <div
                    style={{ backgroundImage: `url(${hoverSrc})` }}
                    className="image fun"
                  />
                </div>

                {/* Name & Title */}
                <div className="staff-info" onClick={() => handleToggle(index)}>
                  <h3>
                    {displayName} {displayPronouns ? `${displayPronouns}` : ""}
                  </h3>
                  {memberTitle && <span className="title">{memberTitle}</span>}
                </div>

                {/* Downward selection arrow pointing to opened bio */}
                <div className="selection-arrow-container">
                  <div className="selection-arrow" />
                </div>

                {/* Bio & Contact Details */}
                <div className="staff-info-container">
                  <div className="bio">
                    <p>{memberBio}</p>
                  </div>

                  <div className="staff-social-close">
                    {(member.linkedin || member.twitter || member.instagram || member.email) && (
                      <div className="staff-social">
                        <div className="contact-follow">CONTACT / FOLLOW:</div>
                        <div className="contact-icons">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${displayName} LinkedIn`}
                            >
                              <img
                                src="https://s3.amazonaws.com/bluechalk-prod-app/static/img/linkedin_dg_48.png"
                                alt="LinkedIn"
                                style={{
                                  filter:
                                    "brightness(0) saturate(100%) invert(43%) sepia(82%) saturate(822%) hue-rotate(165deg) brightness(96%) contrast(92%)",
                                }}
                              />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${displayName} Twitter`}
                            >
                              <img
                                src="https://s3.amazonaws.com/bluechalk-prod-app/static/img/twitter_dg_48.png"
                                alt="Twitter"
                                style={{
                                  filter:
                                    "brightness(0) saturate(100%) invert(43%) sepia(82%) saturate(822%) hue-rotate(165deg) brightness(96%) contrast(92%)",
                                }}
                              />
                            </a>
                          )}
                          {member.instagram && (
                            <a
                              href={member.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${displayName} Instagram`}
                            >
                              <svg
                                className="w-[24px] h-[24px]"
                                viewBox="0 0 24 24"
                                fill="#1893D2"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              aria-label={`Email ${displayName}`}
                            >
                              <img
                                src="https://s3.amazonaws.com/bluechalk-prod-app/static/img/newsletter_dg_48.png"
                                alt="Email"
                                style={{
                                  filter:
                                    "brightness(0) saturate(100%) invert(43%) sepia(82%) saturate(822%) hue-rotate(165deg) brightness(96%) contrast(92%)",
                                }}
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      className="close-div"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(null);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          setSelectedIndex(null);
                        }
                      }}
                    >
                      <span className="close-text">CLOSE</span>
                      <svg
                        className="close-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AboutPeopleData;
