const { validationResult } = require("express-validator");
//acá el profe exportó de una manera loca que no entiendo bien por qué:
//comento código SIN session:

/*module.exports = {
  index(req, res) {
    res.render("index"); */

//así quedó cuando agregamos session:
module.exports = {
  index: function (req, res) {
    if (req.session.name) {
      console.log("req.session desde index: ", req.session);

      let data = req.session;
      return res.render("index", { data });
    }
    res.render("index");
  },

  store: function (req, res) {
    //guardamos los errors del validationResult(req) en una constante:
    const errors = validationResult(req);
    console.log(errors);
    //Preguntamos si esta vacio errors:
    if (!errors.isEmpty()) {
      let data = req.session;
      //return res.render("index", { errors: errors.errors, old: req.body });
      return res.render("index", { errors: errors.errors, data });
    }
    //si hay errores mandar todos los errores al ejs y mostrarlas:
    //res.render("index", { data: req.body });
    req.session.name = req.body.name;
    req.session.color = req.body.color;
    req.session.email = req.body.email;
    req.session.age = req.body.age;
    req.session.cualquierCosa = "cualquier cosa";

    if (req.body.recordar_color) {
      res.cookie("color", req.body.color, { maxAge: 60 * 1000 });
    }

    res.redirect("/");
    //si no vienen errros renderiza la vista index con el mensaje y
    //los valores que hayan puesto en el formulario
  },

  color: function (req, res) {
    if (req.session.name) {
      console.log("REQ SESSION DESDE COLOR: ", req.session);
      let data = req.session;
      let color = req.cookies.color;
      console.log(color);
      return res.render("color", { data, color });
    }
    res.render("color");
  },

  borrar: (req, res) => {
    req.session.color = null;
    res.cookie("color", null, { maxAge: -1 });
    res.send("Color borrado");
  },
};

//module.exports=controller  (lo comenté porque el profe ya exportó de otra manera en línea 3)
