const express = require("express");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "../config.env" });
require("./backend/db/conn");
const session = require("express-session");
const flash = require("connect-flash");

const port = process.env.PORT || 4000;

const staticpath = path.join(__dirname, "./client");
const template_path = path.join(__dirname, "./client/views");
const public_path = path.join(__dirname, "public");
const router = require("./backend/routers/routers");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(staticpath));
app.use("/scss", express.static(staticpath));
app.use(express.static("public"));

app.use(express.static(public_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use("/", router);

app.listen(port, () => {
  console.log("Server is listening on", port);
});

module.exports = app;
