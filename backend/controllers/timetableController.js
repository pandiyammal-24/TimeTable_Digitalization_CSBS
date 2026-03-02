const Timetable = require("../models/Timetable");

exports.getTimetable = async (req, res) => {
  try {
    const { year, section } = req.query;

    if (!year || !section) {
      return res.status(400).json({ message: "Year and Section required" });
    }

    const data = await Timetable.find({
      year: Number(year),
      section: section
    }).sort({ day: 1, period: 1 });

    if (data.length === 0) {
      return res.json([]);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get timetable for faculty
exports.getFacultyTimetable = async (req, res) => {
  try {
    const { faculty } = req.query;

    if (!faculty) {
      return res.status(400).json({ message: "Faculty is required" });
    }

    const timetable = await Timetable.find({
  faculty: { $regex: faculty, $options: "i" }
})
      .sort({ day: 1, period: 1 });

    res.status(200).json(timetable);
  } catch (error) {
    console.error("Faculty timetable error:", error);
    res.status(500).json({ message: "Server error" });
  }
};