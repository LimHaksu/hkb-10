import { Request, Response } from "express";
import PaymentMethodDAO from "../../daos/PaymentMethodDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const { userId } = req.params;
  const paymentMethods = await PaymentMethodDAO.getPaymentMethods(userId);
  const ret = {
    success: true,
    data: paymentMethods,
  };

  res.status(200).json(ret);
  return;
};
