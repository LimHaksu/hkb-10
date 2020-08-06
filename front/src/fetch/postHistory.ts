import { HistoryDataType } from "./";
import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const postHistory = async (history: HistoryDataType) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(`${baseUrl}/history`, {
      mode: "cors",
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(history),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default postHistory;
