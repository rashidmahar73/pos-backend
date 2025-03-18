import Profile from "../models/Profile";
import profileValidator from "../validators/profile-data-validator";

export const createProfile = async (data) => {
  const parsedData = profileValidator.parse(data);

  return Profile.create(parsedData);
};
