const yup = require("yup");

// Users Schema
const userSchema = yup.object({
  id: yup.number().integer().positive().required(),
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().max(100).required(),
  age: yup.number().integer().positive(),
  password: yup.string().min(6).max(100).required(),
  role: yup.string().required(),
  isActive: yup.boolean(),
});

// User Profiles Schema
const userProfileSchema = yup.object({
  id: yup.number().integer().positive().required(),
  user_id: yup.number().integer().positive().required(),
  bio: yup.string().max(500).nullable(),
  linkedInUrl: yup.string().url(),
  facebookUrl: yup.string().url(),
  instaUrl: yup.string().url(),
});

// User Images Schema
const userImageSchema = yup.object({
  id: yup.number().integer().positive().required(),
  user_id: yup.number().integer().positive().required(),
  imageName: yup.string().required(),
  path: yup.string(),
  mimeType: yup.string(),
  extension: yup.string(),
  size: yup.number(),
});

module.exports = {
  userSchema,
  userProfileSchema,
  userImageSchema,
};
