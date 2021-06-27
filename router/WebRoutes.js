const express = require("express");
const router = express.Router();

const petsApi = require("../Api/Pets/PetsApi");

router.get("/lista-mascotas/:id?", async (req, res) => {
  let modal = false;
  // console.log(req.params);
  // const _id = req.params.id;
  // const pet = await petsApi.getPetById(_id);
  // if (req.params.id !== undefined) {
  //   console.log(req.params.id);
  //   const pet = await petsApi.getPetById(req.params.id);
  //   // modal = true;
  // }
  const pets = await petsApi.getPets();
  res.render("index", { arrayPets: pets, currentPage: "/lista-mascotas" });
});

router.get("/actualizar-mascota/:id", async (req, res) => {
  const _id = req.params.id;
  const pet = await petsApi.getPetById(_id);
  if (!pet.error) {
    res.render("updatePet", { data: pet });
  } else {
    res.render("404");
  }
});

router.get("/registrar-mascota", async (req, res) => {
  res.render("addPet", { currentPage: "/registrar-mascota" });
});

router.post("/registrar", async (req, res) => {
  const response = await petsApi.addPet(req.body);
  res.send(response);
});

router.put("/actualizar/:id", async (req, res) => {
  const response = await petsApi.updatePet(req.params.id, req.body);
  res.send(response);
});

router.delete("/eliminar/:id", async (req, res) => {
  const response = await petsApi.deletePet(req.params.id);
  res.send(response);
});

module.exports = router;
