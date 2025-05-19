import { createMembership } from "../../@core/services/membership.js";

export const handleCreate = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    const newMemberhship = await createMembership({
      current_profile_id: user?.data?.id,
      ...data,
    });

    res.json({
      ...newMemberhship,
    });
  } catch (err) {
    next(err);
  }
};
