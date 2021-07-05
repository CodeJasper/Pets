const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cookieParse = require("cookie-parser");
const port = process.env.PORT || 3000;
const PassportLocal = require("passport-local").Strategy;
require("dotenv").config();
require("./config_passport/passport");
require("./config_db/mongooseConfig");

//Midlewares
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParse("secret"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/public"));

//Global varibles
app.use((req, res, next) => {
  res.locals.user = req.user || null;

  next();
});

//routes
app.use("/usuario", require("./router/UserRoutes"));
app.use("/", require("./router/PetRoutes"));
app.use((req, res) => {
  res.status(404).render("404");
});

//View Engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.listen(port, () => {
  console.log("Server started");
});
