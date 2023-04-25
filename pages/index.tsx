import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";

import Layout from "../components/Layout";
import Canvas from "../components/Canvas";

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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMotion, setIsMotion] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  // const videoRef2 = useRef<HTMLVideoElement>(null);
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

  const handleSetIsMotion = (
    bool: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsMotion(bool);
  };
  const handleSetIsAlert = (
    bool: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsAlert(bool);
  };
  const handleSetIsAudio = (
    bool: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsAudio(bool);
  };

  // console.log("isMotion: ", isMotion)
  // console.log("isAudio: ", isAudio)

  return (
    <Layout>
      <div className="page">
        <h1>Surveillance Management System</h1>
        {/* // TODO: .map() VIDEOS and associated urls */}
        <video
          className="video"
          crossOrigin="anonymous"
          ref={videoRef1}
          controls
          width="553px"
          height="315px"
          autoPlay
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onSeeking={() => setIsPlaying(true)}
          onSeeked={() => setIsPlaying(false)}
          style={{
            border: `5px solid ` + (isMotion ? "#ff0059" : "transparent"),
          }}
        >
          <source type="video/mp4" src={data.url1} />
          Your browser does not support video html element.
        </video>
        {/* <video
          className="video"
          crossOrigin="anonymous"
          ref={videoRef2}
          controls
          width="553px"
          height="315px"
          autoPlay
          loop
          style={{ border: `5px solid transparent` }}
        >
          <source type="video/mp4" src={data.url2} />
          Your browser does not support video html element.
        </video> */}
        {/* Motion Map: */}
        <Canvas
          videoRef={videoRef1}
          setIsMotion={handleSetIsMotion}
          setIsAudio={handleSetIsAudio}
          isPlaying={isPlaying}
        />
        {/* Score: */}
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
