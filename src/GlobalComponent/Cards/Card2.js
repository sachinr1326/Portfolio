import React from 'react'
import demo from "../../image/demo.jpg"
import "./Card2.css"
function Card2(props) {
  return (
    <div className='sachin-card-2'>
     <div class="card-sachin">
    <img src={props.data.image} class="card__image" alt="Sachin Thakur" />
    <div class="card__overlay">
      <div class="card__header">
          <h3 class="card__title">{props.data.title}</h3>
      </div>
      <p class="card__description">{props.data.desc.slice(0,100)}...</p>
    </div>
  </div>
    </div>
  )
}
Card2.defaultProps = {
    data: {image:demo, title: "Enter Title", desc: "Enter Description here" },
  };
export default Card2
