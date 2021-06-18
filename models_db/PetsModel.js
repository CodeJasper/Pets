const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: String,
  animal: String,
  image: String,
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
