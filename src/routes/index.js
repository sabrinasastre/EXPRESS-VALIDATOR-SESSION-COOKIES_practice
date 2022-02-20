var express = require("express");
var router = express.Router();
//requiero al "check" que viene en express validator con un destructuring:
const { check } = require("express-validator");
const controller = require("../controllers/mainController");

//creo un array de validaciones:
/*const validaciones = [
  check("name").notEmpty().withMessage("El nombre no puede estar vacío").bail(),
  check("color").notEmpty().withMessage("El color no puede estar vacío").bail(),
  check("email")
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("ingresar un mail válido"),
]; */

/* GET home page. */
router.get("/", controller.index);
router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Debe ingresar un nombre"),
    check("email").isEmail().withMessage("Debe ingresar un email valido"),
    check("color")
      .isLength({ min: 1 })
      .withMessage("Debe seleccionar un color"),
  ],
  controller.store
);

router.get("/", controller.index);
router.post("/", validaciones, controller.store);
router.get("/color", controller.color);
router.get("/borrar", controller.borrar);

module.exports = router;
