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
  let ret: ApiResponse = {
    success: false,
  };

  await fetch(`${baseUrl}/api/histories/outcome/category/${year}/${month}`, {
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
export { ApiResponse, CategoryInfo };
