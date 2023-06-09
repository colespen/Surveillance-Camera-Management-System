import { VideoItemListProps } from "../../datatypes/proptypes";
import { VideoData } from "../../datatypes/datatypes";

import VideoItem from "./VideoItem";

import styles from "./Video.module.css";

const VideoItemList: React.FC<VideoItemListProps> = ({
  source,
  setIsTripped,
  threshold,
}) => {
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
            videos={videos}
            camNum={index}
            setIsTripped={setIsTripped}
            threshold={threshold}
          />
        )
      )}
    </div>
  );
};

export default VideoItemList;
