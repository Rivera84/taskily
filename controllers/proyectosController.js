 //Importar los modelos necesarios
 const Proyecto = require("../models/Proyecto");

 //Muestra todos los proyectos del usuario
 exports.formularioNuevoProyecto = (req, res, next)=>{
     res.render("crear_proyecto");
 };

 //Permite la creacion de un nuevo proyecto
//La conexion para almacenar en la base de datos es asincrona (async/ await)

 exports.nuevoProyecto = async(req, res, next)=>{
    console.log(req.body);
    //validar que el input del formulario tenga valor
    //Para acceder a los valores y asignarlos a un solo paso
    //vamos a utilizar destructuring
    const {nombre, descripcion} = req.body;
    //const fecha = Date.now();
    const mensajes = [];
    //verificar si el nombre del proyecto tiene un valor
    if (!nombre){
        mensajes.push({error: "El nombre del proyecto no puede ser vacio.", type:"alert-danger"});
    }

      //verificar si la descripcion del proyecto tiene un valor
      if (!descripcion){
        mensajes.push({error: "Debes ingresar una breve descripcion", type:"alert-danger"});
    }

    //Si hay errores
    if(mensajes.length){
        res.render("crear_proyecto", {
            mensajes,
        });
    }else{
        try{
        //insertar el proyecto a la base de datos
       await Proyecto.create({nombre, descripcion});

            mensajes.push({
                error: "Proyecto almacenado satisfactoriamente",
                type: "alert-success"
                
            });
            res.redirect("/");
        }catch(error){
            mensajes.push({
                error: "Ha ocurrido un error interno en el servidor. Comunicate con el personal de taskily",
                type:"alert-warning"
            })
        }

    
 }
}

//Obtener todos los proyectos
exports.proyectosHome = async (req, res, next) =>{
    const mensajes = [];
    try{
        const proyectos = await Proyecto.findAll();
      //  console.log(proyectos);
        res.render("home_proyecto", { proyectos});
    }catch(error){
        //Crear el mensaje de error
        mensajes.push({
            error: "Error al obtener los proyectos, por favor reintentar",
            type:"alert-warning"
        });
        res.render("home_proyecto", mensajes);
    }
}