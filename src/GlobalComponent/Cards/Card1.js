import React from "react";
import "./Card1.css"
function Card1(props) {
  return (
    <div className={`sachin-card-1 ${props.isActive ? "active" : ""}`}>
      <h3 class="card__title-1 mb-4">{props.data.title}</h3>
      <p class="card__description-1">{props.data.desc}</p>
    </div>
  );
}
Card1.defaultProps = {
  data: { title: "Enter Title", desc: "Enter Description here" },
};

export default Card1;
