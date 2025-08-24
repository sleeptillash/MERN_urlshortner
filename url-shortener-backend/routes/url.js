const express = require("express");
const router = express.Router();
const Url = require("../models/url");
const { nanoid } = require("nanoid");

// POST /api/shorten
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE_URL;

  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  try {
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json({ shortUrl: `${base}/${existing.shortCode}` });
    }

    const shortCode = nanoid(6);
    const newUrl = await Url.create({ originalUrl, shortCode });
    res.status(201).json({ shortUrl: `${base}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:shortCode
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    }
    res.status(404).json({ error: "Short URL not found" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/urls
router.get("/admin/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ dateCreated: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
