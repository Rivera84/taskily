 //Importar los modelos necesarios
 const Proyecto = require("../models/Proyecto");

 //Muestra todos los proyectos del usuario
 exports.home = (req, res, next)=>{
     res.render("crear_proyecto");
 };

 //Permite la creacion de un nuevo proyecto
 exports.nuevoProyecto = (req, res, next)=>{
    console.log(req.body);
    //validar que el input del formulario tenga valor
    //Para acceder a los valores y asignarlos a un solo paso
    //vamos a utilizar destructuring
    const {nombre} = req.body;
    const errores = [];
    //verificar si el nombre del proyecto tiene un valor
    if (!nombre){
        errores.push({error: "El nombre del proyecto no puede ser vacio."});
    }
    //Si hay errores
    if(errores.length){
        res.render("crear_proyecto", {
            errores,
        });
    }else{
        //insertar el proyecto a la base de datos
        res.send("Insertado en la base de datos");
    }
    
 }

 