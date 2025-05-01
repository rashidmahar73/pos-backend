import Profile from "../models/Profile.js";
import Staff from "../models/Staff.js";
import {
  createAccessToken,
  hashPassword,
  verifyPassword,
} from "../utils/auth.js";
import profileAccountSchema, {
  staffProfileAccountSchema,
} from "../validators/profile-data-validator.js";

export const createProfile = async (data) => {
  const parsedData = profileAccountSchema.parse(data);

  if (await Profile.exists(parsedData?.email))
    throw new Error("Profile already exists against this email address.");

  const pwdHash = await hashPassword(parsedData.password);

  const profileData = {
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    email: data.email,
    role_id: data.role_id,
    password: pwdHash,
    is_active: true,
  };

  const tokenPayload = {
    sub: data.email,
  };

  const confirmation_access_token = createAccessToken(tokenPayload);

  await Profile.create({
    confirmation_access_token,
    ...profileData,
  });

  return {
    message: "Registered Successfully",
  };
};

export const loginUser = async (email, password) => {
  const profile = await Profile.getByEmail(email);
  const staff = await Staff.getByEmail(email);

  const user = profile || staff;

  if (!user)
    throw new Error("Profile does not exist against this email address.");

  // // Verify password.
  if (!(await verifyPassword(password, user.password)))
    throw new Error("Invalid credentials.");

  // Verify profile status.
  if (!user.is_active) throw new Error("Your profile is not active.");

  const { password: profile_password, ...rest } = user;

  return {
    data: rest,
  };
};

export const createStaffProfile = async (data) => {
  const parsedData = staffProfileAccountSchema.parse(data);

  if (await Staff.exists(parsedData?.email))
    throw new Error("Profile already exists against this email address.");

  if (await Profile.exists(parsedData?.email))
    throw new Error("Profile already exists against this email address.");

  const pwdHash = await hashPassword(parsedData.password);

  const profileData = {
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    email: data.email,
    profile_id: data.profile_id,
    role_id: data.role_id,
    password: pwdHash,
    is_active: true,
    is_create_action: false,
    is_read_action: false,
    is_update_action: false,
    is_delete_action: false,
  };

  const tokenPayload = {
    sub: data.email,
  };

  const confirmation_access_token = createAccessToken(tokenPayload);

  await Staff.create({
    confirmation_access_token,
    ...profileData,
  });

  return {
    message: "Registered Successfully",
  };
};

export const updateProfile = async (data) => {
  const parsedDataProfile = profileAccountSchema.parse(data);

  if (!(await Profile.exists(parsedDataProfile?.email)))
    throw new Error("Profile not exists against this email address.");

  const pwdHash = await hashPassword(parsedDataProfile.password);
  const { password, ...rest } = data;

  return Profile.update(data?.id, { ...rest, password: pwdHash });
};

export const updateStaffProfile = async (data) => {
  const parsedData = staffProfileAccountSchema.parse(data);

  if (!(await Staff.exists(parsedData?.email)))
    throw new Error("Staff Profile not exists against this email address.");

  if (!(await Profile.existsId(parsedData?.profile_id))) {
    throw new Error("Profile not exists against this email address.");
  }

  const pwdHash = await hashPassword(parsedData.password);
  const { password, ...rest } = data;

  return Staff.update(data?.id, { ...rest, password: pwdHash });
};

export const listProfileLists = async (paging) => {
  let _page = Math.abs(paging.page);
  _page = !_page ? 0 : _page - 1;
  let _limit = Math.abs(paging.limit) || 20;

  const [records, count] = await Profile.listAll({
    skip: _page * _limit,
    take: _limit,
  });

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

export const listStaffLists = async (profile_id, paging) => {
  let _page = Math.abs(paging.page);
  _page = !_page ? 0 : _page - 1;
  let _limit = Math.abs(paging.limit) || 20;

  const [records, count] = await Profile.listByProfileStaffList(profile_id, {
    skip: _page * _limit,
    take: _limit,
  });

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
