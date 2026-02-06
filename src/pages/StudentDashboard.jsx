import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import TimetableTable from '../components/TimetableTable';
import StudentProfileSetup from '../components/StudentProfileSetup';
import { mockTimetable, VENUES } from '../data/mockData';

const StudentDashboard = () => {
  const { user, updateUser } = useAuth();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [studentTimetable, setStudentTimetable] = useState([]);
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    // Check if student has set their year and section
    if (user.role === 'student' && (!user.year || !user.section)) {
      setShowProfileSetup(true);
    } else {
      loadTimetable();
    }
  }, [user]);

  const loadTimetable = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/timetable?year=${user.year}&section=${user.section}`
    );

    const data = await res.json();

    setStudentTimetable(data);
    setSubstitutions(data.filter(entry => entry.isSubstitution));
  } catch (error) {
    console.error("Error fetching timetable:", error);
    setStudentTimetable([]);
    setSubstitutions([]);
  }
};

  const handleProfileComplete = (updatedUser) => {
    updateUser(updatedUser);
    setShowProfileSetup(false);
    loadTimetable();
  };

  if (showProfileSetup) {
    return (
      <>
        <Header />
        <div className="page-container">
          <StudentProfileSetup onComplete={handleProfileComplete} />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-heading">Student Dashboard</h1>

        <div className="dashboard-container">
          <div className="dashboard-section">
            <div className="profile-header">
              <h2>My Timetable</h2>
              <button 
                onClick={() => setShowProfileSetup(true)}
                className="btn btn-outline"
                style={{ marginLeft: '15px' }}
              >
                Year & Section
              </button>
            </div>
            <p style={{ marginBottom: '20px' }}>
              Year: {user.year} | Section: {user.section}
            </p>
            <TimetableTable data={studentTimetable} />
          </div>

          {substitutions.length > 0 && (
            <div className="dashboard-section">
              <h2>Current Substitutions</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Faculty</th>
                      <th>Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {substitutions.map((sub) => (
                      <tr key={sub.id}>
                        <td>{sub.day}</td>
                        <td>{sub.time}</td>
                        <td>{sub.sub_code}</td>
                        <td>{sub.faculty}</td>
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

export default StudentDashboard;
