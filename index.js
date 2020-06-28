//Importar los modulos de express.js
const express = require('express'); //require lo que hace es que nos ayuda a cargar un modulo

//Importar Handlebars
const exphbs = require("express-handlebars");


//Importar bodyParser que nos permite acceder al cuerpo
//de la peticion HTTP
const bodyParser = require("body-parser");

//Importar todas las rutas disponibles
const routes = require('./routes');

//Importar passport para permitir el inicio de sesion
const passport = require("./config/passport");

//importamos passport install --save passport passport-local

//Crear la conexion con la base de datps
const db = require("./config/db");

//importar los modelos
require("./models/Proyecto");
require("./models/Usuario");

//Realizar la concexion a la base de datos
//Sequelize se conecta mediante promesas
db.sync()
  .then(()=> console.log("Conectado con el servidor de base de datos"))
  .catch(error => console.log(error));

//Crear un servidor de express.js
const app = express();

//Indicar el templeaate engine a utilizar(Handlebars)
app.engine("hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs"
}));

app.set("view engine", "hbs");

//Habilitar bodyParser para leer los datos enviados por POST
app.use(bodyParser.urlencoded({extended:true}));

//Crear una instancia de passport y cargar nuestra entrategia
app.use(passport.initialize());
app.use(passport.session());

//Indicarle a express donde estan las rutas del servidor
app.use("/", routes());


//Inicializar servidor en un puerto especifico
app.listen(7000, ()=>{
    console.log("Servidor inicializado en el puerto 7000");

}); 