import { useState } from 'react';
import Header from '../components/Header';
import TimetableTable from '../components/TimetableTable';

const FacultyDashboard = () => {

  const [faculty, setFaculty] = useState("");
  const [facultyTimetable, setFacultyTimetable] = useState([]);
  const [substitutions, setSubstitutions] = useState([]);

  const loadTimetable = async () => {
    if (!faculty.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/timetable/faculty?faculty=${faculty.trim()}`
      );

      const data = await res.json();

      setFacultyTimetable(data);
      setSubstitutions(data.filter(entry => entry.isSubstitution));

    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-heading">Faculty Dashboard</h1>

        <div className="dashboard-container">

          {/* 🔥 Faculty Filter */}
          <div className="dashboard-section">
            <div className="profile-header">
              <h2>My Timetable</h2>

              {/* Input with placeholder */}
              <input
                type="text"
                placeholder="Enter Faculty Code (Eg: JFL, PT, SS...)"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value.toUpperCase())}
                className="form-input"
                style={{ marginLeft: '15px', width: '250px' }}
              />

              <button
                onClick={loadTimetable}
                className="btn btn-outline"
                style={{ marginLeft: '10px' }}
              >
                Show
              </button>
            </div>

            {/* Timetable */}
            <TimetableTable data={facultyTimetable} viewType="faculty" />
          </div>

          {/* 🔥 Substitution */}
          {substitutions.length > 0 && (
            <div className="dashboard-section">
              <h2>Current Substitutions</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Section</th>
                      <th>Subject</th>
                      <th>Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {substitutions.map((sub) => (
                      <tr key={sub.id}>
                        <td>{sub.year}</td>
                        <td>{sub.section}</td>
                        <td>{sub.sub_code}</td>
                        <td>{sub.venue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;