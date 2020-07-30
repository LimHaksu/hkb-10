import { Router } from "express";

import historyRouter from "./history";

const router = Router();

router.use("/histories", historyRouter);

// Export the base-router
export default router;
