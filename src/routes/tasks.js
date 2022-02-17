//Este JS se encarga de manejar todas las rutas de la aplicación.
const express = require('express');
const Task = require('../models/DBModel');

const router = express.Router();

//Crea ruta /tareas con sus funciones.

//Get para mostrar datos en el navegador
router.get('/', async function(req, res)
{
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async function(req, res)
{
    const task = await Task.findById(req.params.id);
    res.json(task);
})

//Post para recibir datos enviados por el usuario desde el navegador
router.post('/', async function(req, res)
{
    const task = new Task(req.body);
    await task.save();
    res.json({status: "Tarea Guardada"});
});

//Put para actualizar los datos del usuario
router.put('/:id', async function(req, res)
{
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: "Tarea actualizada"});
});

//Delete para eliminar datos
router.delete('/:id', async function(req, res)
{
    await Task.findByIdAndDelete(req.params.id);
    res.json({status: "Tarea eliminada"});
});

//Exportar router con todas las direcciones de enlace.
module.exports = router;