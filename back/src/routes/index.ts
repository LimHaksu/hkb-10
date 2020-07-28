import { Request, Response, Router } from "express";

const router = Router();

router.get("/hello", async (req: Request, res: Response) => {
  res.send("hello");
});

// Export the base-router
export default router;
