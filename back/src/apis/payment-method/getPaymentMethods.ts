import { Request, Response } from "express";
import PaymentMethodDAO from "../../daos/PaymentMethodDAO";

export default async (req: Request, res: Response): Promise<undefined> => {
  const paymentMethods = await PaymentMethodDAO.getPaymentMethods();
  console.log(paymentMethods);
  const ret = {
    success: true,
    data: paymentMethods,
  };

  res.status(200).json(ret);
  return;
};
