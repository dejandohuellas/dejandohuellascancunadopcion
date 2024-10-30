// routes/admin.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/animal');

module.exports = (upload) => {
    // Ruta para agregar un nuevo animal con imagen
    router.post('/agregar', upload.single('imagen'), async (req, res) => {
        try {
            const nuevoAnimal = new Animal({
                ...req.body,
                imagenUrl: req.file ? `/uploads/${req.file.filename}` : null
            });

            await nuevoAnimal.save();
            res.status(201).json({ message: 'Animal agregado exitosamente', animal: nuevoAnimal });
        } catch (error) {
            console.error('Error al agregar el animal:', error);
            res.status(500).json({ message: 'Error al agregar el animal' });
        }
    });

    // Ruta para obtener lista de animales
    router.get('/animales', async (req, res) => {
        try {
            const animales = await Animal.find();
            res.json(animales);
        } catch (error) {
            console.error('Error al obtener animales:', error);
            res.status(500).json({ message: 'Error al obtener animales' });
        }
    });

    // Ruta para actualizar un animal
    router.put('/editar/:id', upload.single('imagen'), async (req, res) => {
        try {
            const updatedData = {
                ...req.body,
                imagenUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imagenUrl
            };

            const animal = await Animal.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });

            res.json({ message: 'Animal actualizado exitosamente', animal });
        } catch (error) {
            console.error('Error al actualizar el animal:', error);
            res.status(500).json({ message: 'Error al actualizar el animal' });
        }
    });

    // Ruta para eliminar un animal
    router.delete('/eliminar/:id', async (req, res) => {
        try {
            const animal = await Animal.findByIdAndDelete(req.params.id);
            if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });

            res.json({ message: 'Animal eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el animal:', error);
            res.status(500).json({ message: 'Error al eliminar el animal' });
        }
    });

    return router;
};