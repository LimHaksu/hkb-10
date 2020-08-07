import { Router } from "express";

import getPaymentMethods from "./getPaymentMethods";
import postPaymentMethod from "./postPaymentMethod";
import deletePaymentMethod from "./deletePaymentMethod";

import passport from "passport";

const paymentMethodRouter = Router();

/**
 * @api {get} /payment-method
 * @apiName SelectPaymentMethod
 * @apiGroup PaymentMethod
 *
 * @apiSuccess {boolean} success 조회 성공 여부
 * @apiSuccess {Object} data 결제 수단 리스트
 */
paymentMethodRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getPaymentMethods
);

/**
 * @api {post} /payment-method
 * @apiName CreatePaymentMethod
 * @apiGroup PaymentMethod
 *
 * @apiParam {String} [name] 결제수단 이름
 * @apiParam {String} [userId] 결제수단 관리하는 유저 아이디
 *
 * @apiSuccess {boolean} success 추가 성공 여부
 */
paymentMethodRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postPaymentMethod
);

/**
 * @api {delete} /payment-method/:id  해당 id를 가진 결제수단을 삭제함
 * @apiName DeletePaymentMethod
 * @apiGroup PaymentMethod
 *
 * @apiParam {Number} id  삭제하고자 하는 결제수단의 id
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 */
paymentMethodRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePaymentMethod
);

// Export the base-router
export default paymentMethodRouter;
