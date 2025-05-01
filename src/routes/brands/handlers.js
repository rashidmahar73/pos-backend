import {
  createBrand,
  deleteBrand,
  listPublicBrands,
  updateBrand,
} from "../../@core/services/brand.js";

export const handleCreate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const newBrand = await createBrand({
      profile_id: user?.data?.id,
      ...data,
    });

    res.json({
      ...newBrand,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    const brand_id = parseInt(req.params.brand_id);

    const updatedBrand = await updateBrand({
      profile_id: user?.data?.id,
      brand_id: brand_id,
      ...data,
    });

    res.json({
      ...updatedBrand,
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

    const [records, meta] = await listPublicBrands(user?.data?.id, {
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
    const brand_id = parseInt(req.params.brand_id);

    const brand = await deleteBrand({ profile_id: user?.data?.id, brand_id });

    res.json({
      ...brand,
    });
  } catch (err) {
    next(err);
  }
};
