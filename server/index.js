'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;


//Conexion DB
mongoose.connect('mongodb+srv://PrototipoTesina:prototipot3s1n4@prototipotesina-i1iny.azure.mongodb.net/tesina?retryWrites=true&w=majority',{useMongoClient : true})
.then(() =>
{
    console.log("La conexion a la base de datos Tesina, se ha realizado correctamente");

    //Crear servidor
    app.listen(port,() =>{
        console.log("Servidor corriendo en http://localhost:39000");
    });

})
.catch(err => console.log(err));

