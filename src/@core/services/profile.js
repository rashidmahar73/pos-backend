import Membership from "../models/Membership.js";
import Plan from "../models/Plan.js";
import Profile from "../models/Profile.js";
import Staff from "../models/Staff.js";
import {
  createAccessToken,
  hashPassword,
  verifyPassword,
} from "../utils/auth.js";
import profileAccountSchema from "../validators/profile-data-validator.js";

import { add, format } from "date-fns";

function getNewExpiryDate(durationString) {
  const now = new Date();

  const baseDate = now;

  const parts = durationString?.toLowerCase()?.split(" ");
  const value = parseInt(parts[0]);
  const unit = parts[1];

  let newDate = baseDate;

  switch (unit) {
    case "day":
    case "days":
      newDate = add(baseDate, { days: value });
      break;
    case "week":
    case "weeks":
      newDate = add(baseDate, { weeks: value });
      break;
    case "month":
    case "months":
      newDate = add(baseDate, { months: value });
      break;
    case "year":
    case "years":
      newDate = add(baseDate, { years: value });
      break;
    default:
      throw new Error("Unsupported duration unit");
  }

  return format(newDate, "yyyy-MM-dd HH:mm:ss.SSS");
}

export const createProfile = async (data) => {
  const parsedData = profileAccountSchema.parse(data);

  if (await Profile.exists(parsedData?.email))
    throw new Error("Profile already exists against this email address.");

  const pwdHash = await hashPassword(parsedData.password);

  const email = data?.email;
  const emailPrefix = email?.split("@")?.[0];

  const profileData = {
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    email: data.email,
    user_name: emailPrefix,
    role_id: 2,
    password: pwdHash,
    is_active: true,
  };

  const tokenPayload = {
    sub: data.email,
  };

  const confirmation_access_token = createAccessToken(tokenPayload);

  const newProfile = await Profile.create({
    confirmation_access_token,
    ...profileData,
  });

  const planExist = await Plan.existsId(1);

  const payload = {
    profile_id: newProfile?.id,
    plan_id: planExist?.id,
    prev_duration: "0 year 0 month 0 day 0 hour 0 minute 0 sec 0 milisecond",
    current_duration: planExist?.duration,
    expire_at: getNewExpiryDate(planExist?.duration),
  };

  await Membership.create(payload);

  return {
    message: "Registered Successfully",
  };
};

export const loginUser = async (email, password) => {
  const profile = await Profile.getByVerification(email);
  const staff = await Staff.getByVerification(email);

  const user = profile || staff;

  if (!user) throw new Error("Profile does not exist against this data.");

  // // Verify password.
  if (!(await verifyPassword(password, user.password)))
    throw new Error("Invalid credentials.");

  // Verify profile status.
  if (!user.is_active) throw new Error("Your profile is not active.");

  const { password: profile_password, ...rest } = user;

  const membershipDetails = await Membership?.latestExistMembership(rest?.id);

  const planDetails = await Plan.existsId(membershipDetails?.plan_id);

  if (staff) {
    return {
      data: {
        ...rest,
        access: ["Brands"],
      },
    };
  } else {
    return {
      data: {
        ...rest,
        membership: { ...membershipDetails, plan: planDetails },
      },
    };
  }
};

export const updateProfile = async (data) => {
  const parsedDataProfile = profileAccountSchema.parse(data);

  if (!(await Profile.exists(parsedDataProfile?.email)))
    throw new Error("Profile not exists against this email address.");

  const pwdHash = await hashPassword(parsedDataProfile.password);
  const { password, ...rest } = data;

  return Profile.update(data?.id, { ...rest, password: pwdHash });
};

export const listProfile = async (paging) => {
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
