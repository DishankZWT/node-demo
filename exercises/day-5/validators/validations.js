const { idSchema, userSchema, userProfileSchema } = require("../schema/schema");

async function idValidator(req, res, next) {
  const validId = req.params.id;
  idSchema
    .validate(validId)
    .then((valid) => next())
    .catch((error) => res.status(500).json({ error }));
}

async function userValidator(req, res, next) {
  const data = req.body;
  userSchema
    .validate(data)
    .then((valid) => next())
    .catch((error) => res.status(500).json({ error }));
}

async function userProfileValidator(req, res, next) {
  const data = req.body;
  userProfileSchema
    .validate(data)
    .then((valid) => next())
    .catch((error) => res.status(500).json({ error }));
}

module.exports = {
  idValidator,
  userValidator,
  userProfileValidator,
};
