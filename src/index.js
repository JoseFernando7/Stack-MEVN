const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//Conectar a base de datos
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));

//---------------------Setters---------------------

//Guarda en la variable 'port' el puerto enviado por el hosting en process o, 
//en su defecto, el puerto 3000
app.set('port', process.env.PORT || 3000);

//---------------------Middlewares---------------------

//Muestra mensajes de estado de los diferentes archivos cargados en el navegador
app.use(morgan('dev'));
//Convierte todos los datos enviados desde el navegador en archivos con formato json.
app.use(express.json());

//---------------------Rutas---------------------
//Requiere las rutas del archivo tasks.js
app.use('/api/tareas', require('./routes/tasks.js'));

//---------------------Archivos estáticos---------------------
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function()
{
    console.log(`Server on port ${app.get('port')}`);
});