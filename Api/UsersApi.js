const UserModel = require("../models_db/UserModel");

async function registerUser(user) {
  try {
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    newUser.password = await newUser.encryptPassword(newUser.password);

    const savedUser = UserModel.create(newUser);
    return savedUser;
  } catch (error) {
    return {
      error: true,
      message:
        "Ha ocurrido el siguiente error al intentar registrar un usuario: " +
        error,
    };
  }
}

async function findUserByEmail(email) {
  try {
    const response = UserModel.findOne({ email: email });
    return response;
  } catch (error) {
    return {
      error: true,
      message: "Ha ocurrido un error",
    };
  }
}

async function findUserById(id) {
  try {
    const response = UserModel.findById(id);
    return response;
  } catch (error) {
    return {
      error: true,
      message: "Ha ocurrido un error",
    };
  }
}

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
};
