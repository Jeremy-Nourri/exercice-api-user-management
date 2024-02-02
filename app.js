const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')

const app = express();

const PORT = 3000;

(async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/user-management', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    });
} catch (err) {
    console.error("Erreur de connexion à la base de données:", err);
  }
})();

const db = mongoose.connection;

db.on('error', (error) => console.error('Erreur de connexion à MongoDB :', error));
db.once('open', () => console.log('Connecté à MongoDB'));

app.use(bodyParser.json());

app.use(userRoutes);

app.get('*', (req, res) => {
    res.status(404).json({ error: "page non trouvée" })
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
})