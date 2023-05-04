import { useEffect, useRef, useState } from "react";
import { VideoItemProps } from "../../datatypes/proptypes";

import VideoItemHeader from "./VideoItemHeader";
import VideoContainer from "./VideoContainer";

const VideoItem: React.FC<VideoItemProps> = ({
  videos,
  camNum,
  setIsTripped,
  threshold,
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isCamTripped, setCamIsTripped] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedVideo = videos[selectedVideoIndex];
  const url = selectedVideo.url;

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

  const handleSetIsTripped = (bool: boolean) => {
    setIsTripped(bool);
    setCamIsTripped(bool);
  };
  const handleSelectVideo = (event: any) => {
    setSelectedVideoIndex(event.target.value);
  };

  return (
    <>
      <VideoItemHeader
        videos={videos}
        isOffline={isOffline}
        isCamTripped={isCamTripped}
        camNum={camNum}
        selectedVideoIndex={selectedVideoIndex}
        handleSelectVideo={handleSelectVideo}
      />
      <VideoContainer
        videoRef={videoRef}
        setIsTripped={handleSetIsTripped}
        threshold={threshold}
        isOffline={isOffline}
        url={url}
      />
    </>
  );
};

export default VideoItem;
