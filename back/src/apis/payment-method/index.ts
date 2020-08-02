import { Router } from "express";

import getPaymentMethods from "./getPaymentMethods";

const paymentMethodRouter = Router();

/**
 * @api {get} /payment-method
 * @apiName SelectPaymentMethod
 * @apiGroup PaymentMethods
 *
 * @apiSuccess {boolean} success 추가 성공 여부
 * @apiSuccess {Object} data 결제 수단 리스트
 */
paymentMethodRouter.get("/", getPaymentMethods);

// Export the base-router
export default paymentMethodRouter;
