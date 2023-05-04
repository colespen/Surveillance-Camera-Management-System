import { VideoItemHeaderProps } from "../../datatypes/proptypes";

import styles from "./Video.module.css";

const VideoItemHeader: React.FC<VideoItemHeaderProps> = ({
  videos,
  isOffline,
  isCamTripped,
  camNum,
  selectedVideoIndex,
  handleSelectVideo,
}) => {
  const camera = videos[selectedVideoIndex].camera;

  return (
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
  );
};

export default VideoItemHeader;
