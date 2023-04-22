import React, { useEffect, useRef, useState } from "react";
import { ReactPropTypes } from "react";
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
  const { push } = useRouter();
  // session is Session / undefined / null
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/api/auth/signin");
    },
  });

  const videoRef = useRef<HTMLVideoElement>(null);

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
        <Canvas videoRef={videoRef} />
        {/* <canvas
          id="motion"
          ref={canvasRef}
          style={{ width: 400, height: 200 }}
        ></canvas> */}
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
