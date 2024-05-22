import { useEffect, useState } from "react";
import Card1 from "../../GlobalComponent/Cards/Card1";
import Card2 from "../../GlobalComponent/Cards/Card2";
import { container2 } from "../JsonData";
import "./Container2.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import card1 from "../../image/card1.png";
import card2 from "../../image/card2.png";
function Container2() {
  const [show, setShow] = useState(false);
  const [slectedCard, setSlectedCard] = useState("card1");

  const changeCard = (card) => {
    setSlectedCard(card);
    setShow(false);
  };
  const [activeCards, setActiveCards] = useState([]);

  useEffect(() => {
    // Function to randomly select 4 cards
    const selectRandomCards = () => {
      const indices = [...Array(container2.cardDetails.length).keys()];
      const shuffled = indices.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    setActiveCards(selectRandomCards());

    const interval = setInterval(() => {
      setActiveCards(selectRandomCards());
    }, 3000);

    return () => clearInterval(interval);
  }, [container2.cardDetails.length]);

  return (
    <section className="ed-intern-container-9" id="Services">
      {/* {/ =============================container 10================= /} */}
      <div className="ed-intrn-detail-22-container-10">
        {/* {/ =======================section 1==================== /} */}
        <div className="ed-intrn-detail-22-common-container">
          <div className="section-1">
            <h4 className="title">{container2.title}</h4>
            <OverlayTrigger
              trigger="click"
              show={show}
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom-service`}>
                  <Popover.Header as="h3" className="header">{`Change Cards`}</Popover.Header>
                  <Popover.Body>
                    <div className="sachin-card-designs">
                      <div
                        className={`card-select ${
                          slectedCard === "card1" ? "active" : ""
                        } `}
                        onClick={() => changeCard("card1")}
                      >
                        <img src={card1} alt="Sachin Thakur" />
                        <span className="active-card">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </div>
                      <div
                        className={`card-select ${
                          slectedCard === "card2" ? "active" : ""
                        } `}
                        onClick={() => changeCard("card2")}
                      >
                        <img src={card2} alt="Sachin Thakur" />
                        <span className="active-card">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <div className="text-center mb-5">
                <span className="try-me" onClick={() => setShow(!show)}>
                  Try me
                </span>
              </div>
            </OverlayTrigger>
            <div className="card-sec-1">
              {container2.cardDetails.map((res, index) => (
                <>
                  {slectedCard === "card1" && <Card1 key={index} data={res}  isActive={activeCards.includes(index)} />}
                  {slectedCard === "card2" && <Card2 key={index} data={res} />}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container2;
