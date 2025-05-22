import { Router } from "express";
import * as ctl from "./handlers.js";
import authValidationHandler from "../../middlewares/auth-validation-handler.js";

const profileRouter = Router();

profileRouter.post("/create_profile", ctl.handleCreateProfile);
profileRouter.post("/login", ctl.handleLoginProfile);
profileRouter.put(
  "/update_profile",
  authValidationHandler,
  ctl.handleUpdateProfile
);

profileRouter.get(
  "/get_profile_list",
  authValidationHandler,
  ctl.handleGetProfileLists
);

export default profileRouter;
