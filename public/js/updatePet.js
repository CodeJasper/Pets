"use strict";

const formUpdate = document.querySelector("#form-update");
const inputFile = document.querySelector("#input-file");
const buttonForm = document.querySelector("#button-update-form");
const img = document.querySelector("#img-form");
const id = formUpdate.dataset.id;
const currentImage = formUpdate.dataset.image;

let imgBase64 = currentImage;

inputFile.addEventListener("change", changeImage);
formUpdate.addEventListener("submit", updatePet);

function changeImage(e) {
  const reader = new FileReader();

  if (e.target.files[0].size < 2 * 1048576) {
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      imgBase64 = reader.result;
      img.src = reader.result;
      img.hidden = false;
    };
  } else {
    alert(
      "La imagen es demasiado pesada, por favor seleccione una imagen con un peso maximo de 2MB"
    );
    inputFile.value = "";
  }
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

async function updatePet(e) {
  e.preventDefault();
  buttonForm.disabled = true;
  const name = formUpdate.elements["name"].value;
  const animal = formUpdate.elements["animal"].value;
  const image = formUpdate.elements["image"].value;

  const petToUpdate = {
    name,
    animal,
    image: imgBase64,
  };

  const response = await fetch(`/actualizar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petToUpdate),
  });
  const responseJson = await response.json();
  window.location.href = "/lista-mascotas";
}
