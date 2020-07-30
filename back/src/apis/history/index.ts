import { Router } from "express";

import getDailyHistories from "./GetDailyHistories";

const historyRouter = Router();

/**
 * @api {get} /histories/daily/:year/:month  해당 연 월의 일별 수입지출 합산을 가져옴
 * @apiName GetDailyHistories
 * @apiGroup History
 *
 * @apiParam {Number} year  불러오고자 하는 연도
 * @apiParam {Number} month  불러오고자 하는 월
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  월별 하루당 수입 지출 정보
 */
historyRouter.get("/daily/:year/:month", getDailyHistories);

// Export the base-router
export default historyRouter;
