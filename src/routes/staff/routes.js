import { Router } from "express";
import * as ctl from "./handlers.js";
import authValidationHandler from "../../middlewares/auth-validation-handler.js";

const staffRouter = Router();

staffRouter.post("/create_staff", ctl.handleCreate);
staffRouter.put(
  "/update_staff_profile",
  authValidationHandler,
  ctl.handleUpdate
);

staffRouter.get(
  "/get_staff_list/:profile_id",
  authValidationHandler,
  ctl.handleGetLists
);

export default staffRouter;
