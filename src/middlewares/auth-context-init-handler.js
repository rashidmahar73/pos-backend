import { setContext } from "../@core/utils/async-context.js";

const authContextInitHandler = (req, res, next) => {
  return setContext("auth", { user: req.user })(() => next());
};

export default authContextInitHandler;
