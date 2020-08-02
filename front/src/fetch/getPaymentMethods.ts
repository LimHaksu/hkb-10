const baseUrl = "http://localhost:3000/api";

interface PaymentMethodDataType {
  name: string;
}

const getPaymentMethods = async () => {
  try {
    const response = await fetch(`${baseUrl}/payment-method`, {
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

export { getPaymentMethods, PaymentMethodDataType };
