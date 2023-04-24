import { useEffect, useRef } from "react";

interface CanvasProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  setIsMotion: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
}

const Canvas = ({ videoRef, setIsMotion, isPlaying }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let diffPixelsCount = 0;
    let previousFrame: ImageData | null = null;
    
    console.log("isPlaying: ", isPlaying);
    
    const drawInterval = setInterval(() => {
      if (!isPlaying) return () => clearInterval(drawInterval);
      diffPixelsCount = 0;
      ctx.drawImage(video, 0, 0, width, height);
      const currentFrame = ctx.getImageData(0, 0, width, height);


      if (previousFrame) {
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
        if (diffPixelsCount > 875) {
          setIsMotion(true);
        }
      }

      console.log("diffPixelsCount: ", diffPixelsCount);
      previousFrame = currentFrame;
      ctx.putImageData(currentFrame, 0, 0);
      // ctx.drawImage(video, 0, 0, width, height); // clears to orig vid frame
    }, 100);

    return () => clearInterval(drawInterval);
  }, [isPlaying]);

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

// import { useEffect, useRef } from "react";

// interface CanvasProps {
//   videoRef: React.MutableRefObject<HTMLVideoElement>;
//   setIsMotion: React.Dispatch<React.SetStateAction<boolean>>;
//   isPlaying: boolean;
// }

// const Canvas = ({ videoRef, setIsMotion, isPlaying }: CanvasProps) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const video = videoRef.current;
//     if (!video) return;

//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
//     if (!ctx) return;

//     const width = canvas.width;
//     const height = canvas.height;
//     const threshold = 225;
//     let diffPixelsCount = 0;
//     let previousFrame: ImageData | null = null;
    
//     let drawInterval: NodeJS.Timeout | null = null;

//     const handlePlay = () => {
//       console.log("video is playing");
//       drawInterval = setInterval(() => {
//         diffPixelsCount = 0;
//         ctx.drawImage(video, 0, 0, width, height);
//         const currentFrame = ctx.getImageData(0, 0, width, height);


//         if (previousFrame) {
//           for (let i = 0; i < currentFrame.data.length; i += 4) {
//             const r1 = previousFrame.data[i];
//             const g1 = previousFrame.data[i + 1];
//             const b1 = previousFrame.data[i + 2];

//             const r2 = currentFrame.data[i];
//             const g2 = currentFrame.data[i + 1];
//             const b2 = currentFrame.data[i + 2];
//             const pixelSum =
//               Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

//             if (pixelSum > threshold) {
//               diffPixelsCount++;
//               currentFrame.data[i] = 0;
//               currentFrame.data[i + 1] = 255;
//               currentFrame.data[i + 2] = 0;
//             }
//           }
//           if (diffPixelsCount > 875) {
//             setIsMotion(true);
//           }
//         }

//         // console.log("diffPixelsCount: ", diffPixelsCount);
//         previousFrame = currentFrame;
//         ctx.putImageData(currentFrame, 0, 0);
//         // ctx.drawImage(video, 0, 0, width, height); // clears to orig vid frame
//       }, 100);
//     }

//     video.addEventListener("play", handlePlay);

//     return () => {
//       clearInterval(drawInterval!);
//       video.removeEventListener("play", handlePlay);
//     }
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       width="543px"
//       height="305px"
//       style={{ border: `5px solid transparent` }}
//     />
//   );
// };

// export default Canvas;