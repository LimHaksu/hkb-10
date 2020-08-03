import { Router } from "express";

import historyRouter from "./histories";
import paymentMethodRouter from "./payment-method";

const router = Router();

router.use("/histories", historyRouter);
router.use("/payment-method", paymentMethodRouter);

// Export the base-router
export default router;
