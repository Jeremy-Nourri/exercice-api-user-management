const bcrypt = require('bcrypt')

const Users = require('../models/userModel');

const userController = {

    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;

            const { username, email } = await Users.create(userData);
            res.status(201).json({ username, email});
        }
        catch (error) {
            res.status(400).json({ error: "Erreur lors de la création d'un nouvel utilisateur" });
        }
    },
    
    loginUser: async (req, res) => {
        try {
            const userEmail = req.body.email;
            const passwordFromRequest = req.body.password;

            const { username, email, password }  = await Users.findOne({ email: userEmail });

            const validPassword = await bcrypt.compare(passwordFromRequest, password);

            if (!username || !validPassword) {
                return res.status(400).json({ message: "Email ou/et mot de passe invalide(s)" });
            }
            res.send({ username, email });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = userController;