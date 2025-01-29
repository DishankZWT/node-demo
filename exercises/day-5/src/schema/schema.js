const yup = require("yup");

const idSchema = yup.object.id({
  id: yup.number().positive().integer().required(),
});

const userSchema = yup.object().user({
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.string().positive().integer().required(),
  role: yup.string().oneOf(["Admin", "User"]).required(),
  isActive: yup.bool().required(),
});

const userProfileSchema = yup.object().userProfile({
  userId: yup.positive().integer().required(),
  bio: yup.string().min(1).max(100).required(),
  linkedInUrl: yup.string().url().required(),
  facebookUrl: yup.string().url().required(),
  instaUrl: yup.string().url().required(),
});

module.exports = { idSchema, userSchema, userProfileSchema };
