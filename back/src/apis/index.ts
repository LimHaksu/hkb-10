import { Router } from "express";

import loginRouter from "./login";
import signupRouter from "./signup";
import categoriesRouter from "./categories";
import historyRouter from "./history";
import historiesRouter from "./histories";
import paymentMethodRouter from "./payment-method";

const router = Router();

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/categories", categoriesRouter);
router.use("/history", historyRouter);
router.use("/histories", historiesRouter);
router.use("/payment-method", paymentMethodRouter);

// Export the base-router
export default router;
