import { VideoData, thresholdEnum } from "./datatypes";

export interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: (bool: boolean) => void;
  setIsAudio: (bool: boolean) => void;
  setIsTripped: (bool: boolean) => void;
  isPlaying: boolean;
  pixelDiffThreshold: thresholdEnum;
}

export interface DashboardProps {
  source: VideoData[];
}

export interface VideoItemListProps {
  source: VideoData[];
  setIsTripped: (bool: boolean) => void;
  threshold: thresholdEnum;
}

export interface VideoItemProps {
  id: number;
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