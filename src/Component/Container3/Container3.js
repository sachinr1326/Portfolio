import { useEffect, useState } from "react";
import "./Container3.css";
import { container3 } from "../JsonData";
import TreeSkill from "../../GlobalComponent/TreeSkill";

function Container3() {
  const cardIndexes = [2, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 30, 32];
  const [activeIndex, setActiveIndex] = useState([]);
  const [mode, setMode] = useState(false);

  useEffect(() => {
if(!mode){
    const interval = setInterval(() => {
      // Select nine random indices from cardIndexes
      const randomIndexes = [];
      while (randomIndexes.length < 6) {
        const randomIndex =
          cardIndexes[Math.floor(Math.random() * cardIndexes.length)];
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      setActiveIndex(randomIndexes);
    }, 2000);
    return () => clearInterval(interval);
}
  }, [mode]); // Run once on component mount to set the initial active index and clear interval on unmount

  return (
    <section className="ed-internship-main-container-4" id="Skills">
      {/* {/ =============================container 5================= /} */}
      <div className="ed-internship-22-container-4">
        <div className="ed-net-img-20-sec-4"></div>
        {/* {/ =======================section 1==================== /} */}
        <div className="ed-internship-22-common-container">
          <div className="section-1">
            <h4 className="title ">{container3.title}</h4>
            <div className="mode-section">
              <div class="form-check form-switch">
                <input
                  className="form-check-input mode-switch"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={mode}
                  onChange={() => setMode(!mode)}
                />
                <label
                  className="form-check-label  switch-mode-text"
                  for="flexSwitchCheckChecked"
                >
                  Mode
                </label>
              </div>
            </div>
            <div className="ed-men-sec-1">
              <div className="sec-2">
                    {!mode?(
                <div className="grid-container">
  {Array.from({ length: 7 * 5 }, (_, index) => (
    <div key={index} className="grid-item">
      {cardIndexes.includes(index) ? ( // Check if index is in cardIndexes array
        <div
          className={`dm-flip-card2 ${
            activeIndex.includes(index) ? "active" : ""
          }`}
        >
          <div class="dm-front-card2 "></div>
          <div class="dm-back-card2 ">
            <span className="com-logo-img">
              {container3.logodata[index].skill}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  ))}
                </div>
                    ):(
                        <>
                        {Object.entries(container3.skills).map(([head, skillList]) => (
<TreeSkill head={head} skillList={skillList}/>

))}
</>
                    )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container3;
