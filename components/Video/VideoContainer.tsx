import { useState } from "react";
import { VideoContainerProps } from "../../datatypes/proptypes";

import Canvas from "./Canvas";
import Video from "./Video";
import AlertDisplay from "./AlertDisplay";

import styles from "./Video.module.css";

const VideoContainer: React.FC<VideoContainerProps> = (props) => {
  const {
    videoRef,
    url,
    isOffline,
  } = props;
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
        {...props}
        setIsMotion={handleSetIsMotion}
        setIsAudio={handleSetIsAudio}
        isPlaying={isPlaying}
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
