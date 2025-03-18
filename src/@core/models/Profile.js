
import db from '../utils/db';

class Profile {
  static async create(data) {
    return await db.profile.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        password: data.password,
        email: data.email,
        role_id: data.role_id,
      }
    });
  }

  static async getByEmail(email) {
    return await db.profile.findUnique({
      where: { email },
    });
  }
}

export default Profile;
