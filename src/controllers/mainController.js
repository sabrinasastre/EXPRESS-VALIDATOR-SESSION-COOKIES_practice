const { validationResult } = require("express-validator");
//acá el profe exportó de una manera loca que no entiendo bien por qué:
module.exports = {
  index(req, res) {
    res.render("index");
  },
  store(req, res) {
    //guardamos los errors del validationResult(req) en una constante:
    const errors = validationResult(req);
    console.log(errors);
    //Preguntamos si esta vacio errors:
    if (!errors.isEmpty()) {
      return res.render("index", { errors: errors.errors, old: req.body });
    }
    //si hay errores mandar todos los errores al ejs y mostrarlas:
    res.render("index", { data: req.body });

    //si no vienen errros renderiza la vista index con el mensaje y
    //los valores que hayan puesto en el formulario
  },
};

//module.exports=controller  (lo comenté porque el profe ya exportó de otra manera en línea 3)
