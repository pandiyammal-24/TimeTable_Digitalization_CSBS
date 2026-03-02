const TimetableTable = ({ data, viewType = "student" }) => {
  if (!data || data.length === 0) {
    return <p style={{ color: '#666' }}>No timetable data available.</p>;
  }

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timeSlots = [
    '9.00-9.50',
    '9.50-10.40',
    '11.00-11.50',
    '11.50-12.40',
    '1.40-2.30',
    '2.30-3.20',
    '3.20-4.10'
  ];

  const timetableMap = {};

  timeSlots.forEach(time => {
    timetableMap[time] = {};
    daysOrder.forEach(day => {
      timetableMap[time][day] = [];
    });
  });

  data.forEach(entry => {
    const timeSlot = entry.time;
    const day = entry.day;

    if (!timetableMap[timeSlot]) {
      timetableMap[timeSlot] = {};
      daysOrder.forEach(d => timetableMap[timeSlot][d] = []);
    }

    if (timetableMap[timeSlot][day]) {
      timetableMap[timeSlot][day].push(entry);
    }
  });

  /* ========= CELL RENDER ========= */

  const getCellContent = (entries) => {
    if (!entries || entries.length === 0) return null;

    return (
      <div className={`cell-split cell-${entries.length}`}>
        {entries.map((entry, index) => (
          <div key={index} className="cell-part">

            {/* STUDENT VIEW */}
            {viewType === "student" && (
              <>
                <div className="subject-code">{entry.sub_code}</div>
                <div className="faculty-name">{entry.faculty}</div>
                <div className="venue">{entry.venue}</div>
              </>
            )}

            {/* FACULTY VIEW */}
            {viewType === "faculty" && (
              <>
                <div className="year-section">
                  Year {entry.year} - Sec {entry.section}
                </div>
                <div className="subject-code">{entry.sub_code}</div>
                <div className="venue">{entry.venue}</div>
              </>
            )}

          </div>
        ))}
      </div>
    );
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
                  {timetableMap[time]?.[day]?.length > 0
                    ? getCellContent(timetableMap[time][day])
                    : null}
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