import { useEffect, useRef, useState } from "react";
import { VideoItemProps } from "../datatypes/proptypes";
import Canvas from "./Canvas";
import Video from "./Video";

import styles from "./Video.module.css";

const VideoItem = ({ id, videos, camNum, setIsTripped }: VideoItemProps) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMotion, setIsMotion] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  // const [isTripped, setIsTripped] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // const [url, setUrl] = useState(selectedVideo.url);
  const selectedVideo = videos[selectedVideoIndex];
  const url = selectedVideo.url;
  const camera = selectedVideo.camera;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (!selectedVideo.url) {
        setIsOffline(true);
      } else {
        setIsOffline(false);
      }
    }
  }, [url]);

  const handleIsPlaying = (bool: boolean) => {
    setIsPlaying(bool);
  };
  const handleSetIsMotion = (bool: boolean) => {
    setIsMotion(bool);
  };
  const handleSetIsAudio = (bool: boolean) => {
    setIsAudio(bool);
  };
  const handleSetIsTripped = (bool: boolean) => {
    setIsTripped(bool);
  };

  const handleSelectVideo = (event) => {
    setSelectedVideoIndex(event.target.value);
  };

  return (
    <>
      <div className={styles.videoHeader}>
        <h3 className={styles.cameraHeader}>{camNum+1}{". "}{camera}</h3>

        <select
          className={styles.videoSelect}
          value={selectedVideoIndex}
          onChange={handleSelectVideo}
        >
          {videos.map((video, index) => (
            <option key={video.camera_id + index} value={index}>
              {video.createdAt}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.videoContainer}>
        <Video
          key={id}
          videoRef={videoRef}
          handleIsPlaying={handleIsPlaying}
          isMotion={isMotion}
          isAudio={isAudio}
          url={url}
          isOffline={isOffline}
        />
        {<Canvas
          videoRef={videoRef}
          setIsMotion={handleSetIsMotion}
          setIsAudio={handleSetIsAudio}
          setIsTripped={handleSetIsTripped}
          isPlaying={isPlaying}
          isOffline={isOffline}
          // id={video.id}
        />}
        <div className={styles.alerts}>
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
          <img
            className="alert-ico"
            src="./offline-alert.png"
            alt="offline alert"
            style={{ visibility: isOffline ? "visible" : "hidden" }}
          />
        </div>
      </div>
    </>
  );
};

export default VideoItem;