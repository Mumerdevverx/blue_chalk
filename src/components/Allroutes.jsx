import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./landingpage/Home";
import Layout from "./layout/Layout";
import Navbar from "./layout/Navbar";
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
  const [isFromHome, setIsFromHome] = useState(false);
  const [isToHome, setIsToHome] = useState(false);
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
    const hash = location.hash;
    if (hash) {
      let attempts = 0;
      let timer;
      const targetId = hash.slice(1);
      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          const NAVBAR_HEIGHT = 70;
          const PADDING = 20;
          const top = target.getBoundingClientRect().top + window.scrollY - (NAVBAR_HEIGHT + PADDING);
          window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
          return;
        }
        if (attempts < 50) {
          attempts += 1;
          timer = window.setTimeout(scrollToTarget, 50);
        }
      };

      timer = window.setTimeout(scrollToTarget, 0);
      return () => window.clearTimeout(timer);
    }

    // Only scroll to top when there is NO hash
    window.scrollTo(0, 0);
  }, [displayedLocationKey, locationKey, location.hash]);

  useEffect(() => {
    if (locationKey === displayedLocationKey) return undefined;

    if (location.hash === "#careers") {
      setDisplayedLocation(location);
      setTransitionStage("idle");
      return undefined;
    }

    // Two-way navigation detection
    const fromHome = displayedLocation.pathname === "/";
    const toHome = location.pathname === "/";

    setIsFromHome(fromHome);
    setIsToHome(toHome);

    if (fromHome) {
      // Home -> Internal: navbar slides UP to top
      setDisplayedLocation(location);
      setTransitionStage("enter");
    } else if (toHome) {
      // Internal -> Home: navbar slides DOWN to bottom
      setDisplayedLocation(location);
      setTransitionStage("exit-to-home");
    } else {
      // Internal -> Internal: cross-fade content, navbar stays fixed
      setDisplayedLocation(location);
      setTransitionStage("internal");
    }
  }, [displayedLocationKey, location, locationKey]);

  useEffect(() => {
    if (transitionStage === "enter") {
      const timer = setTimeout(() => {
        setTransitionStage("idle");
        setIsFromHome(false);
      }, 550);
      return () => clearTimeout(timer);
    }
    if (transitionStage === "exit-to-home") {
      const timer = setTimeout(() => {
        setTransitionStage("idle");
        setIsToHome(false);
      }, 550);
      return () => clearTimeout(timer);
    }
    if (transitionStage === "internal") {
      const timer = setTimeout(() => {
        setTransitionStage("idle");
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [transitionStage]);

  return (
    <>
      {/* While returning to Home, render floating Navbar sliding down to bottom */}
      {isToHome && transitionStage === "exit-to-home" && (
        <Navbar isToHome={true} transitionStage="exit-to-home" />
      )}

      <Routes location={displayedLocation}>
        {/* Home – No Navbar & Footer */}
        <Route
          path="/"
          element={
            <Home isToHome={isToHome && transitionStage === "exit-to-home"} />
          }
        />

        {/* Layout Pages */}
        <Route
          element={
            <Layout
              isFromHome={isFromHome}
              isToHome={isToHome}
              transitionStage={transitionStage}
            />
          }
        >
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
          <Route path="/awards" element={<Awardpage />} />
          <Route path="/awards/:slug" element={<Awardpage />} />

          {/* OTHER */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Route>
      </Routes>
    </>
  );
};

export default Allroutes;