import { Router } from "express";
import * as ctl from "./handlers.js";

const categoriesRouter = Router();

categoriesRouter.post("/create", ctl.handleCreate);
categoriesRouter.put("/update/:category_id", ctl.handleUpdate);
categoriesRouter.get("/public_list", ctl.handlePublicList);
categoriesRouter.delete("/delete/:category_id", ctl.handleDelete);


export default categoriesRouter;
