// config/database.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error.message);
        process.exit(1); // Salir con error si no se conecta
    }
};

module.exports = connectDB;
