import db from "../utils/db.js";

class Membership {
  static async create(data) {
    return await db.membership.create({
      data: {
        ...data,
      },
    });
  }

  static async latestExistMembership(id) {
    return await db.membership.findFirst({
      where: {
        profile_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}

export default Membership;
