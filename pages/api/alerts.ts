// import { getServerSession } from "next-auth/react";
// import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { AlertType } from "@prisma/client";

interface AlertCreateInput {
  cameraId: number;
  type: AlertType;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession({ req });
  // if (session) {
  // Signed in
  // console.log("Session", JSON.stringify(session, null, 2));
  res.setHeader("Content-Type", "application/json");

  const { method } = req;
  switch (method) {
    case "GET":
      break;

    case "POST":
      if (!req.body) {
        res.status(400).json({ message: "alert couldn't be created" });
      }
      const { cameraId, type } = req.body;
      const newAlert = await prisma.alert.create({
        data: {
          cameraId,
          type,
        } as AlertCreateInput,
      });
      console.log("alerted created: ", newAlert);
      res.status(200).json(newAlert)
      break;
  }
  // } else {
  //   // Not Signed in
  //   res.status(401).send("not authenticated");
  // }
  res.end();
};

export default handler;