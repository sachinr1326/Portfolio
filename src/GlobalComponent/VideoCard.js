import React, { useEffect, useRef, useState } from "react";
import "./VideoCard.css";

export default function VideoCard(props) {
  const [muted, setMuted] = useState(true);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const videoRef = useRef(null);

  // Function to toggle mute/unmute
  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  // Function to update percentage played
  const updatePercentagePlayed = () => {
    const video = videoRef.current;
    const percentage = (video.currentTime / video.duration) * 100;
    setPercentagePlayed(percentage);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", updatePercentagePlayed);

    return () => {
      video.removeEventListener("timeupdate", updatePercentagePlayed);
    };
  }, []);

  return (
    <div className="ed-video-container-22">
      <div className="video-card" onClick={()=>props.ShowProjectDetail(props.result)}>
        <div className="padding-card">
          <div className="video-sec">
            <video
              ref={videoRef}
              className="video-tag"
              muted={muted}
              autoPlay
              loop
              playsInline
            >
              <source src={props.result.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mute-unmute" onClick={toggleMute}>
              {muted ? (
                <i className="fa-solid fa-volume-xmark"></i>
              ) : (
                <i className="fa-solid fa-volume-high"></i>
              )}
            </div>
            <div role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={{"--value": Math.round(percentagePlayed)}}></div>
          </div>
          <div className="content-sec">
            <div className="detail-sec">
            {props.result.name && <div className="name">{props.result.name}</div>}
{props.result.company && <div className="company">{props.result.company}</div>}
{props.result.year && <div className="year">{props.result.year}</div>}
{props.result.Tech && <div className="Tech">Tech:-{props.result.Tech}</div>}
{props.result.url && <div className="mb-2"><a href={props.result.url} className="url" rel="noreferrer"  target="_blank">go to project</a></div>}
              <div className="designation">{props.result.description[0].slice(0,100)}...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}