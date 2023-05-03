import { VideoData } from "./datatypes";

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
  setIsTripped: (bool: boolean) => void;
}

export interface VideoItemProps {
  id: number;
  videos: VideoData[];
  camNum: number;
  setIsTripped: (bool: boolean) => void;
}

export interface VideoProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  isMotion: boolean;
  isAudio: boolean;
  setIsPlaying: (bool: boolean) => void;
  url: string;
}
