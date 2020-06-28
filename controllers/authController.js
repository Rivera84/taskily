//Importar passport
const passport = require("passport");
//Importtar el modelo de usuario
const Usuario = require("../models/Usuario");
//Importar Sequelize
const Sequelize = require("sequelize");

//Verificar si el usuario se puede autenticar con sus credenciales
exports.autenticarUsuario = passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/iniciar_sesion",
    badRequestMessage: "Debes ingresar tu correo electronico y tu contraseña"
});