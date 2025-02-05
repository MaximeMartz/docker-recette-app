require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AuthController = require("./authController");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API d'authentification !" });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Serveur auth démarré sur http://localhost:${PORT}`);
// });

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur auth démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;