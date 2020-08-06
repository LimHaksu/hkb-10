import { Request, Response, NextFunction } from "express";
import UserDAO from "../../daos/UserDAO";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<undefined> => {
  const { id, password } = req.body;

  await UserDAO.loginUser(id, password);

  next();
  return;
};
