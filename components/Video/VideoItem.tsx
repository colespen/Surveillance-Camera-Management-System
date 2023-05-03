import { useEffect, useRef, useState } from "react";
import { VideoItemProps } from "../../datatypes/proptypes";
import Canvas from "./Canvas";
import Video from "./Video";
import AlertDisplay from "./AlertDisplay";

import styles from "./Video.module.css";

const VideoItem: React.FC<VideoItemProps> = ({
  id,
  videos,
  camNum,
  setIsTripped,
  threshold
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMotion, setIsMotion] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isCamTripped, setCamIsTripped] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    setCamIsTripped(bool);
  };

  const handleSelectVideo = (event: any) => {
    setSelectedVideoIndex(event.target.value);
  };

  return (
    <>
      <div className={styles.videoHeader}>
        <img
          className={styles.camAlertIcon}
          src={
            (isOffline ? "./grey" : isCamTripped ? "./red" : "./green") +
            "-circle.png"
          }
          alt="cam alert indicator"
        />
        <h3 className={styles.cameraHeader}>
          {camNum + 1}
          {". "}
          {camera}
        </h3>

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
          setIsPlaying={handleIsPlaying}
          isMotion={isMotion}
          isAudio={isAudio}
          url={url}
        />
        {
          <Canvas
            videoRef={videoRef}
            setIsMotion={handleSetIsMotion}
            setIsAudio={handleSetIsAudio}
            setIsTripped={handleSetIsTripped}
            isPlaying={isPlaying}
            pixelDiffThreshold={threshold}
          />
        }
        <AlertDisplay
          isAudio={isAudio}
          isMotion={isMotion}
          isOffline={isOffline}
        />
      </div>
    </>
  );
};

export default VideoItem;
