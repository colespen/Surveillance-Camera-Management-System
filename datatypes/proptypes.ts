export interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: (bool: boolean) => void;
  setIsAudio: (bool: boolean) => void;
  setIsTripped: (bool: boolean) => void;
  isPlaying: boolean;
}

export interface DashboardProps {
  source: VideoData[];
}

export interface VideoItemListProps {
  source: VideoData[];
}

export interface VideoItemProps {
  id: number;
  videos: VideoData[];
}
