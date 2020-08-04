import data from "./dummyData";

const baseUrl = "http://localhost:3000";

type DateInfo = {
  date: number;
  amount: number;
};

type DataType = {
  year: number;
  month: number;
  dates: DateInfo[];
};

type ApiResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: DataType;
    };

async function getDailyHistories(
  year: number,
  month: number
): Promise<ApiResponse> {
  const ret: ApiResponse = {
    success: true,
    data: data,
  };

  return ret;
}

export default getDailyHistories;
export { ApiResponse, DataType, DateInfo };
