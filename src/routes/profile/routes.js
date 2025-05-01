import { Router } from "express";
import * as ctl from "./handlers.js";
import authValidationHandler from "../../middlewares/auth-validation-handler.js";

const profileRouter = Router();

profileRouter.post("/create_profile", ctl.handleCreateProfile);
profileRouter.post("/login", ctl.handleLoginProfile);
profileRouter.post("/create_staff", ctl.handleCreateStaffProfile);
profileRouter.put(
  "/update_profile",
  authValidationHandler,
  ctl.handleUpdateProfile
);

profileRouter.put(
  "/update_staff_profile",
  authValidationHandler,
  ctl.handleUpdateStaffProfile
);

profileRouter.get(
  "/get_profile_list",
  authValidationHandler,
  ctl.handleGetProfileLists
);

profileRouter.get(
  "/get_staff_list/:profile_id",
  authValidationHandler,
  ctl.handleGetStaffLists
);

export default profileRouter;
