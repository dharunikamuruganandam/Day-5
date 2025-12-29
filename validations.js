const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  age: z.number().int().min(1, "Age must be a positive number"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().length(10, "Mobile must be 10 digits"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

module.exports = { userSchema };
