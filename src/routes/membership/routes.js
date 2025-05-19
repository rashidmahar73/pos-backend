import { Router } from "express";
import * as ctl from "./handlers.js";

const membershipRouter = Router();

membershipRouter.post("/create", ctl.handleCreate);

export default membershipRouter;
