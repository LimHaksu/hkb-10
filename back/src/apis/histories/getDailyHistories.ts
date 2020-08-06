import { Request, Response } from "express";
import getCalenderData from "../../services/getCalenderData";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { year, month } = req.params;

  const data = await getCalenderData(Number(year), Number(month));

  const ret = {
    success: true,
    data: data,
  };

  res.status(200).json(ret);
  return;
};
