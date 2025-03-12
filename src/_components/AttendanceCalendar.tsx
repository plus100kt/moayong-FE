'use client';

import Calendar, { TileArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dispatch, SetStateAction, useState } from 'react';
import './AttendanceCalendar.css';
import { Value } from 'react-calendar/dist/esm/shared/types.js';

interface AttendanceCalendarProps {
  attendanceDates: Date[];
  currentDate: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const AttendanceCalendar = ({ attendanceDates, currentDate, setDate }: AttendanceCalendarProps) => {
  const [view, setView] = useState<'month' | 'year' | 'decade' | 'century'>('month');

  // 날짜 포맷팅 함수 (yyyy-mm-dd)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 오늘 날짜 (시간 제외)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tileClassName = ({ date, view }: TileArgs): string | null => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const attendanceFormattedDates = attendanceDates.map(formatDate);

      // Initialize classes array - 순서가 중요합니다! (나중에 선언된 클래스가 우선적용)
      const classes: string[] = [];

      // 현재 월의 날짜인지 확인 (이전/다음 달의 날짜는 제외)
      const currentMonth = currentDate.getMonth();
      const isCurrentMonth = date.getMonth() === currentMonth;

      // 1. 현재 주차 체크 (항상 배경 유지)
      const currentWeekStart = new Date(currentDate);
      currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Week starts on Monday
      currentWeekStart.setHours(0, 0, 0, 0);

      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Week ends on Sunday
      currentWeekEnd.setHours(23, 59, 59, 999);

      // Date is within current week
      if (date >= currentWeekStart && date <= currentWeekEnd) {
        // First day of week (Monday)
        if (date.getDate() === currentWeekStart.getDate()) {
          classes.push('react-calendar__tile--currentWeek-left');
        }
        // Last day of week (Sunday)
        else if (date.getDate() === currentWeekEnd.getDate()) {
          classes.push('react-calendar__tile--currentWeek-right');
        }
        // Middle days of week
        else {
          classes.push('react-calendar__tile--currentWeek');
        }
      }

      // 2. 오늘 날짜 확인
      if (formatDate(date) === formatDate(today)) {
        classes.push('react-calendar__tile--today');
      }

      // 3. 출석 체크 안한 날짜 (현재 월에 해당하는 날짜만, 오늘 이전 날짜만)
      if (isCurrentMonth && date < today && !attendanceFormattedDates.includes(formattedDate)) {
        classes.push('react-calendar__tile--no-attendance');
      }

      // 4. 출석 체크한 날짜 (최우선 적용)
      if (attendanceFormattedDates.includes(formattedDate)) {
        classes.push('react-calendar__tile--attendance');
      }

      // Return all applicable classes
      return classes.length > 0 ? classes.join(' ') : null;
    }
    return null;
  };

  const tileContent = ({ date, view }: TileArgs): React.ReactNode => {
    if (view === 'month') {
      return <span className="custom-date">{date.getDate()}</span>;
    }
    return null;
  };

  return (
    <Calendar
      value={currentDate}
      locale="ko-KR"
      tileClassName={tileClassName}
      tileContent={tileContent}
      className={`border-none custom-calendar ${view === 'year' || view === 'decade' ? 'show-dates' : ''}`}
      navigationLabel={({ date }) =>
        `${date.getFullYear()}년 ${date.getMonth() + 1}월`
      }
      onViewChange={({ view }) => setView(view)}
      // onClickDay={(value) => setDate(value as Date)}
      next2Label={null} // >> 버튼 제거
      prev2Label={null} // << 버튼 제거
    />
  );
};

export default AttendanceCalendar;