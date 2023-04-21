import React from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps, GetStaticPathsResult, GetStaticProps } from "next";
import Layout from "../components/Layout";
import { Session } from "next-auth";

// TODO: url[]
type DashboardProps = {
  data: {
    url1: string,
    url2: string
  };
};

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
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

        {/* // TODO: .map() VIDEOS nad associated urls */}
        <video controls width="543" height="305" autoPlay loop>
          <source type="video/mp4" src={data.url1} />
          Your browser does not support video html element.
        </video>
        <video controls width="543" height="305" autoPlay loop>
          <source type="video/mp4" src={data.url2} />
          Your browser does not support video html element.
        </video>
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
