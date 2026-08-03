import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./landingpage/Home";

import Layout from "./layout/Layout";

import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Work from "./pages/Works";

const Allroutes = () => {
  return (
    <Routes>

      {/* Home - No Navbar & Footer */}
      <Route path="/" element={<Home />} />

      {/* Other pages - Navbar & Footer automatically */}
      <Route element={<Layout />}>

        <Route path="/about" element={<About />} />

        <Route path="/work" element={<Work />} />

        <Route path="/news" element={<News />} />

        <Route path="/contact" element={<Contact />} />

      </Route>

    </Routes>
  );
};

export default Allroutes;