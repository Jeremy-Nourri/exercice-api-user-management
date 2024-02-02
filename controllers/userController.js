const bcrypt = require('bcrypt');

const Users = require('../models/userModel');

const userController = {

    createUser: async (req, res) => {
        try {
            const userData = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;

            const user = await Users.create(userData);
            res.status(201).json(user);
        }
        catch(error) {
            res.status(400).json({ error: "Erreur lors de la création d'un nouvel utilisateur" });
        }
    }
}

module.exports = userController;