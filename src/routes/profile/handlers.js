import {
  createProfile,
  listProfile,
  loginUser,
  updateProfile,
} from "../../@core/services/profile.js";

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

export const handleUpdateProfile = async (req, res, next) => {
  try {
    const data = req.body;

    await updateProfile(data);

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

    const [records, meta] = await listProfile({ page, limit });

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
