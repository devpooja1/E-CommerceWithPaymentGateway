import React from 'react';
import Video from "../images/video.mp4";
// import "../css/auto.css"
const AutoPlayVideo = () => {
  return (
    <div className='video-container' >
      <video
        width="100%"  
        height="100%"
         
        autoPlay
        loop
        muted
        playsInline
        src={Video} 
        
      />
    </div>
  );
}

export default AutoPlayVideo;
