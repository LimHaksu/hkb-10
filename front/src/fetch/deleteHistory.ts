import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const deleteHistory = async (historyId: number) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(`${baseUrl}/history/${historyId}`, {
      mode: "cors",
      method: "DELETE",
      headers,
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteHistory;
