import { createAlertData } from "./api";
import { throttle } from "../lib/throttle";
import { AlertType } from "@prisma/client";

const createAlertThrottle = (cameraId: number, type: AlertType) => {
  const createAlert = () => {
    createAlertData({
      cameraId,
      type,
    });
  };
  const throttledAlert = throttle(createAlert, 5000);
  throttledAlert();
  // console.log("alertData in Canvas: ", alertData)
};

export { createAlertThrottle };
