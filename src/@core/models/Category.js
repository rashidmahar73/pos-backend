import db from "../utils/db.js";

class Category {
  static async create(data) {
    return await db.categories.create({
      data: {
        ...data,
      },
    });
  }

  static async existsId(id) {
    return await db.categories.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id, data) {
    return db.categories.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
  }

  static listByPublicProfileCategoriesList(profile_id, paging) {
    return db.$transaction([
      db.categories.findMany({
        where: {
          profile_id: profile_id,
        },
        include: {
          brand: true,
        },
        orderBy: {
          created_at: "asc",
        },
        skip: paging?.skip ?? 0,
        take: paging?.take ?? 10,
      }),
      db.categories.count({
        where: {
          profile_id: profile_id,
        },
      }),
    ]);
  }

  static async softDelete(id) {
    // await db.products.updateMany({
    //   where: { category_id: id },
    //   data: { is_delete: true },
    // });

    await db.categories.update({
      where: { id: id },
      data: { is_delete: true },
    });
    return;
  }
}

export default Category;
