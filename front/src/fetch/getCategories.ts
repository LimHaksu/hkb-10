const baseUrl = "http://localhost:3000/api";

const getCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/categories`, {
      mode: "cors",
      method: "GET",
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
