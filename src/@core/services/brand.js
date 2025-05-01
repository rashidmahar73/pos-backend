import Brand from "../models/Brand.js";
import Profile from "../models/Profile.js";

export const createBrand = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  await Brand.create(data);

  return {
    message: "Brand Registered Successfully",
  };
};

export const updateBrand = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const { brand_id, ...rest } = data;

  if (!(await Brand.existsId(data?.brand_id)))
    throw new Error("Brand does not exists");

  await Brand.update(data?.brand_id, rest);

  return {
    message: "Brand Updated Successfully",
  };
};

export const listPublicBrands = async (profile_id, paging) => {
  let _page = Math.abs(paging.page);
  _page = !_page ? 0 : _page - 1;
  let _limit = Math.abs(paging.limit) || 20;

  if (!(await Profile.existsId(profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const [records, count] = await Brand.listByPublicProfileBrandsList(
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

export const deleteBrand = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  if (!(await Brand.existsId(data?.brand_id)))
    throw new Error("Brand does not exists.");

  await Brand.softDelete(data?.brand_id);

  return {
    message: "Brand Deleted Successfully",
  };
};
