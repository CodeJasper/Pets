const PetModel = require("../../models_db/PetsModel");
const mongoose = require("mongoose");

async function getPets() {
  const pets = await PetModel.find();
  return pets;
}

async function getPetById(_id) {
  const id = new mongoose.Types.ObjectId(_id);
  const pet = await PetModel.findById();
  return pet;
}

module.exports = {
  getPets,
  getPetById,
};
