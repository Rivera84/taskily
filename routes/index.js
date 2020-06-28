//Importar express router
const express = require("express");
const routes = express.Router();

//Importar los controladores
const proyectosController = require("../controllers/proyectosController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

//Construir las rutas disponibles para el servidor
//Las rutas deben exportarse para ser usadas en otros archivos
module.exports = function(){
    routes.get("/", proyectosController.proyectosHome);
    routes.post("/nuevo_proyecto", proyectosController.nuevoProyecto);
    routes.get("/nuevo_proyecto", proyectosController.formularioNuevoProyecto);

    //Rutas para autenticacion
    routes.get("/registrate", usuariosController.formularioCrearCuenta);
    routes.post("/registrate", usuariosController.crearCuenta);
    routes.get("/iniciar_sesion", usuariosController.formularioIniciarSesion);
    routes.post("/iniciar_sesion", authController.autenticarUsuario);
    return routes;
}  