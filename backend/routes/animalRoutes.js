// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// Ruta para listar todos los animales
router.get('/', animalController.getAllAnimals);

// Ruta para agregar un nuevo animal
router.post('/', animalController.addAnimal);

// Ruta para obtener un animal por ID
router.get('/:id', animalController.getAnimalById);

// Ruta para actualizar un animal por ID
router.put('/:id', animalController.updateAnimal);

// Ruta para eliminar un animal por ID
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
