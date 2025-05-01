import Profile from "../models/Profile.js";
import Warehouse from "../models/Warehouse.js";
import { warehouseSchema } from "../validators/warehouse-data-validator.js";

export const createWarehouse = async (data) => {
  const parsedData = warehouseSchema.parse(data);
  
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  if (await Warehouse.exists(parsedData?.email))
    throw new Error("Warehouse already exists against this email address.");

  await Warehouse.create(data);

  return {
    message: "Warehouse Registered Successfully",
  };
};

export const updateWarehouse = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const { warehouse_id, ...rest } = data;

  if (!(await Warehouse.existsId(data?.warehouse_id)))
    throw new Error("Warehouse does not exists");

  await Warehouse.update(data?.warehouse_id, rest);

  return {
    message: "Warehouse Updated Successfully",
  };
};

export const listPublicWarehouses = async (profile_id, paging) => {
  let _page = Math.abs(paging.page);
  _page = !_page ? 0 : _page - 1;
  let _limit = Math.abs(paging.limit) || 20;

  if (!(await Profile.existsId(profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const [records, count] = await Warehouse.listByPublicProfileWarehousesList(
    profile_id,
    {
      skip: _page * _limit,
      take: _limit,
    }
  );

  return [
    records,
    {
      total_records: count,
      current_page: _page + 1,
      total_pages: Math.ceil(count / _limit),
      limit: _limit,
    },
  ];
};

export const deleteWarehouse = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  if (!(await Warehouse.existsId(data?.warehouse_id)))
    throw new Error("Warehouse does not exists.");

  await Warehouse.softDelete(data?.warehouse_id);

  return {
    message: "Warehouse Deleted Successfully",
  };
};
