import db from "../utils/db.js";

class Brand {
  static async create(data) {
    return await db.brands.create({
      data: {
        ...data,
      },
    });
  }

  static async existsId(id) {
    return await db.brands.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id, data) {
    return db.brands.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  static async softDelete(id) {
    // await db.products.updateMany({
    //   where: { brand_id: id, category_id:id, },
    //   data: { is_delete: true },
    // });

    await db.categories.updateMany({
      where: { brand_id: id },
      data: { is_delete: true },
    });

    await db.brands.update({
      where: { id: id },
      data: { is_delete: true },
    });
    return;
  }

  static listByPublicProfileBrandsList(profile_id, paging) {
    return db.$transaction([
      db.brands.findMany({
        where: {
          profile_id: profile_id,
        },
        orderBy: {
          created_at: "asc",
        },
        skip: paging?.skip ?? 0,
        take: paging?.take ?? 10,
      }),
      db.brands.count({
        where: {
          profile_id: profile_id,
        },
      }),
    ]);
  }
}

export default Brand;
