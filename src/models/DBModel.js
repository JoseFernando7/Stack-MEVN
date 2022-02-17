//Este archivo es para definir la estructura o modelo de los datos almacenados en la base de datos
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema(
{
    title: String,
    description: String
});

module.exports = mongoose.model('Task', Task);