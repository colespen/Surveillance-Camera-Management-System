import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { DashboardProps } from "../datatypes/proptypes";

import Layout from "../components/Layout";
import VideoItemList from "../components/VideoItemList";
// import Canvas from "../components/Canvas";

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  
  const videoData: VideoData[] = [
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-1.mp4" },
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-2.mp4" },
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-3.mp4" },
    { id: 2, url: "https://dunz8t440z7z8.cloudfront.net/rear-entrance-no-mic.mp4" },
    { id: 3, url: "https://dunz8t440z7z8.cloudfront.net/rear-entrance-overhead.mp4" },
  ];
  return {
    props: { source: videoData },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ source }) => {
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [isMotion, setIsMotion] = useState<boolean>(false);
  // const [isAudio, setIsAudio] = useState<boolean>(false);
  // const [isTripped, setIsTripped] = useState<boolean>(false);
  // const videoRef = useRef<HTMLVideoElement>(null);

  // console.log(source);

  const { push } = useRouter();
  // session: Session / undefined / null
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/api/auth/signin");
    },
  });

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

  // const handleSetIsMotion = (
  //   bool: boolean | ((prevState: boolean) => boolean)
  // ) => {
  //   setIsMotion(bool);
  // };
  // const handleSetIsAudio = (
  //   bool: boolean | ((prevState: boolean) => boolean)
  // ) => {
  //   setIsAudio(bool);
  // };
  // const handleSetIsTripped = (
  //   bool: boolean | ((prevState: boolean) => boolean)
  // ) => {
  //   setIsTripped(bool);
  // };

  // console.log("isMotion: ", isMotion)
  // console.log("isAudio: ", isAudio)

  return (
    <Layout>
        <h1>Surveillance Management System</h1>
      {/* <div className="video-container"> */}
        {/* // TODO: .map() VIDEOS and associated urls */}
        <VideoItemList
          // setIsPlaying={setIsPlaying}
          // videoRef={videoRef}
          // isMotion={isMotion}
          // isAudio={isAudio}
          source={source}
        />
        {/* <video
          className="video"
          crossOrigin="anonymous"
          ref={videoRef}
          controls
          width="553px"
          height="315px"
          autoPlay
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          // onEnded={() => setIsPlaying(false)}
          // onEnded keep state false on when loop
          onSeeking={() => setIsPlaying(true)}
          onSeeked={() => setIsPlaying(false)}
          style={{
            border:
              `5px solid ` + (isMotion || isAudio ? "#ff0059" : "transparent"),
          }}
        >
          <source type="video/mp4" src={source[0].url} />
          Your browser does not support video html element.
        </video> */}
        {/* <Canvas
          videoRef={videoRef}
          setIsMotion={handleSetIsMotion}
          setIsAudio={handleSetIsAudio}
          setIsTripped={handleSetIsTripped}
          isPlaying={isPlaying}
        /> */}
        {/* Motion Map */}
        <span id="score"></span>
      {/* </div> */}
      {/* <div className="alerts">
        <img
          className="alert-ico"
          src="./audio-alert.png"
          alt="audio alert"
          style={{ visibility: isAudio ? "visible" : "hidden" }}
        />
        <img
          className="alert-ico"
          src="./motion-alert.png"
          alt="audio alert"
          style={{ visibility: isMotion ? "visible" : "hidden" }}
        />
      </div> */}
    </Layout>
  );
};

export default Dashboard;
