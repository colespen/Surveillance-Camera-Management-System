import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { DashboardProps } from "../datatypes/proptypes";
import { videoData } from "../mock-data/videoData";

import Layout from "../components/Layout";
import VideoItemList from "../components/VideoItemList";

import styles from "./index.module.css";

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  return {
    props: { source: videoData },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ source }) => {
  const [isTripped, setIsTripped] = useState<boolean>(false);
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

  const handleSetIsTripped = (bool: boolean) => {
    setIsTripped(bool);
  };

  return (
    <Layout>
      <div className={styles.headerMain}>
        <div className={styles.headerInner}>
          <h1>Surveillance Management System</h1>
          <img
            className={styles.mainIndicator}
            src={"./" + (isTripped ? "red" : "green") + "-circle.png"}
            alt="cam indicator1"
          ></img>
        </div>
      </div>
      <VideoItemList source={source} setIsTripped={handleSetIsTripped} />
    </Layout>
  );
};

export default Dashboard;
