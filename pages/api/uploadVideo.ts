// import type { NextApiRequest, NextApiResponse } from "next";
// import AWS from "aws-sdk";
// import stream from "stream";

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

// const params = {
//   Bucket: "surveillance-management-system",
//   Key: "loading-bay-1.mp4",
//   // Key: "https://surveillance-management-system.s3.us-east-2.amazonaws.com/loading-bay-1.mov",
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { Body } = await s3.getObject(params).promise();
//     const videoStream = new stream.PassThrough();
//     videoStream.end(Body);
//     res.setHeader("Content-Type", "video/mp4");
//     videoStream.pipe(res);

//     // console.log("videoStream.pipe(res): ", videoStream.pipe(res));

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
