const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const Users = require('../models/userModel');

const userController = {

    signUp: async (req, res) => {
        try {
            const userData = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;

            const { username, email } = await Users.create(userData);
            res.status(201).json({ username, email });
        }
        catch (error) {
            res.status(400).json({ error: "Erreur lors de la création d'un nouvel utilisateur" });
        }
    },

    loginUser: async (req, res) => {
        try {
            const userEmail = req.body.email;
            const passwordFromRequest = req.body.password;

            const { username, password, id } = await Users.findOne({ email: userEmail });

            const validPassword = await bcrypt.compare(passwordFromRequest, password);

            if (!username || !validPassword) {
                return res.status(401).json({ message: "Email ou/et mot de passe invalide(s)" });
            }

            const token = jwt.sign({ id }, process.env.RANDOM_TOKEN_SECRET, { expiresIn: "1d" });
        
            res.header('Authorization', `Bearer ${token}`).json({ message: 'Login successful', token });

        } catch (error) {
            res.status(500).json({ error, message: "erreur lors de la requête" });
        }
    },

    // getUser: async (req, res) => {
    //     try {

    //         const userId = req.user.id;

    //         const user = Users.findOne({ userId }).select('-password');

    //         if (!user) {
    //             return res.status(404).json({ message: "Aucun utilisateur" });
    //         }
    //         res.json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: "Erreur lors de la requête" })
    //     }
    // },


    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find().select('-password');
            if (!users) {
                return res.status(404).json({ message: "Aucun utilisateur" });
            }
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la requête" })
        }
    },
}

module.exports = userController;