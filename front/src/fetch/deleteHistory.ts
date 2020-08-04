const baseUrl = "http://localhost:3000/api";

const deleteHistory = async (historyId: number) => {
  try {
    const response = await fetch(`${baseUrl}/history/${historyId}`, {
      mode: "cors",
      method: "DELETE",
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
