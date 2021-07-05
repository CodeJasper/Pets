const express = require("express");
const router = express.Router();

const petsApi = require("../Api/PetsApi");

router.get("/lista-mascotas", async (req, res) => {
  const pets = await petsApi.getPets();
  res.render("listCards", {
    arrayPets: pets,
    currentPage: "/lista-mascotas",
    tabTitle: "Lista de mascotas",
    extraCss: ["/css/petCard.css", "/css/cardList.css", "/css/bar.css"],
  });
});

router.get("/actualizar-mascota/:id", async (req, res) => {
  const _id = req.params.id;
  const pet = await petsApi.getPetById(_id);
  if (!pet.error) {
    res.render("updatePet", {
      data: pet,
      currentPage: "/actualizar-mascota",
      tabTitle: "Actualizar mascota",
      extraCss: ["/css/updateForm.css"],
    });
  } else {
    res.render("404");
  }
});

router.get("/registrar-mascota", async (req, res) => {
  res.render("addPet", {
    currentPage: "/registrar-mascota",
    tabTitle: "Registrar mascota",
    extraCss: ["/css/addForm.css"],
  });
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

router.get("/", async (req, res) => {
  res.redirect("/lista-mascotas");
});

module.exports = router;
