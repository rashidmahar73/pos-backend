import db from "../utils/db.js";

class Staff {
  static async create(data) {
    return await db.staff.create({
      data: {
        ...data,
      },
    });
  }

  static async exists(email) {
    const staffProfile = await db.staff.findFirst({
      where: { email },
    });
    return !!staffProfile;
  }

  static getByEmail(email) {
    return db.staff.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
  }

  static getByVerification(email) {
    if (email) {
      return db.staff.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      });
    }
    return db.staff.findUnique({
      where: {
        user_name: email,
      },
      include: {
        role: true,
      },
    });
  }

  static getByToken(confirmation_access_token) {
    return db.staff.findUnique({
      where: {
        confirmation_access_token,
      },
      include: {
        role: true,
      },
    });
  }

  static async update(id, data) {
    return db.staff.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  static lists(profile_id, paging) {
    return db.$transaction([
      db.staff.findMany({
        where: {
          profile_id: profile_id,
        },
        orderBy: {
          created_at: "asc",
        },
        skip: paging?.skip ?? 0,
        take: paging?.take ?? 10,
      }),
      db.staff.count({
        where: {
          profile_id: profile_id,
        },
      }),
    ]);
  }
}

export default Staff;
