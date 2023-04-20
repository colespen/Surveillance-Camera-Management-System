import React from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";

// TODO: types!
type DashboardProps = {
  data: any;
  session: any;
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  ctx
) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const res = await fetch("http://localhost:3000/api/uploadVideo");
  // const data = await res.json();
  const data = { url: URL.createObjectURL(await res.blob()) };
  // console.log("data: ", data)

  return {
    props: {
      data,
      session,
    },
  };
};

const Dashboard: React.FC<DashboardProps> = ({ data, session }) => {
  const { push } = useRouter();
  const { status } = useSession({
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
      <Layout>
        <h1>Restricted Access</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Surveillance Management System</h1>
        <video controls width="543" height="305" autoPlay loop>
          <source
            src="./loading-bay-1.mp4"
            type="video/mp4"
            // src={data.url}
          />
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
