const PetModel = require("../../models_db/PetsModel");

async function getPets() {
  try {
    const pets = await PetModel.find();
    return pets;
  } catch (error) {
    console.log("Erorr getpets", error);
  }
}

async function getPetById(_id) {
  try {
    const pet = await PetModel.findById(_id);
    if (pet !== null) {
      return {
        error: false,
        pet: pet,
      };
    } else {
      return {
        error: true,
        message: "La mascota no existe o ha sido eliminada con anterioridad",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Ha ocurrido un error: ${error}`,
    };
  }
}

async function addPet(pet) {
  try {
    const petAdded = await PetModel.create(pet);
    if (petAdded !== null) {
      return {
        error: false,
        message: "Se ha registrado la mascota satisfactoriamente",
        petAdded: petAdded,
      };
    } else {
      return {
        error: true,
        message: "La mascota no ha sido registrada",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Ha ocurrido un error: ${error}`,
    };
  }
}

async function updatePet(id, pet) {
  try {
    const petUpdated = await PetModel.findByIdAndUpdate(id, pet, {
      useFindAndModify: false,
    });
    if (petUpdated !== null) {
      return {
        error: false,
        message: "Se ha actualizado el registro satisfactoriamente",
        petUpdated: petUpdated,
      };
    } else {
      return {
        error: true,
        message: "La mascota no existe o ha sido eliminada con anterioridad",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Ha ocurrido un error: ${error}`,
    };
  }
}

async function deletePet(_id) {
  try {
    const petDelete = await PetModel.findByIdAndDelete(_id);
    if (petDelete !== null) {
      return {
        error: false,
        message: "Se ha eliminado el registro satisfactoriamente",
        pet: petDelete,
      };
    } else {
      return {
        error: true,
        message: "La mascota no existe o ha sido eliminada con anterioridad",
      };
    }
  } catch (error) {
    return {
      error: true,
      message: `Ha ocurrido un error: ${error}`,
    };
  }
}

module.exports = {
  getPets,
  getPetById,
  addPet,
  deletePet,
  updatePet,
};
