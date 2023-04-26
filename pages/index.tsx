import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { DashboardProps } from "../datatypes/proptypes";

import Layout from "../components/Layout";
import VideoItemList from "../components/VideoItemList";

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  const videoData: VideoData[] = [
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-1.mp4" },
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-2.mp4" },
    { id: 1, url: "https://dunz8t440z7z8.cloudfront.net/loading-bay-3.mp4" },
    {
      id: 2,
      url: "https://dunz8t440z7z8.cloudfront.net/rear-entrance-no-mic.mp4",
    },
    {
      id: 3,
      url: "https://dunz8t440z7z8.cloudfront.net/rear-entrance-overhead.mp4",
    },
  ];
  return {
    props: { source: videoData },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ source }) => {
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

  return (
    <Layout>
      <h1>Surveillance Management System</h1>
      <VideoItemList source={source} />
    </Layout>
  );
};

export default Dashboard;
