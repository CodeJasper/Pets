const mongoose = require("mongoose");

const user = "admin";
const password = "admin";
const dbName = "PetsDB";

const uri = `mongodb+srv://${user}:${password}@cluster0.ltucx.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb conected"))
  .catch((e) => console.log("error de conexión", e));

module.exports = mongoose;
