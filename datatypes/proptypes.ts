import { VideoData, thresholdEnum } from "./datatypes";

export interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: (bool: boolean) => void;
  setIsAudio: (bool: boolean) => void;
  setIsTripped: (bool: boolean) => void;
  isPlaying: boolean;
  pixelDiffThreshold: thresholdEnum;
  isOffline: boolean;
  url: string;
}

export interface DashboardProps {
  source: VideoData[];
}

export interface VideoItemHeaderProps {
  videos: VideoData[];
  isOffline: boolean;
  isCamTripped: boolean;
  camNum: number;
  selectedVideoIndex: number;
  handleSelectVideo: (event: any) => void;
}

export interface VideoContainerProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  url: string;
  setIsTripped: (bool: boolean) => void;
  threshold: thresholdEnum;
  isOffline: boolean;
}

export interface VideoItemListProps {
  source: VideoData[];
  setIsTripped: (bool: boolean) => void;
  threshold: thresholdEnum;
}

export interface VideoItemProps {
  videos: VideoData[];
  camNum: number;
  setIsTripped: (bool: boolean) => void;
  threshold: thresholdEnum;
}

export interface VideoProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  isMotion: boolean;
  isAudio: boolean;
  setIsPlaying: (bool: boolean) => void;
  url: string;
}

export interface AlertDisplayProps {
  isAudio: boolean;
  isMotion: boolean;
  isOffline: boolean;
}

export interface ThresholdSettingsProps {
  handleThreshChange: (e: any) => void;
  threshold: thresholdEnum;
}
