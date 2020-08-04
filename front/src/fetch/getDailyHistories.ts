const baseUrl = "http://localhost:3000";

type DateInfo = {
  day: number;
  income: number;
  outcome: number;
};

type DateData = {
  year: number;
  month: number;
  data: DateInfo[];
};

type ApiResponse =
  | {
      success: false;
    }
  | {
      success: true;
      data: DateData;
    };

async function getDailyHistories(
  year: number,
  month: number
): Promise<ApiResponse> {
  let ret: ApiResponse = {
    success: false,
  };

  await fetch(`${baseUrl}/api/histories/daily/${year}/${month}`, {
    mode: "cors",
    method: "GET",
  })
    .then((res) => res.json())
    .then((res: ApiResponse) => {
      ret = res;
    });

  return ret;
}

export default getDailyHistories;
export { ApiResponse, DateData, DateInfo };
