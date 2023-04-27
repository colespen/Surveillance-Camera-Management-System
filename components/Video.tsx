import styles from "./Video.module.css";

const Video = ({ videoRef, handleIsPlaying, isMotion, isAudio, url }) => {

  return (
    <>
      <video
        className={styles.videoElement}
        crossOrigin="anonymous"
        ref={videoRef}
        // width="50%"
        // height="auto"
        // width="553px"
        // height="315px"
        controls
        autoPlay
        loop
        onPlay={() => handleIsPlaying(true)}
        onPause={() => handleIsPlaying(false)}        
        // onEnded={() => handleIsPlaying(false)}
        // onEnded keeps state false on loop
        onSeeking={() => handleIsPlaying(true)}
        onSeeked={() => handleIsPlaying(false)}
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
