const yup = require("yup");

async function idValidator(inputId) {
  const validId = yup.object({
    id: yup.number().integer(),
  });
  const validation = await idValidator(inputId);
  return validation;
}

async function checkCredentials(dataBody) {
  const userSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.mixed().oneOf(["admin", "customer"]).required(),
  });
  const validation = await userSchema.validate(dataBody, { abortEarly: false });
  return validation;
}

async function productCredentials(dataBody) {
  const productSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    category_id: yup.number().integer().required(),
  });
  const validation = await productSchema.validate(dataBody, {
    abortEarly: false,
  });
  return validation;
}

module.exports = { idValidator, checkCredentials, productCredentials };
