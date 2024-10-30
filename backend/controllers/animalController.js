// controllers/animalController.js
const Animal = require('../models/animal');

// Obtener todos los animales
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener animales', error });
    }
};

// Agregar un nuevo animal
exports.addAnimal = async (req, res) => {
    try {
        const newAnimal = new Animal(req.body);
        const savedAnimal = await newAnimal.save();
        res.status(201).json(savedAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar animal', error });
    }
};

// Obtener un animal por ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener animal', error });
    }
};

// Actualizar un animal
exports.updateAnimal = async (req, res) => {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnimal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar animal', error });
    }
};

// Eliminar un animal
exports.deleteAnimal = async (req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) return res.status(404).json({ message: 'Animal no encontrado' });
        res.status(200).json({ message: 'Animal eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar animal', error });
    }
};