import React from "react";
// Import the image if it's not in the public folder
import Untitled from "../../assets/Untitled.png";

const HeroSection = () => {
  return (
    <div className="herosection">
      <img className="h-40 lg:h-full" src={Untitled} alt="Hero Image" />
    </div>
  );
};

export default HeroSection;
