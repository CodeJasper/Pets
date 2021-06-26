const express = require("express");

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(express.json({ limit: "50mb" }));

app.use("/", require("./router/WebRoutes"));

const dbConfig = require("./config_db/mongooseConfig");

const port = 3000;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", require("./router/WebRoutes"));

app.use(express.static(__dirname + "/public"));

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log("Server started");
});
