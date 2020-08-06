import { Request, Response } from "express";
import CategoryDAO from "../../daos/CategoryDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const categories = await CategoryDAO.getCategories();

  const ret = {
    success: true,
    data: categories,
  };

  res.status(200).json(ret);
  return;
};
