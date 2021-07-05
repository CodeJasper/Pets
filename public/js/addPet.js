"use strict";
const formAdd = document.querySelector("#form-add");
const inputFile = document.querySelector("#input-file");
const buttonForm = document.querySelector("#button-add-form");
const img = document.querySelector("#img-form");

let imgBase64;

inputFile.addEventListener("change", changeImage);
formAdd.addEventListener("submit", addPet);

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

async function addPet(e) {
  e.preventDefault();
  buttonForm.disabled = true;
  const name = formAdd.elements["name"].value;
  const animal = formAdd.elements["animal"].value;
  const petToAdd = {
    name,
    animal,
    image: imgBase64,
  };
  const response = await fetch(`/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petToAdd),
  });
  const responseJson = await response.json();

  window.location.href = "/lista-mascotas";
}
