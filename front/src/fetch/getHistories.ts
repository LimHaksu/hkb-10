import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const getHistories = async (userId: string, year: number, month: number) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(
      `${baseUrl}/api/histories/${userId}/${year}/${month}`,
      {
        mode: "cors",
        method: "GET",
        headers,
      }
    );
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getHistories;
