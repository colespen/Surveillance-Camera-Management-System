import { useState } from "react";
import { VideoContainerProps } from "../../datatypes/proptypes";

import Canvas from "./Canvas";
import Video from "./Video";
import AlertDisplay from "./AlertDisplay";

import styles from "./Video.module.css";

const VideoContainer: React.FC<VideoContainerProps> = ({
  videoRef,
  url,
  setIsTripped,
  threshold,
  isOffline,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMotion, setIsMotion] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);

  const handleIsPlaying = (bool: boolean) => {
    setIsPlaying(bool);
  };

  const handleSetIsMotion = (bool: boolean) => {
    setIsMotion(bool)
  };

  const handleSetIsAudio = (bool: boolean) => {
    setIsAudio(bool);
  };

  return (
    <div className={styles.videoContainer}>
      <Video
        videoRef={videoRef}
        url={url}
        setIsPlaying={handleIsPlaying}
        isMotion={isMotion}
        isAudio={isAudio}
      />
      <Canvas
        videoRef={videoRef}
        setIsMotion={handleSetIsMotion}
        setIsAudio={handleSetIsAudio}
        setIsTripped={setIsTripped}
        isPlaying={isPlaying}
        pixelDiffThreshold={threshold}
        isOffline={isOffline}
        url={url}
      />
      <AlertDisplay
        isAudio={isAudio}
        isMotion={isMotion}
        isOffline={isOffline}
      />
    </div>
  );
};

export default VideoContainer;
