import { useEffect, useRef } from "react";
import {
  createAudioAnalyserCtx,
  analyzeAudio,
  analysePixelDiff,
} from "../../lib/utils";
import { CanvasProps } from "../../datatypes/proptypes";

import styles from "./Video.module.css";

const Canvas: React.FC<CanvasProps> = ({
  videoRef,
  setIsMotion,
  setIsAudio,
  setIsTripped,
  isPlaying,
  pixelDiffThreshold,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const isMotionSetRef = useRef<boolean>(false);
  const isAudioSetRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    createAudioAnalyserCtx(
      video,
      audioElementRef,
      audioContextRef,
      analyserNodeRef
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = videoRef.current;
    if (!video) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let diffThresh = 0;
    if (pixelDiffThreshold === "high") {
      diffThresh = 175;
    } else if (pixelDiffThreshold === "low") {
      diffThresh = 40;
    } else {
      diffThresh = 105;
    }

    const width = canvas.width;
    const height = canvas.height;
    const threshold = 120;
    let diff = 0, diffPixelsCount = 0;
    let prevDiffPixelsCount = 0, tempDiffPixelsCount = 0;
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

        if (prevDiffPixelsCount > diffThresh) {
          if (!isMotionSetRef.current) {
            setIsMotion(true);
            setIsTripped(true);
            isMotionSetRef.current = true;
          }
        } else {
          if (isMotionSetRef.current) {
            setIsMotion(false);
            isMotionSetRef.current = false;
          }
        }
      }
      previousFrame = currentFrame;
      ctx.putImageData(currentFrame, 0, 0);
      analyzeAudio(
        isPlaying,
        audioContextRef,
        analyserNodeRef,
        isAudioSetRef,
        setIsAudio,
        setIsTripped
      );
      // this will draw orig video frame again thus clearing green pixel data
      // ctx.drawImage(video, 0, 0, width, height); 
    }, 90);
    return () => clearInterval(drawInterval);
  }, [videoRef.current, isPlaying, pixelDiffThreshold]);

  return (
    <canvas
      className={styles.canvasElement}
      ref={canvasRef}
      width="543px"
      height="305px"
    />
  );
};

export default Canvas;
