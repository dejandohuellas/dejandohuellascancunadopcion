// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Esto es para servir las imágenes desde la carpeta 'uploads'

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Crear la carpeta si no existe
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta de destino para imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});
const upload = multer({ storage });

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

// Importar y usar rutas
const adminRoutes = require('./routes/admin');
const animalRoutes = require('./routes/animalRoutes');

app.use('/admin', adminRoutes(upload)); // Pasamos 'upload' para cargar imágenes en admin
app.use('/animales', animalRoutes); // Sin 'upload', solo para visualización y operaciones CRUD básicas

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

