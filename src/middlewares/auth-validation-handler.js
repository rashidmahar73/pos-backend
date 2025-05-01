import { getUserFromToken } from "../@core/utils/auth.js";
import AuthenticationError from "../errors/AuthenticationError.js";

const authValidationHandler = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);

    req.user = {
      data: user,
    };

    next();
  } catch (err) {
    next(new AuthenticationError(err.message));
  }
};

export default authValidationHandler;
