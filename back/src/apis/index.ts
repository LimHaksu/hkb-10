import { Router } from "express";

import categoriesRouter from "./categories";
import historiesRouter from "./histories";
import paymentMethodRouter from "./payment-method";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/histories", historiesRouter);
router.use("/payment-method", paymentMethodRouter);

// Export the base-router
export default router;
