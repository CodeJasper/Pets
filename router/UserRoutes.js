const express = require("express");
const router = express.Router();
const userApi = require("../Api/UsersApi");
const userValidation = require("../validations/userValidation");
const passport = require("passport");

router.post("/registrar", async (req, res) => {
  const error = userValidation.validateRegister.validate(req.body);

  if (req.body.password !== req.body.confirmPassword) {
    console.log("Las contraseñas no coinciden");
  }
  if (error.error) return res.send(error);

  const isEmailExist = await userApi.findUserByEmail(req.body.email);
  if (isEmailExist) {
    return res.send({
      error: true,
      message: "Este correo ya esta asociado a otro usuario",
    });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const response = await userApi.registerUser(newUser);
  if (response.error) {
    //TODO Handle error
  } else {
    //TODO Handle register succesfuly
    res.redirect("/usuario/iniciar-sesion");
  }
});

router.post(
  "/ingresar",
  passport.authenticate("local", {
    failureRedirect: "/usuario/iniciar-sesion",
    successRedirect: "/lista-mascotas",
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
