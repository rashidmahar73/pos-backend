import { z } from "zod";
import validator from "validator";

const { isStrongPassword } = validator;


const profileAccountSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string().email(),
  role_id: z.number()?.optional(),
  is_active: z.boolean()?.optional(),
  confirmation_access_token: z.string()?.optional(),
  created_at: z.string(),
  updated_at: z.string(),
  password: z
    .string()
    .trim()
    .refine(
      (v) =>
        isStrongPassword(v, {
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        }),
      { message: "Password must be atleast 8 characters long." }
    ),
});

export const staffProfileAccountSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string().email(),
  profile_id: z.number()?.optional(),
  is_active: z.boolean()?.optional(),
  is_create_action: z.boolean()?.optional(),
  is_read_action: z.boolean()?.optional(),
  is_update_action: z.boolean()?.optional(),
  is_delete_action: z.boolean()?.optional(),
  confirmation_access_token: z.string()?.optional(),
  created_at: z.string(),
  updated_at: z.string(),
  password: z
    .string()
    .trim()
    .refine(
      (v) =>
        isStrongPassword(v, {
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        }),
      { message: "Password must be atleast 8 characters long." }
    ),
});

export default profileAccountSchema;
