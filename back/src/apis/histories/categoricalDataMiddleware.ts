import { Request, Response } from "express";
import getCategoricalData from "../../services/getCategoricalData";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { userId, year, month } = req.params;

  const data = await getCategoricalData(userId, Number(year), Number(month));

  const ret = {
    success: true,
    data: data,
  };

  res.status(200).json(ret);
  return;
};
