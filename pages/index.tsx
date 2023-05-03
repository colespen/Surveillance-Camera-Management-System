import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { videoData } from "../mock-data/videoData";

import { DashboardProps } from "../datatypes/proptypes";
import { thresholdEnum } from "../datatypes/datatypes";

import Layout from "../components/Layout";
import VideoItemList from "../components/Video/VideoItemList";

import styles from "./index.module.css";
import ThresholdSettings from "../components/ThresholdSettings";
import Title from "../components/Title";

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  return {
    props: { source: videoData },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ source }) => {
  const [isTripped, setIsTripped] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<thresholdEnum>("med");
  const { push } = useRouter();
  // // session: Session / undefined / null
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.loading}>
        <h1>Restricted Access</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    );
  }

  const handleSetIsTripped = (bool: boolean) => {
    setIsTripped(bool);
  };

  const handleThreshChange = (e) => {
    setThreshold(e.target.value);
  };

  console.log("isTripped in index:", isTripped);

  return (
    <Layout>
      <div className={styles.headerMain}>
        <Title isTripped={isTripped} />
        <ThresholdSettings
          handleThreshChange={handleThreshChange}
          threshold={threshold}
        />
      </div>
      <VideoItemList
        source={source}
        setIsTripped={handleSetIsTripped}
        threshold={threshold}
      />
    </Layout>
  );
};

export default Dashboard;
