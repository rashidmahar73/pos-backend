import { Router } from "express";
import * as ctl from "./handlers";

const profileRouter = Router();

profileRouter.post("/create_profile", ctl.handleCreateProfile);
profileRouter.post("/login", ctl.handleLoginProfile);


export default profileRouter;
