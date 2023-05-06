import React from "react";

export default function Background() {
  return (
    <div className="videoContainer">
      <div className="overlay"></div>
      <video className="videoBg" src="/videoBg.mp4" autoPlay loop muted />
    </div>
  );
}
