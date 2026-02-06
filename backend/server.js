const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const timetableRoutes = require("./routes/timetableRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/timetable", timetableRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/timetable_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
