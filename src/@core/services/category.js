import Category from "../models/Category.js";
import Profile from "../models/Profile.js";

export const createCategory = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  await Category.create(data);

  return {
    message: "Category Registered Successfully",
  };
};

export const updateCategory = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const { category_id, ...rest } = data;

  if (!(await Category.existsId(data?.category_id)))
    throw new Error("Category does not exists");

  await Category.update(data?.category_id, rest);

  return {
    message: "Category Updated Successfully",
  };
};

export const listPublicCategories = async (profile_id, paging) => {
  let _page = Math.abs(paging.page);
  _page = !_page ? 0 : _page - 1;
  let _limit = Math.abs(paging.limit) || 20;

  if (!(await Profile.existsId(profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const [records, count] = await Category.listByPublicProfileCategoriesList(
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


export const deleteCategory = async (data) => {
  if (!(await Profile.existsId(data?.profile_id)))
    throw new Error("Profile does not exists against this email address.");

  if (!(await Category.existsId(data?.category_id)))
    throw new Error("Category does not exists.");

  await Category.softDelete(data?.category_id);

  return {
    message: "Category Deleted Successfully",
  };
};
