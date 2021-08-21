const express = require("express");
const router = express.Router();
const userApi = require("../Api/UsersApi");
const userValidation = require("../validations/userValidation");
const passport = require("passport");

router.post("/registrar", async (req, res) => {
  const error = userValidation.validateRegister.validate(req.body);

  if (error.error) {
    req.flash("error_message", error.error.details[0].message);
    return res.redirect("/usuario/registrar-usuario");
  }

  const isEmailExist = await userApi.findUserByEmail(req.body.email);
  if (isEmailExist) {
    req.flash("error_message", "Este correo ya esta asociado a otro usuario");
    return res.redirect("/usuario/registrar-usuario");
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const response = await userApi.registerUser(newUser);
  if (response.error) {
    req.flash(
      "error_message",
      "No se ha podido registrar el usuario por el siguiente error: " +
        response.error
    );
    res.redirect("/usuario/registrar-usuario");
  } else {
    req.flash("error_message", "Usuario registrado satisfactoriamente");
    res.redirect("/usuario/registrar-usuario");
  }
});

router.post(
  "/ingresar",
  passport.authenticate("local", {
    failureRedirect: "/usuario/iniciar-sesion",
    successRedirect: "/lista-mascotas",
    failureFlash: true,
    badRequestMessage:
      "Los campos correo electronico y contraseña son obligatorios",
  })
);

router.get("/iniciar-sesion", (req, res) => {
  if (res.locals.user !== null) return res.redirect("/lista-mascotas");

  res.render("login", {
    extraCss: ["/css/loginForm.css"],
  });
});

router.get("/registrar-usuario", (req, res) => {
  if (res.locals.user !== null) return res.redirect("/lista-mascotas");
  res.render("registerUser", {
    extraCss: ["/css/registerUserForm.css"],
  });
});

module.exports = router;
