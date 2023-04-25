export interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  setIsAudio: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  setIsTripped: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  isPlaying: boolean;
}


