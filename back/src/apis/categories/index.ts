import { Router } from "express";

import getCategories from "./getCategories";

const categoriesRouter = Router();

/**
 * @api {get} /categories 카테고리 목록 전부 가져옴
 * @apiName GetCategories
 * @apiGroup Categories
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 * @apiSuccess {Object} data  카테고리 목록
 */
categoriesRouter.get("/", getCategories);

// Export the base-router
export default categoriesRouter;
