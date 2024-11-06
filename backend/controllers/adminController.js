// controllers/adminController.js
const Animal = require('../models/animal');
const path = require('path');
const fs = require('fs');

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
        const newAnimal = new Animal({
            ...req.body,
            imagenUrl: req.file ? `/uploads/${req.file.filename}` : null // Guardar la URL de la imagen
        });

        const savedAnimal = await newAnimal.save();
        res.status(201).json({ message: 'Animal agregado exitosamente', animal: savedAnimal });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar animal', error });
    }
};

// Actualizar un animal
exports.updateAnimal = async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
            imagenUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imagenUrl // Mantener la imagen anterior si no se sube una nueva
        };

        const animal = await Animal.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });

        res.json({ message: 'Animal actualizado exitosamente', animal });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar animal', error });
    }
};

// Eliminar un animal
exports.deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });

        res.json({ message: 'Animal eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar animal', error });
    }
};
