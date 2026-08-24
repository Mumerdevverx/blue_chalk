import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./landingpage/Home";

import Layout from "./layout/Layout";

import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsBlogs from "./pages/NewsBlogs";
import Work from "./pages/Works";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import AllProjectwork from "./work/AllProjectwork";
import Workdetail from "./work/Workdetail";
import Awardpage from "./pages/Awardpage";


const Allroutes = () => {
  return (
    <Routes>

      {/* Home - No Navbar & Footer */}
      <Route path="/" element={<Home />} />

      {/* Other pages - Navbar & Footer automatically */}
      <Route element={<Layout />}>

        {/* <Route path="/" element={<About />} /> */}
        <Route path="/about" element={<About />} />

        <Route path="/work" element={<Work />} />

        <Route path="/news" element={<News />} />
        <Route path="/newsblogs" element={<NewsBlogs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-of-use" element={<TermsOfUse />} />

        {/* Work Categories */}
       
        <Route path="/work" element={<AllProjectwork />} />
         <Route path="/workdetail" element={<Workdetail />} />
          <Route path="/awardpage" element={<Awardpage />} />
        

      </Route>

    </Routes>
  );
};

export default Allroutes;