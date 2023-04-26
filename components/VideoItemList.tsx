import { RefObject, useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";

const VideoItemList = ({ source }) => {
  const VideoItem = ({ video }) => {
    const [isMotion, setIsMotion] = useState<boolean>(false);
    const [isAudio, setIsAudio] = useState<boolean>(false);
    const [isTripped, setIsTripped] = useState<boolean>(false);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const id = video.id;
    const url = video.url;

    const handleSetIsMotion = (bool: boolean) => {
      setIsMotion(bool);
    };
    const handleSetIsAudio = (bool: boolean) => {
      setIsAudio(bool);
    };
    const handleSetIsTripped = (bool: boolean) => {
      setIsTripped(bool);
    };

    return (
      <>
        <div className="video-container" style={{ display: "flex" }}>
          <video
            key={id}
            className="video-element"
            crossOrigin="anonymous"
            ref={videoRef}
            controls
            width="553px"
            height="315px"
            autoPlay
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            // onEnded={handleIsPlayFalse}
            // onEnded keeps state false on loop
            onSeeking={() => setIsPlaying(true)}
            onSeeked={() => setIsPlaying(false)}
            style={{
              border:
                `5px solid ` +
                (isMotion || isAudio ? "#ff0059" : "transparent"),
            }}
          >
            <source type="video/mp4" src={url} />
            Your browser does not support video html element.
          </video>
          <Canvas
            videoRef={videoRef}
            setIsMotion={handleSetIsMotion}
            setIsAudio={handleSetIsAudio}
            setIsTripped={handleSetIsTripped}
            isPlaying={isPlaying}
            // id={video.id}
          />
          <div
            className="alerts"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img
              className="alert-ico"
              src="./audio-alert.png"
              alt="audio alert"
              style={{ visibility: isAudio ? "visible" : "hidden" }}
            />
            <img
              className="alert-ico"
              src="./motion-alert.png"
              alt="audio alert"
              style={{ visibility: isMotion ? "visible" : "hidden" }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="videos-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {source.map((video: VideoData, i: number) => {
        return <VideoItem key={video.id + i} video={video} />;
      })}
    </div>
  );
};

export default VideoItemList;
