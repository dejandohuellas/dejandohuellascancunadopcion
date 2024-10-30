// controllers/adminController.js
const Admin = require('../models/admin');

// Controlador para autenticación de administrador
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !await admin.comparePassword(password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};
