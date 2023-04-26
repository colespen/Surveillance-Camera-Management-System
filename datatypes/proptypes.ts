export interface CanvasProps {
  // videoRef: HTMLVideoElement;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  // id: number;
  // videoRef: HTMLVideoElement[];
  // setIsMotion: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  setIsMotion: (bool: boolean) => void;
  setIsAudio: (bool: boolean) => void;
  setIsTripped: (bool: boolean) => void;
  isPlaying: boolean;
}

export interface DashboardProps {
  source: VideoData[];
}
