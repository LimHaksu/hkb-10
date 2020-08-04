const baseUrl = `${process.env.API_HOST}:${process.env.API_PORT}`;

interface HistoryDataType {
  year: number;
  month: number;
  day: number;
  category: string;
  paymentMethod: string;
  income: boolean;
  amount: number;
  detail: string;
}

const getHistories = async (year: number, month: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/histories/${year}/${month}`, {
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

export { getHistories, HistoryDataType };
