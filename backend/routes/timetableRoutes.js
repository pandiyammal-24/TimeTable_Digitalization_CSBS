const express = require("express");
const router = express.Router();

const Timetable = require("../models/Timetable");
const { getFacultyTimetable } = require("../controllers/timetableController");

// Student timetable
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

// Faculty timetable
router.get("/faculty", getFacultyTimetable);

router.get("/year", async (req, res) => {
  const { year } = req.query;

  try {
    const data = await Timetable.find({ year: year });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;