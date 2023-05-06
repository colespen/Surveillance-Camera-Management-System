import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { AlertType } from "@prisma/client";

// interface AlertCreateInput {
//   cameraId: number;
//   type: AlertType;
// }

interface AlertRequestBody {
  cameraId: number;
  type: AlertType;
}
// TODO: must be protected route
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");

  const { method } = req;
  switch (method) {
    case "GET":
      break;

    case "POST":
      if (!req.body) {
        res.status(400).json({ message: "alert couldn't be created" });
      }
      const { cameraId, type } = req.body as AlertRequestBody;
      const newAlert = await prisma.alert.create({
        data: {
          cameraId,
          type,
        },
      });
      console.log("alert created: ", newAlert);
      res.status(200).json(newAlert)
      break;
  }
};

export default handler;
