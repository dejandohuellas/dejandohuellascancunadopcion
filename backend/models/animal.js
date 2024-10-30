const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    raza: String,
    tamaño: String,
    sexo: String,
    caracteristicas: String,
    historia: String,
    imagenUrl: String  // Para la URL de la imagen subida
});

module.exports = mongoose.model('animal', AnimalSchema);
