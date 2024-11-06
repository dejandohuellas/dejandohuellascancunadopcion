// routes/admin.js
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

module.exports = (upload) => {
    // Ruta para agregar un nuevo animal con imagen
    router.post('/agregar', upload.single('imagen'), animalController.addAnimal);

    // Ruta para obtener lista de animales
    router.get('/animales', animalController.getAllAnimals);

    // Ruta para actualizar un animal con posible nueva imagen
    router.put('/editar/:id', upload.single('imagen'), animalController.updateAnimal);

    // Ruta para eliminar un animal
    router.delete('/eliminar/:id', animalController.deleteAnimal);

    return router;
};
