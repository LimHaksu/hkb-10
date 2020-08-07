import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const deleteHistory = async (paymentMethodId: number) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(
      `${baseUrl}/api/payment-method/${paymentMethodId}`,
      {
        mode: "cors",
        method: "DELETE",
        headers,
      }
    );
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.log(error);
  }
};

export default deleteHistory;
