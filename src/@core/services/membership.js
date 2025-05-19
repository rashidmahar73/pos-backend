import Membership from "../models/Membership.js";
import Plan from "../models/Plan.js";
import Profile from "../models/Profile.js";
import {
  parseISO,
  isValid,
  isFuture,
  add,
  format,
  differenceInSeconds,
  addSeconds,
} from "date-fns";

export function getNewExpiryDate(expireAt, duration) {
  const now = new Date();

  // Step 1: Calculate remaining time in seconds
  let remainingSeconds = 0;
  if (expireAt && isValid(parseISO(expireAt))) {
    const parsedExpire = parseISO(expireAt);
    if (isFuture(parsedExpire)) {
      remainingSeconds = differenceInSeconds(parsedExpire, now);
    }
  }

  // Step 2: Parse duration like "6 months", "1 week", "1 year"
  const [amountStr, unitRaw] = duration.toLowerCase().split(" ");
  const amount = parseInt(amountStr);
  const unit = unitRaw.endsWith("s") ? unitRaw.slice(0, -1) : unitRaw; // normalize plural

  const durationMap = {
    day: { days: amount },
    week: { weeks: amount },
    month: { months: amount },
    year: { years: amount },
  };

  if (!durationMap[unit]) {
    throw new Error(`Unsupported duration unit: ${unit}`);
  }

  // Step 3: Add duration to now
  const newBaseDate = add(now, durationMap[unit]);

  // Step 4: Add remaining seconds from previous plan
  const finalDate = addSeconds(newBaseDate, remainingSeconds);

  // Step 5: Return in "YYYY-MM-DD HH:mm:ss.SSS"
  return format(finalDate, "yyyy-MM-dd HH:mm:ss.SSS");
}

function getRemainingDuration(expireAt) {
  const now = new Date();
  const expiry = new Date(expireAt);
  let diff = expiry.getTime() - now.getTime();

  if (diff <= 0) {
    return "0 year 0 month 0 day 0 hour 0 minute 0 sec 0 millisecond";
  }

  const milliseconds = diff % 1000;
  diff = Math.floor(diff / 1000);

  const seconds = diff % 60;
  diff = Math.floor(diff / 60);

  const minutes = diff % 60;
  diff = Math.floor(diff / 60);

  const hours = diff % 24;
  diff = Math.floor(diff / 24);

  // Approximate months and years from days
  const years = Math.floor(diff / 365);
  diff %= 365;

  const months = Math.floor(diff / 30); // Approximate 30 days/month
  const days = diff % 30;

  return `${years} year ${months} month ${days} day ${hours} hour ${minutes} minute ${seconds} sec ${milliseconds} millisecond`;
}

export const createMembership = async (data) => {
  if (!(await Profile.existsId(data?.current_profile_id)))
    throw new Error("Profile does not exists against this email address.");

  const membershipDetails = await Membership.latestExistMembership(
    data?.profile_id
  );
  const planDetails = await Plan.existsId(data?.plan_id);

  const newExpiry = getNewExpiryDate(
    membershipDetails?.expire_at,
    planDetails?.duration
  );

  const payload = {
    plan_id: data?.plan_id,
    profile_id: data?.profile_id,
    prev_duration: getRemainingDuration(membershipDetails?.expire_at),
    current_duration: planDetails?.duration,
    expire_at: newExpiry,
  };

  await Membership.create(payload);

  return {
    message: "Membership Created Successfully",
  };
};
