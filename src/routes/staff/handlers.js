import {
  createStaff,
  listStaff,
  updateStaff,
} from "../../@core/services/staff.js";

export const handleCreate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const newProfile = await createStaff({
      profile_id: user?.data?.id,
      ...data,
    });

    res.json({
      ...newProfile,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdate = async (req, res, next) => {
  try {
    const data = req.body;

    const newProfile = await updateStaff(data);

    const { confirmation_access_token, ...rest } = newProfile;

    res.json({
      message: "Staff Profile Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetLists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const profile_id = parseInt(req.params.profile_id);

    const [records, meta] = await listStaff(profile_id, { page, limit });

    const filteredStaffLists = records?.map(
      ({ password, confirmation_access_token, ...rest }) => rest
    );

    res.json({
      records: filteredStaffLists,
      meta,
    });
  } catch (err) {
    next(err);
  }
};
