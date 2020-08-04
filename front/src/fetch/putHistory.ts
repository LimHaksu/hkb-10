import { HistoryDataType } from "./";
const baseUrl = "http://localhost:3000/api";

const putHistory = async (history: HistoryDataType) => {
  try {
    const response = await fetch(`${baseUrl}/history`, {
      mode: "cors",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

export default putHistory;
