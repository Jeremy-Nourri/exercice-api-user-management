const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get("/", (req, res) => {
    res.send("Bienvenue sur mon exercice d'API réalisée avec Express js et Mongoose")
})

router.get('/users', userController.getAllUsers);

router.post('/create-user', userController.createUser);
router.post('/login', userController.loginUser);



module.exports = router;