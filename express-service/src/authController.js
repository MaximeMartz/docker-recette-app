const db = require("./database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "supersecret";

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username et password requis" });
    }

    try {
      const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Utilisateur déjà existant" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

      res.json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username et password requis" });
    }

    try {
      const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
      if (user.length === 0) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }

      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }

      const token = jwt.sign({ id: user[0].id, username: user[0].username }, secretKey, { expiresIn: "1h" });

      res.json({ message: "Connexion réussie", token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
