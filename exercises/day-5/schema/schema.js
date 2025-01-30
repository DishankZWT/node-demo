const yup = require("yup");

const idSchema = yup.object({
  id: yup.number().positive().integer(),
});

const userSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  age: yup.number(),
  role: yup.string().oneOf(["Admin", "User"]),
  isActive: yup.bool().required(),
});

const userProfileSchema = yup.object({
  userId: yup.number(),
  bio: yup.string().min(1).max(100),
  linkedInUrl: yup.string().url(),
  facebookUrl: yup.string().url(),
  instaUrl: yup.string().url(),
});

module.exports = { idSchema, userSchema, userProfileSchema };
