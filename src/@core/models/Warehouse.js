import db from "../utils/db.js";

class Warehouse {
  static async create(data) {
    return await db.warehouses.create({
      data: {
        ...data,
      },
    });
  }

  
  static async exists(email) {
    const warehouse = await db.warehouses.findFirst({
      where: { email },
    });
    return !!warehouse;
  }

  static async existsId(id) {
    return await db.brands.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id, data) {
    return db.warehouses.update({
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

    await db.warehouses.update({
      where: { id: id },
      data: { is_delete: true },
    });
    return;
  }

  static listByPublicProfileWarehousesList(profile_id, paging) {
    return db.$transaction([
      db.warehouses.findMany({
        where: {
          profile_id: profile_id,
        },
        orderBy: {
          created_at: "asc",
        },
        skip: paging?.skip ?? 0,
        take: paging?.take ?? 10,
      }),
      db.warehouses.count({
        where: {
          profile_id: profile_id,
        },
      }),
    ]);
  }
}

export default Warehouse;
