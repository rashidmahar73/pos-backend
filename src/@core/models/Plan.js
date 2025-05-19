import db from "../utils/db.js";

class Plan {
  static async existsId(id) {
    return await db.plan.findUnique({
      where: {
        id,
      },
    });
  }
}

export default Plan;
