import { useEffect, useRef } from "react";

interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: React.Dispatch<React.SetStateAction<boolean>>;
  isMotion: boolean;
  isPlaying: boolean;
}

const Canvas = ({
  videoRef,
  isMotion,
  setIsMotion,
  isPlaying,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMotionSetRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = videoRef.current;
    if (!video) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const threshold = 225;
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

        if (prevDiffPixelsCount > 115) {
          if (!isMotionSetRef.current) {
            console.log("setIsMotion(true)");
            setIsMotion(true);
            isMotionSetRef.current = true;
          }
        } else {
          if (isMotionSetRef.current) {
            console.log("setIsMotion(false)");
            setIsMotion(false);
            isMotionSetRef.current = false;
          }
        }
      }
      previousFrame = currentFrame;
      ctx.putImageData(currentFrame, 0, 0);
    }, 100);
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
