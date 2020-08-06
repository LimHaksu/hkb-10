import { Request, Response } from "express";
import UserDAO from "../../daos/UserDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { id, password } = req.body;
  const result = await UserDAO.signupUser(id, password);

  const ret = {
    success: true,
    data: result,
  };

  res.status(200).json(ret);
  return;
};
