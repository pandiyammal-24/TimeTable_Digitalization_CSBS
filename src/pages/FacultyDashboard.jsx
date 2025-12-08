import { useState } from 'react';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import TimetableTable from '../components/TimetableTable';
import { mockFacultyTimetable, mockLeaveRequests, mockSubstitutionsForFaculty } from '../data/mockData';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState(
    JSON.parse(localStorage.getItem('tms_leaveRequests') || JSON.stringify(mockLeaveRequests))
  );
  const [substitutionRequests, setSubstitutionRequests] = useState(
    JSON.parse(localStorage.getItem('tms_substitutions') || JSON.stringify(mockSubstitutionsForFaculty))
  );
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [formError, setFormError] = useState('');

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) {
      setFormError('All fields are required');
      return;
    }

    const newLeave = {
      id: Date.now(),
      facultyName: user.name,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      reason: leaveForm.reason,
      status: 'pending',
    };

    const updatedRequests = [...leaveRequests, newLeave];
    setLeaveRequests(updatedRequests);
    localStorage.setItem('tms_leaveRequests', JSON.stringify(updatedRequests));

    setLeaveForm({ startDate: '', endDate: '', reason: '' });
    alert('Leave request submitted successfully!');
  };

  const handleSubstitutionAction = (id, action) => {
    const updatedRequests = substitutionRequests.map(req =>
      req.id === id ? { ...req, status: action } : req
    );
    setSubstitutionRequests(updatedRequests);
    localStorage.setItem('tms_substitutions', JSON.stringify(updatedRequests));
    alert(`Substitution request ${action}!`);
  };

  const myLeaveRequests = leaveRequests.filter(req => req.facultyName === user.name);

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-heading">Faculty Dashboard</h1>

        <div className="dashboard-container">
          <div className="dashboard-section">
            <h2>My Timetable</h2>
            <TimetableTable data={mockFacultyTimetable} showFaculty={false} />
          </div>

          <div className="dashboard-section">
            <h2>Apply for Leave</h2>
            <form className="leave-form" onSubmit={handleLeaveSubmit}>
              {formError && <div className="error-message" style={{ marginBottom: '15px' }}>{formError}</div>}

              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason</label>
                <textarea
                  id="reason"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Enter reason for leave"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Leave Request
              </button>
            </form>
          </div>

          <div className="dashboard-section">
            <h2>My Leave Requests</h2>
            {myLeaveRequests.length === 0 ? (
              <p style={{ color: '#666' }}>No leave requests yet.</p>
            ) : (
              <div className="leave-list">
                {myLeaveRequests.map((leave) => (
                  <div key={leave.id} className={`leave-item ${leave.status}`}>
                    <p><strong>Date:</strong> {leave.startDate} to {leave.endDate}</p>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`leave-status ${leave.status}`}>
                        {leave.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <h2>Substitution Requests</h2>
            {substitutionRequests.filter(req => req.status === 'pending').length === 0 ? (
              <p style={{ color: '#666' }}>No pending substitution requests.</p>
            ) : (
              <div className="substitution-requests">
                {substitutionRequests
                  .filter(req => req.status === 'pending')
                  .map((req) => (
                    <div key={req.id} className="substitution-item">
                      <p><strong>Requesting Faculty:</strong> {req.requestingFaculty}</p>
                      <p><strong>Subject:</strong> {req.subject}</p>
                      <p><strong>Date:</strong> {req.date}</p>
                      <p><strong>Day:</strong> {req.dayOfWeek}</p>
                      <p><strong>Time:</strong> {req.startTime} - {req.endTime}</p>
                      <p><strong>Venue:</strong> {req.venue}</p>
                      <p><strong>Class:</strong> Year {req.year}, Section {req.section}</p>
                      <div className="substitution-actions">
                        <button
                          className="btn btn-success"
                          onClick={() => handleSubstitutionAction(req.id, 'accepted')}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleSubstitutionAction(req.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;
