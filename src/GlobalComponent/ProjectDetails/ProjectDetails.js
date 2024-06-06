import React from 'react'
import "./ProjectDetails.css"
import { useToast } from '../ToastContext';
function ProjectDetails(props) {
  const { showToast } = useToast();
  const handleUrl=(text)=>{
    showToast("Info", text);
  }
  return (
    <div className='sachin-project-detail'>
       <div className="video-sec">
            <video
              className="video-tag"
              autoPlay
              controls
              playsInline
            >
              <source src={props.data.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="detail-sec">
            {props.data.name && <div className="name">{props.data.name}</div>}
{props.data.company && <div className="company">{props.data.company}</div>}
{props.data.year && <div className="year">{props.data.year}</div>}
{props.data.Tech && <div className="Tech">Tech:-{props.data.Tech}</div>}
{props.data.url && <div className="mb-2">
  {props.data.url.length > 1?(
  <a onClick={()=>handleUrl(props.data.url[1])} className="url" rel="noreferrer"  target="_blank">go to project</a>

):(
  <a href={props.data.url} className="url" rel="noreferrer"  target="_blank">go to project</a>

  )}
  
  </div>}
              <ul className="designation">
  {props.data.description.map((res,index)=>(
<li key={index}>{res}</li>

  ))}

  </ul>
            </div>
    </div>
  )
}

export default ProjectDetails
