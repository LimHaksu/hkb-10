import { Router } from "express";

import postHistory from "./postHistory";

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
historyRouter.post("/", postHistory);

// Export the base-router
export default historyRouter;
