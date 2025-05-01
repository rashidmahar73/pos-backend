import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Profile from "../models/Profile.js";
import Staff from "../models/Staff.js";

export const createAccessToken = (payload, aud = "auth", maxAge = 4320) => {
  return jwt.sign(
    {
      ...payload,
      aud,
      iat: Date.now(),
      exp: (() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + maxAge);
        return now.valueOf();
      })(),
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};

export const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
};

export const verifyPassword = (pwd, hash) => {
  return bcrypt.compare(pwd, hash);
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const getUserFromToken = async (req) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("Authentication required.");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Invalid Authorization header.");

  const profile = await Profile.getByToken(token);
  const staff = await Staff.getByToken(token);

  const user = profile || staff;
  if (!user) throw new Error("Invalid token or user not found.");

  return user;
};
