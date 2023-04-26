import { VideoItemListProps } from "../datatypes/proptypes";
import VideoItem from "./VideoItem";

import styles from "./Video.module.css";

const VideoItemList = ({ source }: VideoItemListProps) => {
  const videosById = {};

  source.forEach((video) => {
    if (!videosById[video.camera_id]) {
      videosById[video.camera_id] = [video];
    } else {
      videosById[video.camera_id].push(video);
    }
  });

  return (
    <div className={styles.videosContainer}>
      {Object.entries(videosById).map(([id, videos]: [any, VideoData[]]) => (
        <VideoItem key={id} id={id} videos={videos} />
      ))}
    </div>
  );
};

export default VideoItemList;
