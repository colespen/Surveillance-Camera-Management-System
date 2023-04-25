import { useCallback, useEffect, useRef } from "react";

interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  setIsAudio: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  isPlaying: boolean;
}

const Canvas = ({
  videoRef,
  setIsMotion,
  setIsAudio,
  isPlaying,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const isMotionSetRef = useRef<boolean>(false);
  const isAudioSetRef = useRef<boolean>(false);

  const createAnalyserCtx = useCallback((video: HTMLVideoElement) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      // Create a separate audio element for audio analysis
      audioElementRef.current = new Audio();
      audioElementRef.current.crossOrigin = "anonymous";
      audioElementRef.current = video;

      const source = audioContextRef.current.createMediaElementSource(
        audioElementRef.current
      );
      analyserNodeRef.current = audioContextRef.current.createAnalyser();
      analyserNodeRef.current.fftSize = 512;
      analyserNodeRef.current.minDecibels = -90;
      analyserNodeRef.current.maxDecibels = -10;
      analyserNodeRef.current.smoothingTimeConstant = 0.85;

      source.connect(analyserNodeRef.current);
      analyserNodeRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  const analyzeAudio = () => {
    if (!isPlaying) {
      return () => clearTimeout(analyzeDelay);
    }
    audioContextRef.current.resume();

    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeRef.current.getByteFrequencyData(dataArray);

    const average =
      dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

    // console.log("average: ", average);
    // Set audio flag based on the decibel value
    if (average > 8) {
      if (!isAudioSetRef.current) {
        setIsAudio(true);
        isAudioSetRef.current = true;
      }
    } else {
      if (isAudioSetRef.current) {
        setIsAudio(false);
        isAudioSetRef.current = false;
      }
    }
    
    // Check audio flag every 100ms
    const analyzeDelay = setTimeout(analyzeAudio, 100);
    return () => clearTimeout(analyzeDelay);
  };

  //////////////
  //////////////

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    createAnalyserCtx(video);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = videoRef.current;
    if (!video) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const threshold = 120;

    let diff = 0;
    let diffPixelsCount = 0;
    let prevDiffPixelsCount = 0;
    let tempDiffPixelsCount = 0;
    let previousFrame: ImageData | null = null;
    // ctx.drawImage(video, 0, 0, width, height); // this will reset to orig. frame

    const drawInterval = setInterval(() => {
      if (!isPlaying) {
        return () => clearInterval(drawInterval);
      }
      ctx.drawImage(video, 0, 0, width, height);
      const currentFrame = ctx.getImageData(0, 0, width, height);
      diffPixelsCount = 0;

      if (previousFrame && isPlaying) {
        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const r1 = previousFrame.data[i];
          const g1 = previousFrame.data[i + 1];
          const b1 = previousFrame.data[i + 2];

          const r2 = currentFrame.data[i];
          const g2 = currentFrame.data[i + 1];
          const b2 = currentFrame.data[i + 2];
          const pixelSum =
            Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

          if (pixelSum > threshold) {
            diffPixelsCount++;
            currentFrame.data[i] = 0;
            currentFrame.data[i + 1] = 255;
            currentFrame.data[i + 2] = 0;
          }
        }
        diff = diffPixelsCount - tempDiffPixelsCount;
        tempDiffPixelsCount = diffPixelsCount;
        prevDiffPixelsCount = diff;

        // console.log("prevDiffPixelsCount: ", prevDiffPixelsCount)
        if (prevDiffPixelsCount > 86) {
          if (!isMotionSetRef.current) {
            // console.log("setIsMotion(true)");
            setIsMotion(true);
            isMotionSetRef.current = true;
          }
        } else {
          ctx.drawImage(video, 0, 0, width, height);
          if (isMotionSetRef.current) {
            // console.log("setIsMotion(false)");
            setIsMotion(false);
            isMotionSetRef.current = false;
          }
        }
      }
      previousFrame = currentFrame;
      ctx.putImageData(currentFrame, 0, 0);
    }, 100);

    analyzeAudio();
    return () => clearInterval(drawInterval);
  }, [videoRef.current, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width="543px"
      height="305px"
      style={{ border: `5px solid transparent` }}
    />
  );
};

export default Canvas;
