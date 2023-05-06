import { useCallback, useEffect, useMemo, useRef } from "react";
import { createAudioAnalyserCtx, analyzeAudio } from "../../lib/audioUtils";
import { analysePixelDiff } from "../../lib/drawUtils";
import { createAlertThrottle } from "../../services/createAlert";
import { CanvasProps } from "../../datatypes/proptypes";
import styles from "./Video.module.css";
import { AlertType } from "@prisma/client";

const Canvas: React.FC<CanvasProps> = ({
  videoRef,
  setIsMotion,
  setIsAudio,
  setIsTripped,
  isPlaying,
  threshold,
  isOffline,
  url,
  cameraId,
  isMotion,
  isAudio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMotionSetRef = useRef<boolean>(false);
  const isAudioSetRef = useRef<boolean>(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserNodeRef = useRef<AnalyserNode | null>(null);

  const createAlert = useMemo(
    () => ({
      sound: createAlertThrottle(cameraId, AlertType.SOUND),
      motion: createAlertThrottle(cameraId, AlertType.MOTION),
    }),
    [cameraId]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    createAudioAnalyserCtx(
      video,
      audioElementRef,
      audioContextRef,
      audioAnalyserNodeRef
    );
  }, []);

  // call /api/alerts create alert entry in db
  useEffect(() => {
    if (isAudio) {
      createAlert.sound();
    }
    if (isMotion) {
      createAlert.motion();
    }
  }, [isAudio, isMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = videoRef.current;
    if (!video) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let diffThreshSet = 0;
    if (threshold === "high") {
      diffThreshSet = 175;
    } else if (threshold === "low") {
      diffThreshSet = 40;
    } else {
      diffThreshSet = 105;
    }

    const width = canvas.width;
    const height = canvas.height;
    const diffThresholdDraw = diffThreshSet + 15;
    let diff = 0;
    let diffPixelsCount = 0;
    let prevDiffPixelsCount = 0;
    let tempDiffPixelsCount = 0;
    let previousFrame: ImageData | null = null;

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
          diffThresholdDraw,
          diffPixelsCount
        );

        diff = diffPixelsCount - tempDiffPixelsCount;
        tempDiffPixelsCount = diffPixelsCount;
        prevDiffPixelsCount = diff;

        if (prevDiffPixelsCount > diffThreshSet) {
          if (!isMotionSetRef.current) {
            setIsMotion(true);
            setIsTripped(true);
            isMotionSetRef.current = true;
            console.log("setIsMotion(true)");
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

      const average = analyzeAudio(audioContextRef, audioAnalyserNodeRef);
      // Set audio alert based on the decibel value
      if (average > 9) {
        // do not set to true repeatedly if already true
        if (!isAudioSetRef.current) {
          setIsAudio(true);
          setIsTripped(true);
          isAudioSetRef.current = true;
          console.log("setIsAudio(true)");
        }
      } else {
        if (isAudioSetRef.current) {
          const setFalseDelay = setTimeout(() => {
            setIsAudio(false);
            isAudioSetRef.current = false;
          }, 750);
          return () => clearTimeout(setFalseDelay);
        }
      }
    }, 90);
    return () => clearInterval(drawInterval);
  }, [videoRef.current, isPlaying, threshold, url]);

  return (
    <canvas
      className={styles.canvasElement}
      ref={canvasRef}
      width="543px"
      height="305px"
      style={{ visibility: !isOffline ? "visible" : "hidden" }}
    />
  );
};

export default Canvas;
