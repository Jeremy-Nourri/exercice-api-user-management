const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authentication')
const userController = require('../controllers/userController')

router.get("/", (req, res) => {
    res.send("Bienvenue sur mon exercice d'API réalisée avec Express js et Mongoose")
})

router.get('/users', userController.getAllUsers);
router.get('/profile', verifyToken, userController.getUser);

router.post('/signup', userController.signUp);
router.post('/login', userController.loginUser);


module.exports = router;