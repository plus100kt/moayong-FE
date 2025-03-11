'use client';

import AttendanceCalendar from "src/_components/AttendanceCalendar";
import React, { useCallback, useState } from "react";
import Button from "src/_components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import backbar from 'src/assets/appbar.svg'
import megaphone from 'src/assets/images/icon-megaphone.png'
import fire from 'src/assets/images/icon-fire.png'
import calendar from 'src/assets/images/icon-calendar.png'

const AttendancePage = () => {
  const router = useRouter();
  const [attendanceDates, setAttendanceDates] = useState<Date[]>([
    new Date(2025, 4, 5),
    new Date(2025, 4, 7),
    new Date(2025, 4, 8),
  ]);
  const [date, setDate] = useState<Date>(new Date());

  const handleAttendanceCheck = useCallback(() => {
    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // 이미 출석한 날짜인지 확인
    const alreadyAttended = attendanceDates.some(
      (attendedDate) =>
        attendedDate.getFullYear() === formattedToday.getFullYear() &&
        attendedDate.getMonth() === formattedToday.getMonth() &&
        attendedDate.getDate() === formattedToday.getDate()
    );

    if (!alreadyAttended) {
      setAttendanceDates((prevDates) => [...prevDates, formattedToday]);
    }
  }, [attendanceDates]);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className='h-[50px] w-full flex items-center pl-[9px]'>
        <button
          onClick={() => router.push('/')}
          className='z-10'>
          <Image src={backbar} alt="" />
        </button>
        <p className='title-sm text-gray-80 text-center w-full ml-[-36px]'>출석체크</p>
      </div>
      {/* Header */}
      <div className="w-full p-4">
        <div className="caption-md py-[18px] px-[14px] bg-gray-10 rounded-[14px] text-gray-90 flex items-center gap-[10px]">
          <Image src={megaphone} alt="" />
          [리그 공지] 리그 종료까지 2시간 10분 남았어요!
        </div>
      </div>

      {/* Attendance Info */}
      <div className="flex w-full justify-center gap-[12px]">
        <div className="flex flex-col items-start justify-end pl-[16px] pb-[25px] w-[154px] h-[100px] bg-gray-5 rounded-[16px]">
          <div className="flex gap-[10px] items-center">
            <Image src={calendar} alt="" />
            <div className="flex flex-col items-start">
              <div className="text-gray-60 caption-md">연속 출석일</div>
              <div className="text-gray-70 title-lg">18일</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-end pl-[16px] pb-[25px] w-[154px] h-[100px] bg-gray-5 rounded-[16px]">
          <div className="flex gap-[10px] items-center">
            <Image src={fire} alt="" />
            <div className="flex flex-col items-start">
              <div className="text-gray-60 caption-md">최대 연속 출석일</div>
              <div className="text-danger title-lg">53일</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mx-auto flex items-center">
        <AttendanceCalendar
          attendanceDates={attendanceDates}
          currentDate={date}
          setDate={setDate}
        />
      </div>

      {/* Button */}
      <Button.Default
        size={"large"}
        onClick={handleAttendanceCheck}
        className="fixed bottom-[20px]"
      >
        출석 체크 도장 찍기 +5p
      </Button.Default>
    </div>
  );
};

export default AttendancePage;
