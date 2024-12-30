import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled beyond threshold
  const checkScroll = () => {
    setIsVisible(window.pageYOffset > 200);
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? "visible" : ""}`} onClick={scrollToTop}>
      <FaChevronUp className="scroll-icon" />
    </div>
  );
};

export default ScrollToTop;
