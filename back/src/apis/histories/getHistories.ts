import { Request, Response } from "express";

import HistoryDAO from "../../daos/HistoryDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { year, month } = req.params;
  const histories = await HistoryDAO.getHistories(year, month);

  const data = histories.map((history) => {
    const {
      id,
      date,
      category,
      paymentMethod,
      income,
      amount,
      detail,
    } = history;
    return {
      id,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      category,
      paymentMethod,
      income,
      amount,
      detail,
    };
  });
  console.log(histories);

  const ret = {
    success: true,
    data,
  };

  res.status(200).json(ret);
  return;
};
