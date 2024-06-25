import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever pathname changes (i.e., route changes)
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures useEffect runs whenever pathname changes

  return null; // This component doesn't render anything, it just handles scrolling behavior
};

export default ScrollToTop;
