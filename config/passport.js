//Importar passport
const passport = require("passport");
//Utilizar la estrategia local
const LocalStrategy = require("passport-local");
//Importar la referencia al modelo que contiene los datos de autenticacion
const Usuario = require("../models/Usuario");

//Definir uestra estrategia de autenticacion
//Local Strategy => realizar un login con credenciales propias (user, pass)
passport.use(
    new LocalStrategy(
        //Por defecto espera un passport en LocalStrategy de un usuario y una contrasena
        {
            usernameField: "email",
            passwordField: "password"
        },
        //Verificar si los datos enviados pro el usuario son correcots
        async (email, password, done) =>{
            try {
                //Realizar la busqueda del usuario
                const usuario = await Usuario.findOne({
                    where: {email}
                });
                //Si el usuario existe, verificar si su contraseña es correcta
                if(!usuario.comparePassword(password)){
                    return done(null, false, {
                        message: "Nombre de usuario o contraseña incorrecta"
                    });
                }

                return done(null, usuario);
            } catch (error) {
                //El usuario no existe
                return done(null, false, {
                    message: "La cuenta de correo electronico no se encuentra registrada"
                })
                
            }
        }
    )
);

//Permitir que passport lea los valores del objeto usuario
//Serializar el usuario
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null, usuario);
});

module.exports = passport;