const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get("/", (req, res) => {
    res.send("Bienvenue sur mon exercice d'API réalisée avec Express js et Mongoose")
})

router.post('/create-user', userController.createUser);


module.exports = router;