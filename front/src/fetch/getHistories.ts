const baseUrl = "http://localhost:3000/api";

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
    const response = await fetch(`${baseUrl}/histories/${year}/${month}`, {
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
