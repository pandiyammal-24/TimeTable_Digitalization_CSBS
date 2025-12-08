const TimetableTable = ({ data, showFaculty = true }) => {
  if (!data || data.length === 0) {
    return <p style={{ color: '#666' }}>No timetable data available.</p>;
  }

  // Define the order of days and time slots
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:15 AM - 12:15 PM',
    '12:15 PM - 1:15 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  // Create a map to organize data by day and time
  const timetableMap = {};
  
  // Initialize the map with empty arrays for each time slot and day
  timeSlots.forEach(time => {
    timetableMap[time] = {};
    daysOrder.forEach(day => {
      timetableMap[time][day] = [];
    });
  });

  // Populate the map with timetable data
  data.forEach(entry => {
    const timeSlot = `${entry.startTime} - ${entry.endTime}`;
    if (timetableMap[timeSlot] && timetableMap[timeSlot][entry.dayOfWeek]) {
      timetableMap[timeSlot][entry.dayOfWeek].push(entry);
    }
  });

  // Function to get the subject and faculty name in a compact format
  const getCellContent = (entries) => {
    if (!entries || entries.length === 0) return null;
    
    return entries.map((entry, index) => {
      // Extract subject code and name
      const subjectParts = entry.subject.split(' - ');
      const subjectCode = subjectParts[0];
      const subjectName = subjectParts[1] || '';

      return (
        <div key={index} className="timetable-cell">
          <div className="cell-header">
            <div className="subject">
              <div className="subject-code">{subjectCode}</div>
              {subjectName && (
                <div className="subject-name">{subjectName}</div>
              )}
            </div>
            {entry.facultyName && (
              <div className="faculty-name">{entry.facultyName}</div>
            )}
            {entry.isSubstitution && (
              <span className="substitution-badge">SUB</span>
            )}
          </div>
          <div className="cell-footer">
            <div className="venue">{entry.venue}</div>
            <div className="class-time">
              {entry.startTime} - {entry.endTime} | Y{entry.year} - {entry.section}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="table-container">
      <table className="timetable">
        <thead>
          <tr>
            <th>Time</th>
            {daysOrder.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td className="time-slot">{time}</td>
              {daysOrder.map((day, dayIndex) => (
                <td key={`${time}-${day}`} className="timetable-cell-container">
                  {timetableMap[time]?.[day]?.length > 0 ? (
                    getCellContent(timetableMap[time][day])
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableTable;