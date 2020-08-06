import dummyData from "./PieChartDummyData";

const baseUrl = `${process.env.API_HOST}:${process.env.API_PORT}`;

type CategoryInfo = {
  value: number;
  title: string;
};

type ApiResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: CategoryInfo[];
    };

async function getDailyHistories(
  year: number,
  month: number
): Promise<ApiResponse> {
  const ret: ApiResponse = {
    success: true,
    data: dummyData,
  };

  return ret;
}

export default getDailyHistories;
export { ApiResponse, CategoryInfo };
