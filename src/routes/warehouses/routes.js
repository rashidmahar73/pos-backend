import { Router } from "express";
import * as ctl from "./handlers.js";

const warehousesRouter = Router();

warehousesRouter.post("/create", ctl.handleCreate);
warehousesRouter.put("/update/:warehouse_id", ctl.handleUpdate);
warehousesRouter.get("/public_list", ctl.handlePublicList);
warehousesRouter.delete("/delete/:warehouse_id", ctl.handleDelete);

export default warehousesRouter;
