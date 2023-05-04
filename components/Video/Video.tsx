import { VideoProps } from "../../datatypes/proptypes";
import styles from "./Video.module.css";

const Video: React.FC<VideoProps> = ({
  videoRef,
  setIsPlaying,
  isMotion,
  isAudio,
  url,
}) => {
  return (
    <>
      <video
        className={styles.videoElement}
        data-testid="video"
        crossOrigin="anonymous"
        ref={videoRef}
        // width="553px"
        // height="315px"
        autoPlay
        controls
        poster={"./video-placeholder.png"}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // manually loop to prevent canvas draw diff
        onEnded={() => videoRef.current.play()}
        style={{
          border:
            `5px solid ` + (isMotion || isAudio ? "#ff0059" : "transparent"),
        }}
      >
        <source type="video/mp4" src={url} />
        Your browser does not support video html element.
      </video>
    </>
  );
};
export default Video;
