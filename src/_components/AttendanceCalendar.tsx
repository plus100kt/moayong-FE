// src/_components/AttendanceCalendar.tsx
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

  // 날짜 스타일 적용 함수
  const tileClassName = ({ date, view }: TileArgs): string | null => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const attendanceFormattedDates = attendanceDates.map(formatDate);

      if (attendanceFormattedDates.includes(formattedDate)) {
        return 'react-calendar__tile--attendance';
      }

      // 현재 주차인지 확인하여 스타일 적용
      const currentWeekStart = new Date(currentDate);
      currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); // 이번 주 시작 (일요일)
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // 이번 주 종료 (토요일)

      if (date >= currentWeekStart && date <= currentWeekEnd) {
        return 'react-calendar__tile--currentWeek';
      }
    }
    return null;
  };

  // 날짜 안에 표시할 내용
  /**
   * 달력의 날짜 안에 추가적인 내용을 렌더링하기 위해 사용
   */
  // const tileContent = ({ date, view }: TileArgs): React.ReactNode => {
  //   if (view === 'month') {
  //     const formattedDate = formatDate(date);
  //     const attendanceFormattedDates = attendanceDates.map(formatDate);

  //     if (attendanceFormattedDates.includes(formattedDate)) {
  //       return (
  //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center bg-green-500">
  //           {date.getDate()}
  //         </div>
  //       );
  //     } else if (date < new Date()) {
  //       // 출석하지 않은 과거 날짜에 회색 표시
  //       return (
  //         <></>
  //       );
  //     }
  //   }
  //   return null;
  // };

  // 날짜 선택 시 상태 업데이트
  const onChange = (newDate: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <Calendar
      onChange={onChange}
      value={currentDate}
      locale="ko-KR"
      tileClassName={tileClassName}
      // tileContent={tileContent}
      className={"border-none custom-calendar"}
      navigationLabel={({ date }) =>
        `${date.getFullYear()}년 ${date.getMonth() + 1}월`
      }
      next2Label={null}  // >> 버튼 제거
      prev2Label={null}  // << 버튼 제거
    // nextLabel={null}   // > 버튼 제거
    // prevLabel={null}   // < 버튼 제거
    />
  );
};

export default AttendanceCalendar;
