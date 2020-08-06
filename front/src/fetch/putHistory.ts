import { HistoryDataType } from "./";
import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const putHistory = async (userId: string, history: HistoryDataType) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(`${baseUrl}/api/history`, {
      mode: "cors",
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ userId, history }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default putHistory;
