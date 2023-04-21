import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";

import Layout from "../components/Layout";

// TODO: url[]
type DashboardProps = {
  data: {
    url1: string;
    url2: string;
  };
};

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  // TODO: url[]
  const videoFeeds = {
    url1: "https://dunz8t440z7z8.cloudfront.net/loading-bay-1.mp4",
    url2: "https://dunz8t440z7z8.cloudfront.net/loading-bay-2.mp4",
  };
  return {
    props: { data: videoFeeds },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { push } = useRouter();
  // session is Session / undefined / null
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/api/auth/signin");
    },
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMotionDetected, setIsMotionDetected] = useState(false);
  
  // const detectMotion = () => {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const scaler = 50;
  //   if (video && canvas) {
  //     const ctx = canvas.getContext("2d");
  //     const w = canvas.width;
  //     const h = canvas.height;
  //     ctx.drawImage(video, 0, 0, w, h);
  //     var data = ctx.getImageData(0, 0, w, h).data;
  
  //     if (prevFrameData) {
  //       let motionDetected = false;
  //       for (let i = 0; i < data.length; i += 4 * scaler) {
  //         const avg1 = (prevFrameData[i] + prevFrameData[i + 1] + prevFrameData[i + 2]) / 3;
  //         const avg2 = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //         const diff = Math.abs(avg1 - avg2);
  //         if (diff > 100) {
  //           motionDetected = true;
  //           break;
  //         }
  //       }
  //       setIsMotionDetected(motionDetected);
  //     }
  //     prevFrameData = data;
  //   }
  //   window.requestAnimationFrame(detectMotion);
  // };
  
  // useEffect(() => {
  //   window.requestAnimationFrame(detectMotion);
  // }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
  
    if (!video) {
      return;
    }
  
    const ctx = canvas.getContext("2d")!;
    let previousFrame: ImageData | null = null;
  
    setInterval(() => {
      // if (video.paused || video.ended) {
      //   return;
      // }
      // Draw the video on the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      if (previousFrame) {
        let differentPixelsCount = 0;
  
        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const r1 = previousFrame.data[i];
          const g1 = previousFrame.data[i + 1];
          const b1 = previousFrame.data[i + 2];
  
          const r2 = currentFrame.data[i];
          const g2 = currentFrame.data[i + 1];
          const b2 = currentFrame.data[i + 2];
  
          if (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) > 30) {
            differentPixelsCount++;
            currentFrame.data[i] = 0;
            currentFrame.data[i + 1] = 255;
            currentFrame.data[i + 2] = 0;
          }
        }
  
        if (differentPixelsCount > 100) {
          setIsMotionDetected(true);
          console.log("Motion detected!");
        } else {
          setIsMotionDetected(false);
        }
      }
  
      previousFrame = currentFrame;
  
      // Draw the current frame on the canvas
      ctx.putImageData(currentFrame, 0, 0);
    }, 500);
  }, []);
  

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (!session) {
    return (
      <>
        <h1>Restricted Access</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Surveillance Management System</h1>
        {/* // TODO: .map() VIDEOS and associated urls */}
        <video
          className="video"
          crossOrigin="anonymous"
          ref={videoRef}
          controls
          width="543"
          height="305"
          autoPlay
          loop
        >
          <source type="video/mp4" src={data.url1} />
          Your browser does not support video html element.
        </video>
        <video
          className="video"
          crossOrigin="anonymous"
          controls
          width="543"
          height="305"
          autoPlay
          loop
        >
          <source type="video/mp4" src={data.url2} />
          Your browser does not support video html element.
        </video>
        Motion Map:
        <canvas
          id="motion"
          ref={canvasRef}
          style={{ width: 400, height: 200 }}
        ></canvas>
        Score:
        <span id="score"></span>
      </div>

      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
