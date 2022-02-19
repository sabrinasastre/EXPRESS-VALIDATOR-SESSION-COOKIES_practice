var express = require("express");
var router = express.Router();
//requiero al "check" que viene en express validator con un destructuring:
const { check } = require("express-validator");
const controller = require("../controllers/mainController");

//creo un array de validaciones:
const validaciones = [
  check("name").notEmpty().withMessage("El nombre no puede estar vacío").bail(),
  check("color").notEmpty().withMessage("El color no puede estar vacío").bail(),
  check("email")
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("ingresar un mail válido"),
];

router.get("/", controller.index);
router.post("/", validaciones, controller.store);

module.exports = router;
