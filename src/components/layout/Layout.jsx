import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ isFromHome = false, isToHome = false, transitionStage = "idle" }) => {
  return (
    <>
      <Navbar
        isFromHome={isFromHome}
        isToHome={isToHome}
        transitionStage={transitionStage}
      />

      <div
        className={
          isFromHome && transitionStage === "enter"
            ? "content-transition-from-home"
            : transitionStage === "internal"
            ? "content-transition-internal"
            : ""
        }
      >
        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;