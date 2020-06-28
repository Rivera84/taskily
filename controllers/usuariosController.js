//Importar el modelo
const Usuario = require("../models/Usuario");


exports.formularioCrearCuenta = (req, res, next) =>{
    res.render("registrarse", {layaout: "auth"});
}

exports.crearCuenta = async (req, res, next) =>{
    //Obtener los datos de la nueva cuenta
    //Obtener por destructuring
    const { fullname, email, password} = req.body;
    console.log(fullname, email, password);

    //intentar crear el usiario
    try {
        //Crear el usuario
        await Usuario.create({
            fullname,
            email,
            password
        });

        //redireccionar el usuario al formulario de inicio de seción
        res.render("iniciar_sesion");
    } catch (error) {
        res.render("registrarse", {
            error
        });
        
    }
}

exports.formularioIniciarSesion = (req, res, next) => {
    res.render("iniciar_sesion", { layout: "auth"});
}