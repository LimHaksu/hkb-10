import { Request, Response } from "express";
import PaymentMethodDAO from "../../daos/PaymentMethodDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { id } = req.params;
  const result = await PaymentMethodDAO.removePaymentMethod(id);

  //todo.. result === true일때 데이터 리턴 어떻게 할 것인가

  const ret = {
    success: true,
  };

  res.status(200).json(ret);
  return;
};
