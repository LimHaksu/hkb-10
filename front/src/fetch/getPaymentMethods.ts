const baseUrl = `${process.env.API_HOST}:${process.env.API_PORT}`;

const getPaymentMethods = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/payment-method`, {
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

export default getPaymentMethods;
