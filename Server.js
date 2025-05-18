const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const claimLogs = [];
const ADMIN_ID = "7477445958"; // Ton ID Telegram

// Page d’accueil
app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenue sur Ezoclaim</h1>
    <p><a href="/claim">Faire un claim</a> | <a href="/admin">Accès admin</a></p>
  `);
});

// Formulaire de claim
app.get("/claim", (req, res) => {
  res.send(`
    <h2>Formulaire de claim</h2>
    <form method="POST" action="/claim">
      <label>Votre identifiant Telegram:</label><br/>
      <input type="text" name="telegram_id" required/><br/><br/>
      <button type="submit">Valider</button>
    </form>
  `);
});

// Traitement du claim
app.post("/claim", (req, res) => {
  const { telegram_id } = req.body;
  const timestamp = new Date().toISOString();
  claimLogs.push({ telegram_id, timestamp });

  res.send(`
    <p>Claim effectué avec succès !</p>
    <a href="/">Retour</a>
  `);
});

// Page admin (affiche les logs)
app.get("/admin", (req, res) => {
  let content = "<h2>Logs des claims</h2>";

  if (claimLogs.length === 0) {
    content += "<p>Aucun claim effectué.</p>";
  } else {
    content += "<ul>";
    claimLogs.forEach((log, i) => {
      content += `<li>[${log.timestamp}] ID Telegram : ${log.telegram_id}</li>`;
    });
    content += "</ul>";
  }

  content += `<p><a href="/">Retour</a></p>`;
  res.send(content);
});

app.listen(PORT, () => {
  console.log("Serveur web actif sur le port", PORT);
});
