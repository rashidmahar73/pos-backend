import {
  createCategory,
  deleteCategory,
  listPublicCategories,
  updateCategory,
} from "../../@core/services/category.js";

export const handleCreate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const newCategory = await createCategory({
      profile_id: user?.data?.id,
      ...data,
    });

    res.json({
      ...newCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    const category_id = parseInt(req.params.category_id);

    const updatedCategory = await updateCategory({
      profile_id: user?.data?.id,
      category_id: category_id,
      ...data,
    });

    res.json({
      ...updatedCategory,
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

    const [records, meta] = await listPublicCategories(user?.data?.id, {
      page,
      limit,
    });

    const filteredCategoriesList = records?.filter((elem) => !elem?.is_delete);

    res.json({
      records: filteredCategoriesList,
      meta,
    });
  } catch (err) {
    next(err);
  }
};

export const handleDelete = async (req, res, next) => {
  try {
    const user = req?.user;
    const category_id = parseInt(req.params.category_id);

    const category = await deleteCategory({ profile_id: user?.data?.id, category_id });

    res.json({
      ...category,
    });
  } catch (err) {
    next(err);
  }
};

