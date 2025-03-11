'use client';

import Calendar, { TileArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dispatch, SetStateAction } from 'react';
import { Value } from 'react-calendar/dist/esm/shared/types.js';

interface AttendanceCalendarProps {
  attendanceDates: Date[];
  currentDate: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const AttendanceCalendar = ({ attendanceDates, currentDate, setDate }: AttendanceCalendarProps) => {
  // 날짜 포맷팅 함수 (yyyy-mm-dd)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
    setUTCHours(0, 0, 0, 0)을 사용하여 시간까지 00:00:00.000으로 맞춤.
    → date >= currentWeekStart && date <= currentWeekEnd 비교 시 불일치 문제 해결

    currentWeekStart와 currentWeekEnd를 setHours(0, 0, 0, 0)로 보정
    → new Date()는 기본적으로 시간까지 포함하므로, 이를 맞춰야 정확한 비교가 가능
   */
  // const tileClassName = ({ date, view }: TileArgs): string | null => {
  //   if (view === 'month') {
  //     const formattedDate = formatDate(date);
  //     const attendanceFormattedDates = attendanceDates.map(formatDate);

  //     if (attendanceFormattedDates.includes(formattedDate)) {
  //       return 'react-calendar__tile--attendance';
  //     }

  //     // // 주말(일요일, 토요일)에 대한 스타일
  //     // if (date.getDay() === 0) {
  //     //   return 'react-calendar__tile--sunday'; // 일요일 스타일
  //     // } else if (date.getDay() === 6) {
  //     //   return 'react-calendar__tile--saturday'; // 토요일 스타일
  //     // }

  //     // 현재 주차인지 확인하여 스타일 적용
  //     const currentWeekStart = new Date(currentDate);
  //     currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1); // 이번 주 시작 (월요일, -1은 일요일)
  //     currentWeekStart.setHours(0, 0, 0, 0); // 시간을 00:00:00.000으로 초기화

  //     const currentWeekEnd = new Date(currentWeekStart);
  //     currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // 이번 주 종료 (토요일)
  //     currentWeekEnd.setHours(23, 59, 59, 999); // 시간을 23:59:59.999으로 설정

  //     if (date >= currentWeekStart && date <= currentWeekEnd) {
  //       // 첫 번째 날짜 (월요일)에만 왼쪽 border-radius 적용
  //       if (date.getDate() === currentWeekStart.getDate()) {
  //         return 'react-calendar__tile--currentWeek-left'; // 왼쪽 border-radius
  //       }

  //       // 마지막 날짜 (토요일)에만 오른쪽 border-radius 적용
  //       if (date.getDate() === currentWeekEnd.getDate()) {
  //         return 'react-calendar__tile--currentWeek-right'; // 오른쪽 border-radius
  //       }

  //       return 'react-calendar__tile--currentWeek';
  //     }
  //   }
  //   return null;
  // };
  const tileClassName = ({ date, view }: TileArgs): string | null => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const attendanceFormattedDates = attendanceDates.map(formatDate);

      // Initialize classes array
      const classes: string[] = [];

      // Check if date has attendance
      if (attendanceFormattedDates.includes(formattedDate)) {
        classes.push('react-calendar__tile--attendance');
      }

      // Current week check
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

      // Return all applicable classes
      return classes.length > 0 ? classes.join(' ') : null;
    }
    return null;
  };


  // 날짜 안에 숫자만 표시
  // const tileContent = ({ date, view }: TileArgs): React.ReactNode => {
  //   if (view === 'month') {
  //     return <span className="text-sm">{date.getDate()}</span>;
  //   }
  //   return null;
  // };

  const tileContent = ({ date, view }: TileArgs): React.ReactNode => {
    if (view === 'month') {
      return <span className="custom-date">{date.getDate()}</span>;
    }
    return null;
  };


  // 날짜 선택 시 상태 업데이트
  const onChange = (newDate: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <Calendar
      // onChange={onChange}
      value={currentDate}
      locale="ko-KR"
      // calendarType="gregory" // 일요일로 달력 변환시 사용
      tileClassName={tileClassName}
      tileContent={tileContent}
      className="border-none custom-calendar"
      navigationLabel={({ date }) =>
        `${date.getFullYear()}년 ${date.getMonth() + 1}월`
      }
      next2Label={null} // >> 버튼 제거
      prev2Label={null} // << 버튼 제거
    />
  );
};

export default AttendanceCalendar;
