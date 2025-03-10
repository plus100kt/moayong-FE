'use client';

import AttendanceCalendar from "src/_components/AttendanceCalendar";
import React from "react";
import Button from "src/_components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import backbar from 'src/assets/appbar.svg'
import megaphone from 'src/assets/images/icon-megaphone.png'

const AttendancePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-white">
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
      <div className="flex justify-around w-full p-4">
        <div className="flex flex-col items-center">
          <div className="text-gray-500">연속 출석일</div>
          <div className="text-2xl font-bold">18일</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-gray-500">최대 연속 출석일</div>
          <div className="text-2xl font-bold">53일</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="w-full p-4">
        <AttendanceCalendar />
      </div>

      {/* Button */}
      <Button.Default size={"large"}>
        출석 체크 도장 찍기 +5p
      </Button.Default>
    </div>
  );
};

export default AttendancePage;
