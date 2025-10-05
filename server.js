// 🌐 Emon Video Downloader Backend
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/alldown", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.status(400).json({ error: "Missing url" });

  try {
    // Proxy call to Nayan API
    const response = await fetch(`https://nayan-video-downloader.vercel.app/alldown?url=${encodeURIComponent(videoURL)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ error: "Failed to fetch video data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Emon API running at http://localhost:${PORT}`));
