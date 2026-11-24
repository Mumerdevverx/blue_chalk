import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlueChalkLoader from "./common/BlueChalkLoader";

const PageLoader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show authentic Blue Chalk loader briefly on page transitions (matching original core.js fadeOut)
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!showLoader) return null;

  return <BlueChalkLoader />;
};

export { BlueChalkLoader };
export default PageLoader;
