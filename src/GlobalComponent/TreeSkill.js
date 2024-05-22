import React from 'react'
import "./TreeSkill.css"
function TreeSkill(props) {
  return (
    <div className='sachin-skill'>
        <div className='skill-head'>{props.head}</div>
        <div className='skill-skills'>
{props.skillList.map((res,index)=>(

<div key={index} className='skill-item'>{res}</div>
))}

        </div>
    </div>
  )
}

export default TreeSkill
