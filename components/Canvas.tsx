import { useEffect, useRef } from "react";

const Canvas = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threshold = 200;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let previousFrame: ImageData | null = null;

    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const currentFrame = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (previousFrame) {
        let differentPixelsCount = 0;

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const r1 = previousFrame.data[i];
          const g1 = previousFrame.data[i + 1];
          const b1 = previousFrame.data[i + 2];

          const r2 = currentFrame.data[i];
          const g2 = currentFrame.data[i + 1];
          const b2 = currentFrame.data[i + 2];

          if (
            Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) >
            threshold
          ) {
            differentPixelsCount++;
            currentFrame.data[i] = 0;
            currentFrame.data[i + 1] = 255;
            currentFrame.data[i + 2] = 0;
          }
        }
        if (differentPixelsCount > 1000) {
          // console.log("Motion detected!");
        }
      }
      previousFrame = currentFrame;

      ctx.putImageData(currentFrame, 0, 0);
    }, 500);
  }, []);
  return <canvas ref={canvasRef} width="543" height="305" />;
};

export default Canvas;



// OG
// import { useEffect, useRef } from "react";

// const Canvas = ({ videoRef }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   // const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
//   // const [isMotionDetected, setIsMotionDetected] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       return;
//     }
//     const video = videoRef.current;
//     if (!video) {
//       return;
//     }
//     const ctx = canvas.getContext("2d");
//     if (!ctx) {
//       return;
//     }
//     // context.fillStyle = 'blue'
//     // context.fillRect(0, 0, 100, 100);
//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     const drawMotion = () => {
//       console.log(canvas);
//       console.log("* drawMotion *");
//       let previousFrame: ImageData | null = null;

//       setInterval(() => {

//         ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);

//         const currentFrame = ctx.getImageData(
//           0,
//           0,
//           canvasWidth,
//           canvasHeight
//           );

//           if (previousFrame) {
//             let differentPixelsCount = 0;

//             for (let i = 0; i < currentFrame.data.length; i += 4) {
//             const r1 = previousFrame.data[i];
//             const g1 = previousFrame.data[i + 1];
//             const b1 = previousFrame.data[i + 2];

//             const r2 = currentFrame.data[i];
//             const g2 = currentFrame.data[i + 1];
//             const b2 = currentFrame.data[i + 2];

//             if (
//               Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) >
//               30
//             ) {
//               differentPixelsCount++;
//               currentFrame.data[i] = 0;
//               currentFrame.data[i + 1] = 255;
//               currentFrame.data[i + 2] = 0;
//             }
//           }
//           if (differentPixelsCount > 1000) {
//             // setIsMotionDetected(true);
//             // console.log("Motion detected!");
//           } else {
//             // setIsMotionDetected(false);
//           }
//         }
//         previousFrame = currentFrame;

//         // Draw the current frame on the canvas
//         ctx.putImageData(currentFrame, 0, 0);
//       }, 500);
//     };
//     drawMotion();
//   }, []);
//   return <canvas ref={canvasRef} width="543" height="305" />;
// };

// export default Canvas;

// import { useEffect, useRef } from "react";

// pixelation
// const Canvas = ({ videoRef }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       return;
//     }
//     const video = videoRef.current;
//     if (!video) {
//       return;
//     }
//     const ctx = canvas.getContext("2d");
//     if (!ctx) {
//       return;
//     }

//     const pixelate = (ctx: CanvasRenderingContext2D, size: number) => {
//       const width = ctx.canvas.width;
//       const height = ctx.canvas.height;

//       for (let x = 0; x < width; x += size) {
//         for (let y = 0; y < height; y += size) {
//           const imageData = ctx.getImageData(x, y, size, size);
//           const pixelCount = imageData.data.length / 4;
//           let red = 0;
//           let green = 0;
//           let blue = 0;

//           for (let i = 0; i < imageData.data.length; i += 4) {
//             red += imageData.data[i];
//             green += imageData.data[i + 1];
//             blue += imageData.data[i + 2];
//           }

//           const averageRed = red / pixelCount;
//           const averageGreen = green / pixelCount;
//           const averageBlue = blue / pixelCount;

//           for (let i = 0; i < imageData.data.length; i += 4) {
//             imageData.data[i] = averageRed;
//             imageData.data[i + 1] = averageGreen;
//             imageData.data[i + 2] = averageBlue;
//           }

//           ctx.putImageData(imageData, x, y);
//         }
//       }
//     };

//     const newDrawFn = () => {
//       console.log(canvas);

//       let previousFrame: ImageData | null = null;

//       setInterval(() => {
//         // Create temporary canvas for pixelation
//         const tempCanvas = document.createElement("canvas");
//         tempCanvas.width = canvas.width / 4; // Adjust pixelation size as needed
//         tempCanvas.height = canvas.height / 4;
//         const tempCtx = tempCanvas.getContext("2d");
//         if (!tempCtx) {
//           return;
//         }

//         // Draw video onto temporary canvas
//         tempCtx.drawImage(
//           video,
//           0,
//           0,
//           tempCanvas.width,
//           tempCanvas.height
//         );

//         // Draw pixelated frame onto main canvas
//         ctx.imageSmoothingEnabled = false;
//         ctx.drawImage(
//           tempCanvas,
//           0,
//           0,
//           tempCanvas.width,
//           tempCanvas.height,
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );

//         const currentFrame = ctx.getImageData(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );

//         if (previousFrame) {
//           let differentPixelsCount = 0;

//           for (let i = 0; i < currentFrame.data.length; i += 4) {
//             const r1 = previousFrame.data[i];
//             const g1 = previousFrame.data[i + 1];
//             const b1 = previousFrame.data[i + 2];

//             const r2 = currentFrame.data[i];
//             const g2 = currentFrame.data[i + 1];
//             const b2 = currentFrame.data[i + 2];

//             if (
//               Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) >
//               30
//             ) {
//               differentPixelsCount++;
//               currentFrame.data[i] = 0;
//               currentFrame.data[i + 1] = 255;
//               currentFrame.data[i + 2] = 0;
//             }
//           }
//           if (differentPixelsCount > 1000) {
//             // setIsMotionDetected(true);
//             // console.log("Motion detected!");
//           } else {
//             // setIsMotionDetected(false);
//           }
//         }
//         previousFrame = currentFrame;

//         // Draw the current frame on the canvas
//         ctx.putImageData(currentFrame, 0, 0);
//       }, 500);
//     };
//     newDrawFn();
//   }, []);
//   return <canvas ref={canvasRef} width="400" height="200" />;
// };

// export default Canvas;
