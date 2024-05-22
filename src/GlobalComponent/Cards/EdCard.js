import React from 'react'
import "./EdCard.css"
function EdCard(props) {
  return (
    <div className='sachin-edcard-1'>
      
<div class={`plx-card gold  ${props.isleft?"left":""}`}>
  <div class="pxc-bg" style={{backgroundImage:`url(${props.data.image})`}}>
  <div class="pxc-stopper"> </div>
     </div>
  <div class="pxc-avatar"><span className='icon-ed'>{props.data.icon}</span></div>
  <div class="pxc-subcard">
    <div class="university">{props.data.degree}</div>
    <div class="college-name">{props.data.college}</div>
    <div class="college-address"><i className="fa-solid fa-location-dot me-1"></i> {props.data.address}</div>
    <div className='year-perc-sec'>
    <div class="pass-out-year"><i className="fa-regular fa-calendar me-1"></i> {props.data.year}</div>
    <div class="persentage">{props.data.percent}</div>

    </div>
 
  </div>
  {/* <div class="pxc-avatar"><span className='icon-ed'>{props.data.icon}</span></div> */}

</div>
    </div>
  )
}


export default EdCard
