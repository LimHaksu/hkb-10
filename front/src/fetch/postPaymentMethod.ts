import getFetchHeaders from "../utils/getFetchHeaders";
import PaymentMethodModel from "../models/HistoryModel/InputForm/PaymentMethodModel";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const postPaymentMethod = async (
  userId: string,
  paymentMethod: { name: string }
) => {
  try {
    const headers = getFetchHeaders();
    const response = await fetch(`${baseUrl}/api/payment-method`, {
      mode: "cors",
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ userId, paymentMethod }),
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.log(error);
  }
};

export default postPaymentMethod;
