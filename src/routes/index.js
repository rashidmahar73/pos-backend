import { Router } from "express";

import profileRouter from "./profile/routes.js";
import apiErrorHandler from "../middlewares/api-error-handler.js";
import authValidationHandler from "../middlewares/auth-validation-handler.js";
import authContextInitHandler from "../middlewares/auth-context-init-handler.js";
import categoriesRouter from "./categories/routes.js";
import brandsRouter from "./brands/routes.js";
import warehousesRouter from "./warehouses/routes.js";
import membershipRouter from "./membership/routes.js";

const routes = Router();

routes.use("/auth", profileRouter);

routes.use(authValidationHandler, authContextInitHandler);

routes.use("/membership", membershipRouter);
routes.use("/categories", categoriesRouter);
routes.use("/brands", brandsRouter);
routes.use("/warehouses", warehousesRouter);

routes.use(apiErrorHandler);

export default routes;
