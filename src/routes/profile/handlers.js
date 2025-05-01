import {
  createProfile,
  createStaffProfile,
  listProfileLists,
  listStaffLists,
  loginUser,
  updateProfile,
  updateStaffProfile,
} from "../../@core/services/profile.js";
import { actionPermissions } from "../../@core/utils/permissions.js";

export const handleCreateProfile = async (req, res, next) => {
  try {
    const data = req.body;
    const newProfile = await createProfile(data);

    res.json({
      ...newProfile,
    });
  } catch (err) {
    next(err);
  }
};

export const handleLoginProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(new Error("Incomplete credentials."));

    const authData = await loginUser(email, password);
    res.json(authData);
  } catch (err) {
    next(err);
  }
};

export const handleCreateStaffProfile = async (req, res, next) => {
  try {
    const data = req.body;
    const newProfile = await createStaffProfile(data);

    res.json({
      ...newProfile,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdateProfile = async (req, res, next) => {
  try {
    const data = req.body;

    const newProfile = await updateProfile(data);

    const { confirmation_access_token, ...rest } = newProfile;

    res.json({
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdateStaffProfile = async (req, res, next) => {
  try {
    const data = req.body;

    const newProfile = await updateStaffProfile(data);

    const { confirmation_access_token, ...rest } = newProfile;

    res.json({
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetUsersLists = async (req, res, next) => {
  try {
    const data = req.body;

    const newProfile = await updateStaffProfile(data);

    const { confirmation_access_token, ...rest } = newProfile;

    res.json({
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetProfileLists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const user = req?.user;

    if (user?.data?.role?.type !== "owner")
      return res.json({
        message: "You are not allowed to see the data",
      });

    const [records, meta] = await listProfileLists({ page, limit });

    const filteredProfileLists = records?.map(
      ({ password, confirmation_access_token, ...rest }) => rest
    );

    res.json({
      records: filteredProfileLists,
      meta,
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetStaffLists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const profile_id = parseInt(req.params.profile_id);

    const [records, meta] = await listStaffLists(profile_id, { page, limit });

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
