const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Fichiers statiques (images, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Page d’accueil
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Ezoclaim Bot</title></head>
      <body style="text-align:center;font-family:sans-serif;">
        <img src="/logo.png" alt="Logo" width="100"/>
        <h1>Bienvenue sur Ezoclaim</h1>
        <p>Page web de claim et de scan</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
