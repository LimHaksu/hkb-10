import { Request, Response } from "express";
import UserDAO from "../../daos/UserDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { id, password } = req.body;

  // 아이디 중복될 경우 false 리턴
  const idInDB = await UserDAO.findUserById(id);
  if (idInDB) {
    const ret = {
      success: false,
      data: "conflictId",
    };
    res.status(409).json(ret);
    return;
  }
  const result = await UserDAO.signupUser(id, password);

  const ret = {
    success: true,
    data: result,
  };

  res.status(200).json(ret);
  return;
};
