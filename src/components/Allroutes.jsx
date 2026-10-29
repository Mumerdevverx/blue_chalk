import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./landingpage/Home";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Aboutpartner from "./pages/aboutpartner";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsBlogs from "./pages/NewsBlogs";
import AllProjectwork from "./work/AllProjectwork";
import Workdetail from "./work/Workdetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Awardpage from "./pages/Awardpage";


const Allroutes = () => {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("idle");
  const locationKey = `${location.pathname}${location.search}${location.hash}`;
  const displayedLocationKey = `${displayedLocation.pathname}${displayedLocation.search}${displayedLocation.hash}`;

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [displayedLocationKey]);

  useEffect(() => {
    if (locationKey === displayedLocationKey) return undefined;

    setTransitionStage("exit");

    const timer = setTimeout(() => {
      setDisplayedLocation(location);
      setTransitionStage("enter");
    }, 450);

    return () => clearTimeout(timer);
  }, [displayedLocationKey, location, locationKey]);

  useEffect(() => {
    if (transitionStage !== "enter") return undefined;

    const timer = setTimeout(() => {
      setTransitionStage("idle");
    }, 550);

    return () => clearTimeout(timer);
  }, [transitionStage]);

  return (
    <div className={`route-transition route-transition-${transitionStage}`}>
      <Routes location={displayedLocation}>
        {/* Home – No Navbar & Footer */}
        <Route path="/" element={<Home />} />

        {/* Layout Pages */}
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/aboutpartner" element={<Aboutpartner />} />

          {/* WORK */}
          <Route path="/work" element={<AllProjectwork />} />          {/* ✅ Only one list route */}
          <Route path="/work/:slug" element={<Workdetail />} />       {/* ✅ Dynamic detail */}

          {/* NEWS */}
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsBlogs />} />

          {/* AWARDS */}
          <Route path="/awardpage" element={<Awardpage />} />
          <Route path="/awardpage/:slug" element={<Awardpage />} />

          {/* OTHER */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Allroutes;