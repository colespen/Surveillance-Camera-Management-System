import { VideoItemListProps } from "../datatypes/proptypes";
import VideoItem from "./VideoItem";

import styles from "./Video.module.css";

const VideoItemList = ({ source, setIsTripped }: VideoItemListProps) => {
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
      {Object.entries(videosById).map(
        ([id, videos]: [any, VideoData[]], index) => (
          <VideoItem
            key={id}
            id={id}
            videos={videos}
            camNum={index}
            setIsTripped={setIsTripped}
          />
        )
      )}
    </div>
  );
};

export default VideoItemList;
