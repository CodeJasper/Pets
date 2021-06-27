"use strict";

function executeScript() {
  const petId = document.currentScript.dataset.petid;
  const deleteButton = document.querySelector(`#button-delete-id-${petId}`);
  const updateButton = document.querySelector(`#button-update-id-${petId}`);

  deleteButton.addEventListener("click", deletePet);
  updateButton.addEventListener("click", updatePet);

  async function deletePet() {
    deleteButton.disabled = true;
    updateButton.disabled = true;
    const response = await fetch(`/eliminar/${petId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
    window.location.href = "lista-mascotas";
  }

  function updatePet() {
    updateButton.disabled = true;
    deleteButton.disabled = true;
    window.location.href = `/actualizar-mascota/${petId}`;
  }
}

executeScript();
