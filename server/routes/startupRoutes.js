import express from "express";
import mongoose from "mongoose";
import Startup from "../models/startup.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// ----------------------------
// SANITIZATION HELPERS
// ----------------------------
const stripScriptTags = (value) =>
  value.replace(/<script.*?>.*?<\/script>/gi, "");

const sanitizeString = (value, maxLength = 250) => {
  if (typeof value !== "string") return "";
  let v = value.trim();
  v = stripScriptTags(v);
  return v.slice(0, maxLength);
};

const sanitizeNumber = (value, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => {
  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
};

const sanitizeUrl = (value = "") => {
  const v = sanitizeString(value, 2048);
  if (!v) return "";
  const pattern = /^https?:\/\/[^\s]+$/i;
  return pattern.test(v) ? v : "";
};

const buildStartupPayload = (body) => {
  const payload = {
    name: sanitizeString(body.name, 120),
    state: sanitizeString(body.state, 80),
    sector: sanitizeString(body.sector, 120),
    funding: sanitizeNumber(body.funding, { min: 0 }),
    turnover: sanitizeNumber(body.turnover, { min: 0 }),
    companytype: sanitizeString(body.companytype, 80) || "Private Limited",
    registrationDate: body.registrationDate ? new Date(body.registrationDate) : undefined,
    rating: sanitizeNumber(body.rating, { min: 0, max: 5 }),
    description: sanitizeString(body.description, 2000),
    founder: sanitizeString(body.founder, 120),
    website: sanitizeUrl(body.website),
    email: sanitizeString(body.email, 120),
    phoneNumber: sanitizeString(body.phoneNumber, 20),
    imageUrl: sanitizeUrl(body.imageUrl),
  };

  if (!payload.name) return { ok: false, error: "Startup name is required." };
  if (!payload.state) return { ok: false, error: "State is required." };
  if (!payload.sector) return { ok: false, error: "Sector is required." };

  return { ok: true, data: payload };
};

// ----------------------------
// POST /api/startups/addStartup
// Protected Route
// ----------------------------
router.post("/addStartup", authMiddleware, async (req, res) => {
  try {
    const result = buildStartupPayload(req.body || {});
    if (!result.ok) {
      return res.status(400).json({ message: result.error });
    }

    const newStartup = new Startup(result.data);
    const savedStartup = await newStartup.save();
    res.status(201).json(savedStartup);
  } catch (err) {
    console.error("Error creating startup:", err);
    res.status(500).json({ message: "Failed to create startup" });
  }
});

// ----------------------------
// GET /api/startups/stats
// ----------------------------
router.get("/stats", async (req, res) => {
  try {
    const stats = await Startup.aggregate([
      {
        $group: {
          _id: null,
          totalFunding: { $sum: "$funding" },
          activeStartups: { $sum: 1 },
        },
      },
    ]);

    if (stats.length === 0) {
      return res.json({ totalFunding: 0, activeStartups: 0 });
    }

    res.json({
      totalFunding: stats[0].totalFunding || 0,
      activeStartups: stats[0].activeStartups || 0,
    });
  } catch (err) {
    console.error("Error fetching startup stats:", err);
    res.status(500).json({ message: "Failed to fetch startup statistics" });
  }
});

// ----------------------------
// GET /api/startups
// ----------------------------
router.get("/", async (req, res) => {
  try {
    const query = {};

    if (req.query.state) query.state = sanitizeString(req.query.state, 80);
    if (req.query.sector) query.sector = sanitizeString(req.query.sector, 120);

    if (req.query.minFunding) {
      const minFunding = sanitizeNumber(req.query.minFunding, { min: 0 });
      query.funding = { $gte: minFunding };
    }

    let startups;
    if (req.query.topByFunds === "true") {
      startups = await Startup.find(query).sort({ funding: -1 }).limit(3);
    } else {
      startups = await Startup.find(query);
    }

    res.json(startups);
  } catch (err) {
    console.error("Error fetching startups:", err);
    res.status(500).json({ message: "Failed to fetch startups" });
  }
});

// ----------------------------
// GET /api/startups/:id
// ----------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid startup ID" });
    }

    const startup = await Startup.findById(id);
    if (!startup) return res.status(404).json({ message: "Startup not found" });

    res.json(startup);
  } catch (err) {
    console.error("Error fetching startup by id:", err);
    res.status(500).json({ message: "Failed to fetch startup" });
  }
});

// ----------------------------
// GET /api/startups/state/:state
// ----------------------------
router.get("/state/:state", async (req, res) => {
  try {
    const state = sanitizeString(req.params.state, 80);
    const startups = await Startup.find({ state });
    res.json(startups);
  } catch (err) {
    console.error("Error filtering startups by state:", err);
    res.status(500).json({ message: "Failed to fetch startups by state" });
  }
});

export default router;
