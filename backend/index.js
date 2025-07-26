import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const STEAM_API_KEY = process.env.STEAM_API_KEY;

app.use(cors());

// Endpoint para lista de jogos (GetAppList) — Steam não exige API key aqui
app.get("/apps", async (req, res) => {
  try {
    const { random } = req.query;
    let response = await fetch(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    );

    if (random) {
      response = await response.json();
      const randomApps = response.applist.apps.sort(() => Math.random() - 0.5);
      response.applist.apps = randomApps;
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar lista de jogos" });
  }
});

// Endpoint para detalhes de um jogo (store.steampowered.com)
app.get("/appdetails/:appid", async (req, res) => {
  const { appid } = req.params;
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar detalhes do jogo" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
