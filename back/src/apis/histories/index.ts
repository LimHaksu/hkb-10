import { Router } from "express";

import getDailyHistories from "./getDailyHistories";
import categoricalDataMiddleware from "./categoricalDataMiddleware";
import dailyOutcomeMiddleWare from "./dailyOutcome";

import getHistories from "./getHistories";

import passport from "passport";

const historiesRouter = Router();

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
historiesRouter.get("/daily/:userId/:year/:month", getDailyHistories);

/**
 * @api {get} /histories/outcome/daily/:year/:month  해당 연 월의 일별 지출 합산을 가져옴
 * @apiName GetDailyOutcomeHistories
 * @apiGroup History
 *
 * @apiParam {Number} year  불러오고자 하는 연도
 * @apiParam {Number} month  불러오고자 하는 월
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Array<{date: number, amount: number}>} data  월별 하루당 지출 정보
 */
historiesRouter.get(
  "/outcome/daily/:userId/:year/:month",
  dailyOutcomeMiddleWare
);

/**
 * @api {get} /histories/outcome/category/:year/:month  해당 연 월의 일별 지출 합산을 항목별로 가져옴
 * @apiName GetDailyCategoryHistories
 * @apiGroup History
 *
 * @apiParam {Number} year  불러오고자 하는 연도
 * @apiParam {Number} month  불러오고자 하는 월
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Array<{value: number, title: string}>} data  월별 하루당 항목별 지출 정보
 */
historiesRouter.get(
  "/outcome/category/:userId/:year/:month",
  categoricalDataMiddleware
);

/**
 * @api {get} /histories/:year/:month  해당 연 월의 내역을 전부 가져옴
 * @apiName GetHistories
 * @apiGroup History
 *
 * @apiParam {Number} year  불러오고자 하는 연도
 * @apiParam {Number} month  불러오고자 하는 월
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  해당 월의 내역 전부
 */
historiesRouter.get(
  "/:userId/:year/:month",
  passport.authenticate("jwt", { session: false }),
  getHistories
);

// Export the base-router
export default historiesRouter;
