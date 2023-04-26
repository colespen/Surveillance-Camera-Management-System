const Video = ({ videoRef, handleIsPlaying, isMotion, isAudio, url }) => {
  return (
    <>
      <video
        // key={id}
        className="video-element"
        crossOrigin="anonymous"
        ref={videoRef}
        controls
        width="553px"
        height="315px"
        autoPlay
        loop
        onPlay={() => handleIsPlaying(true)}
        onPause={() => handleIsPlaying(false)}
        // onEnded={handleIsPlayFalse}
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
