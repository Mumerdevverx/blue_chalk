import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageLoader = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const currentPage = location.pathname;

    const visitedPages =
      JSON.parse(sessionStorage.getItem("visitedPages")) || [];

    // First visit to this page
    if (!visitedPages.includes(currentPage)) {
      setShowLoader(true);

      sessionStorage.setItem(
        "visitedPages",
        JSON.stringify([...visitedPages, currentPage])
      );

      // 3 complete cycles
      // 1 cycle = 2.1 seconds
      // 3 cycles = 6.3 seconds
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2500);

      return () => clearTimeout(timer);
    }

    setShowLoader(false);
  }, [location.pathname]);

  if (!showLoader) return null;

  return (
    <div className="page-loader">
      <div className="loader-horizontal"></div>
      <div className="loader-vertical"></div>
    </div>
  );
};

export default PageLoader;