import { Request, Response } from "express";

import dummyData from "./getHistoriesDummy";

export default async (req: Request, res: Response): Promise<undefined> => {
  // const { year, month } = req.params;

  const ret = {
    success: true,
    data: dummyData,
  };

  res.status(200).json(ret);
  return;
};
