import getFetchHeaders from "../utils/getFetchHeaders";

const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

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
  userId: string,
  year: number,
  month: number
): Promise<ApiResponse> {
  let ret: ApiResponse = {
    success: false,
  };
  const headers = getFetchHeaders();
  await fetch(
    `${baseUrl}/api/histories/outcome/category/${userId}/${year}/${month}`,
    {
      mode: "cors",
      method: "GET",
      headers,
    }
  )
    .then((res) => res.json())
    .then((res: ApiResponse) => {
      ret = res;
    });

  return ret;
}

export default getDailyHistories;
export { ApiResponse, CategoryInfo };
