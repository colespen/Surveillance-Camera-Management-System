import { useCallback, useEffect, useRef } from "react";
import { analysePixelDiff } from "../lib/utils";
import { CanvasProps } from "../datatypes/proptypes";

const Canvas = ({
  // id,
  videoRef,
  setIsMotion,
  setIsAudio,
  setIsTripped,
  isPlaying,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const isMotionSetRef = useRef<boolean>(false);
  const isAudioSetRef = useRef<boolean>(false);

  const createAudioAnalyserCtx = useCallback((video: HTMLVideoElement) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      // audioContextRef.current.resume();
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

    // Set audio flag based on the decibel value
    if (average > 9) {
      if (!isAudioSetRef.current) {
        setIsAudio(true);
        setIsTripped(true);
        isAudioSetRef.current = true;
      }
    } else {
      if (isAudioSetRef.current) {
        setIsAudio(false);
        isAudioSetRef.current = false;
      }
    }
    // Check audio flag every 100ms
    const analyzeDelay = setTimeout(analyzeAudio, 200);
    return () => clearTimeout(analyzeDelay);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    createAudioAnalyserCtx(video);
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
        diffPixelsCount = analysePixelDiff(
          currentFrame,
          previousFrame,
          threshold,
          diffPixelsCount
        );
        diff = diffPixelsCount - tempDiffPixelsCount;
        tempDiffPixelsCount = diffPixelsCount;
        prevDiffPixelsCount = diff;
        // console.log("prevDiffPixelsCount: ", prevDiffPixelsCount)
        if (prevDiffPixelsCount > 100) {
          if (!isMotionSetRef.current) {
            // console.log("setIsMotion(true)");
            setIsMotion(true);
            setIsTripped(true);
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
    }, 90);

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
