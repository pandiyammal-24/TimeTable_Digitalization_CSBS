import { useState } from 'react';
import Header from '../components/Header';
import TimetableTable from '../components/TimetableTable';
import { mockAdminTimetable, mockLeaveRequests, VENUES } from '../data/mockData';

const AdminDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState(
    JSON.parse(localStorage.getItem('tms_leaveRequests') || JSON.stringify(mockLeaveRequests))
  );

  const handleLeaveAction = (id, action) => {
    const updatedRequests = leaveRequests.map(req =>
      req.id === id ? { ...req, status: action } : req
    );
    setLeaveRequests(updatedRequests);
    localStorage.setItem('tms_leaveRequests', JSON.stringify(updatedRequests));
    alert(`Leave request ${action}!`);
  };

  const getVenueSchedule = () => {
    const venueSchedule = {};

    VENUES.forEach(venue => {
      venueSchedule[venue.name] = [];
    });

    mockAdminTimetable.forEach(entry => {
      if (venueSchedule[entry.venue]) {
        venueSchedule[entry.venue].push({
          day: entry.dayOfWeek,
          time: `${entry.startTime} - ${entry.endTime}`,
          subject: entry.subject,
          year: entry.year,
          section: entry.section,
        });
      }
    });

    return venueSchedule;
  };

  const venueSchedule = getVenueSchedule();

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-heading">Admin Dashboard</h1>

        <div className="dashboard-container">
          <div className="dashboard-section">
            <h2>Overall Timetable</h2>
            <TimetableTable data={mockAdminTimetable} />
          </div>

          <div className="dashboard-section">
            <h2>Leave Requests Management</h2>
            {leaveRequests.length === 0 ? (
              <p style={{ color: '#666' }}>No leave requests.</p>
            ) : (
              <div className="leave-list">
                {leaveRequests.map((leave) => (
                  <div key={leave.id} className={`leave-item ${leave.status}`}>
                    <p><strong>Faculty:</strong> {leave.facultyName}</p>
                    <p><strong>Date:</strong> {leave.startDate} to {leave.endDate}</p>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`leave-status ${leave.status}`}>
                        {leave.status}
                      </span>
                    </p>
                    {leave.status === 'pending' && (
                      <div className="substitution-actions">
                        <button
                          className="btn btn-success"
                          onClick={() => handleLeaveAction(leave.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleLeaveAction(leave.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <h2>Venue Availability & Schedule</h2>
            {VENUES.map(venue => (
              <div key={venue.id} style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>
                  {venue.name} ({venue.type} - Capacity: {venue.capacity})
                </h3>
                {venueSchedule[venue.name].length === 0 ? (
                  <p style={{ color: '#666', marginLeft: '20px' }}>No classes scheduled</p>
                ) : (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Time</th>
                          <th>Subject</th>
                          <th>Class</th>
                        </tr>
                      </thead>
                      <tbody>
                        {venueSchedule[venue.name].map((schedule, idx) => (
                          <tr key={idx}>
                            <td>{schedule.day}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.subject}</td>
                            <td>
                              Year {schedule.year}, Section {schedule.section}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
