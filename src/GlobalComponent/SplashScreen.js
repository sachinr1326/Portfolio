import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import { TypeAnimation } from "react-type-animation";
function SplashScreen(props) {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [closesplash,setCloseSplash]=useState(false);

  useEffect(() => {
    // Start the first animation after a short delay
    setShowFirst(true);
  }, []);

  const handleFirstComplete = () => {
    // Start the second animation after the first completes
    setShowSecond(true);
  };

  const handleSecondComplete = () => {
    // Start the third animation after the second completes
    setShowThird(true);
  };

  const handleThirdComplete = () => {
    setCloseSplash(true)
  };
  return (
    <div className={`sachin-splash-screen-container  ${closesplash?"hide":""}`} >
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="circle-3"></div>
      <div className="spl-container-1">
        {/* <div className="ed-net-img-20-sec-4"></div> */}
        <span className="name-head">
          &#x1F44B; Hey there!{" "}
          {showFirst && (
            <TypeAnimation
              sequence={["I'm Sachin Thakur,", 500, handleFirstComplete]}
              wrapper="span"
              className="name"
              speed={5}
              repeat={0}
            />
          )}
        </span>
        <span className="and">
          {showSecond && (
            <TypeAnimation
              sequence={["and", 500, handleSecondComplete]}
              wrapper="span"
              className="and"
              speed={1}
              repeat={0}
            />
          )}
        </span>
        <span className="slogan spinIn">
          {showThird && (
            <TypeAnimation
              sequence={["welcome to my Portfolio.", 1000, handleThirdComplete]}
              wrapper="span"
              className="slogan"
              speed={5}
              repeat={0}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default SplashScreen;
