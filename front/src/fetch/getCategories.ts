import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = "http://localhost:3000/api";

const getCategories = async () => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(`${baseUrl}/categories`, {
      mode: "cors",
      method: "GET",
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

export default getCategories;
