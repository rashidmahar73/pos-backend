import db from "../utils/db.js";

class Profile {
  static async create(data) {
    return await db.profile.create({
      data: {
        ...data,
      },
    });
  }

  static async exists(email) {
    const profile = await db.profile.findFirst({
      where: { email },
    });
    return !!profile;
  }

  static async existsId(id) {
    const profile = await db.profile.findUnique({
      where: { id },
    });
    return profile;
  }

  static getByEmail(email) {
    return db.profile.findUnique({
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
      return db.profile.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      });
    }
    return db.profile.findUnique({
      where: {
        user_name: email,
      },
      include: {
        role: true,
      },
    });
  }

  static getByToken(confirmation_access_token) {
    return db.profile.findUnique({
      where: {
        confirmation_access_token,
      },
      include: {
        role: true,
      },
    });
  }

  static async update(id, data) {
    return db.profile.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  static listAll(paging) {
    return db.$transaction([
      db.profile.findMany({
        orderBy: {
          created_at: "asc",
        },
        skip: paging?.skip ?? 0,
        take: paging?.take ?? 10,
      }),
      db.profile.count(),
    ]);
  }
}

export default Profile;
