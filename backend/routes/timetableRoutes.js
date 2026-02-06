const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

router.get("/", async (req, res) => {
  try {
    const { year, section } = req.query;

    const query = {};
    if (year) query.year = Number(year);
    if (section) query.section = section.toUpperCase();

    const data = await Timetable.find(query).sort({
      day: 1,
      period: 1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
