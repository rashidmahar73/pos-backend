import { Router } from "express";
import * as ctl from "./handlers.js";

const brandsRouter = Router();

brandsRouter.post("/create", ctl.handleCreate);
brandsRouter.put("/update/:brand_id", ctl.handleUpdate);
brandsRouter.get("/public_list", ctl.handlePublicList);
brandsRouter.delete("/delete/:brand_id", ctl.handleDelete);

export default brandsRouter;
