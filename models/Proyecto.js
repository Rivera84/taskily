//Importamos sequelize
const Sequelize = require("sequelize");
//Importar configuracion de la base de datos
const db = require("../config/db");
//Import slug
const slug = require("slug");
//importar shortid
const shortid = require("shortid");

//Definicion del modelo
const Proyecto = db.define("proyecto",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    fecha: {
        type: Sequelize.DATE
    },
    url:{
        type: Sequelize.STRING
    }
},{
    hooks:{
        beforeCreate(proyecto){
            console.log("antes de insertar en la base de datos");
            const url = slug(proyecto.nombre).toLowerCase();
            const date = new Date();
            
            proyecto.url = `${url}_${shortid.generate()}`;
            proyecto.fecha = date.toISOString();
        },
        beforeUpdate(proyecto){
            console.log("Antes de actualizar la base");
            const url = slug(proyecto.nombre).toLowerCase();

            proyecto.url = `${url}_${shortid.generate()}`;

        }
    }
}
);

//Importar el modelo para poder utilizar
module.exports = Proyecto;