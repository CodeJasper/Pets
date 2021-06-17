const express = require("express");
const router = express.Router();

const petsApi = require("../Api/Pets/PetsApi");

router.get("/", async (req, res) => {
  const pets = await petsApi.getPets();
  res.render("index", { arrayPets: pets });
});

router.get("/actualizar-mascota/:id", async (req, res) => {
  const _id = req.params.id;
  const pet = await petsApi.getPetById(_id);
  console.log(pet);
  // res.render("index", { arrayPets: pets });
});

router.get("/registrar-mascota", async (req, res) => {
  res.render("addPet");
});

router.post("/registrar", async (req, res) => {
  console.log("post");
  console.log(req.body);
});

module.exports = router;
