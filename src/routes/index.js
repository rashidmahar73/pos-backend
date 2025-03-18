import { Router } from "express";

import profileRouter from "./profile/routes";

const apiRouter = Router();

apiRouter.use("/profile", profileRouter);

export default apiRouter;
