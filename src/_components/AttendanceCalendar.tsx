'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const AttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());
  const attendanceDates = [
    new Date(2025, 4, 5),
    new Date(2025, 4, 7),
    new Date(2025, 4, 8),
  ]; // 출석한 날짜 데이터 (yyyy, mm(0부터 시작), dd)
  const currentWeekStart = new Date(2025, 4, 5); // 현재 주차 시작 날짜
  const currentWeekEnd = new Date(2025, 4, 11); // 현재 주차 종료 날짜

  // 날짜 포맷팅 함수 (yyyy-mm-dd)
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({ date, view }: any) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const attendanceFormattedDates = attendanceDates.map(formatDate);

      if (attendanceFormattedDates.includes(formattedDate)) {
        return 'react-calendar__tile--attendance';
      }

      if (date >= currentWeekStart && date <= currentWeekEnd) {
        return 'react-calendar__tile--currentWeek';
      }
    }
  };

  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const attendanceFormattedDates = attendanceDates.map(formatDate);

      if (attendanceFormattedDates.includes(formattedDate)) {
        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {date.getDate()}
          </div>
        );
      }
    }
  };

  return (
    <Calendar
      // onChange={setDate}
      value={date}
      locale="ko-KR"
      tileClassName={tileClassName}
      tileContent={tileContent}
    />
  );
};

export default AttendanceCalendar;
