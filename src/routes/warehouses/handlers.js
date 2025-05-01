import {
  listPublicWarehouses,
  updateWarehouse,
  createWarehouse,
  deleteWarehouse,
} from "../../@core/services/warehouses.js";

export const handleCreate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const newWarehouse = await createWarehouse({
      profile_id: user?.data?.id,
      ...data,
    });

    res.json({
      ...newWarehouse,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    const warehouse_id = parseInt(req.params.warehouse_id);

    const updatedWarehouse = await updateWarehouse({
      profile_id: user?.data?.id,
      warehouse_id: warehouse_id,
      ...data,
    });

    res.json({
      ...updatedWarehouse,
    });
  } catch (err) {
    next(err);
  }
};

export const handlePublicList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const user = req?.user;

    const [records, meta] = await listPublicWarehouses(user?.data?.id, {
      page,
      limit,
    });

    const filteredBrandsList = records?.filter((elem) => !elem?.is_delete);

    res.json({
      records: filteredBrandsList,
      meta,
    });
  } catch (err) {
    next(err);
  }
};

export const handleDelete = async (req, res, next) => {
  try {
    const user = req?.user;
    const warehouse_id = parseInt(req.params.warehouse_id);

    const warehouse = await deleteWarehouse({ profile_id: user?.data?.id, warehouse_id });

    res.json({
      ...warehouse,
    });
  } catch (err) {
    next(err);
  }
};
