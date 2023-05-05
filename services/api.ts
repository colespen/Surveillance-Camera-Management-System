//////  API Calls
const port = process.env.NEXT_PUBLIC_PATH || 3000;
const host = process.env.NEXT_PUBLIC_HOST;
const path = host + port;

const createAlertData = async (alertData: any) => {

  const response = await fetch(path + "/api/alerts", {
    method: "POST",
    body: JSON.stringify(alertData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to save data");
  }
  const data = await response.json();
  return data;
};

export { createAlertData };
