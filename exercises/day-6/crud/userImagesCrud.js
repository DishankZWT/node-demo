const { user_images } = require("../model/sqmodel");

function insertUser(value, inputId) {
  console.log(inputId);

  return user_images
    .create({
      userId: inputId,
      imageName: value.filename,
      path: value.path,
      mimeType: value.mimetype,
      extension: value.mimetype.slice("/")[1],
      size: value.size,
    })
    .then()
    .catch((err) => console.log(err));
}

function deleteUser(inputId) {
  return user_images
    .destroy({ where: { userId: inputId } })
    .then()
    .catch((err) => console.log(err));
}

module.exports = {
  insertUser,
  deleteUser,
};
