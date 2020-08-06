import { Router } from "express";

import postHistory from "./postHistory";
import putHistory from "./putHistory";
import deleteHistory from "./deleteHistory";

import passport from "passport";

const historyRouter = Router();

/**
 * @api {post} /history  새로운 내역을 추가함
 * @apiName CreateHistory
 * @apiGroup History
 *
 * @apiParam {Date} [date] 결제 날짜
 * @apiParam {String} [category] 카테고리
 * @apiParam {String} [paymentMethod]  내역의 결제 수단
 * @apiParam {Number} [amount]  내역의 금액
 * @apiParam {String} [content]  내역의 내용
 * @apiParam {Bolean} [is_income] 수입:true, 지출:false
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  새로 생성한 내역
 */
historyRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postHistory
);

/**
 * @api {put} /history  기존 내역을 수정함
 * @apiName EditHistory
 * @apiGroup History
 *
 * @apiParam {Number} [id] 수정할 내역 id 값
 * @apiParam {Date} [date] 결제 날짜
 * @apiParam {String} [category] 카테고리
 * @apiParam {String} [paymentMethod]  내역의 결제 수단
 * @apiParam {Number} [amount]  내역의 금액
 * @apiParam {String} [content]  내역의 내용
 * @apiParam {Bolean} [is_income] 수입:true, 지출:false
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  수정후 내역
 */
historyRouter.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  putHistory
);

/**
 * @api {delete} /history/:id  해당 id를 가진 내역을 갱신함
 * @apiName DeleteHistory
 * @apiGroup History
 *
 * @apiParam {Number} id  삭제하고자 하는 내역의 id
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  삭제한 내역의 데이터
 */
historyRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteHistory
);

// Export the base-router
export default historyRouter;
