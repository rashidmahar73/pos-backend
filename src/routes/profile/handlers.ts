import { RequestHandler } from "express";
import { createProfile } from "../../@core/services/profile";
import jwt from "jsonwebtoken";
import db from "../../@core/utils/db";
import Profile from "../../@core/models/Profile";

export const handleCreateProfile: RequestHandler = async (req, res, next) => {
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

export const handleLoginProfile: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const profile = await Profile.getByEmail(email);

    if (!profile) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with hashed password
    // const isMatch = await bcrypt.compare(password, profile.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    if (password !== profile.password) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: 401 });
    }

    const token = jwt.sign(
      { token: process.env.ACCESS_TOKEN_SECRET },
      "your_secret_key",
      { expiresIn: "10d" }
    );

    res.json({
      message: "Login successful",
      profile: {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        role_id: profile.role_id,
        phone_number: profile.phone_number,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
