'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "src/_components/Button";
import backbar from 'src/assets/appbar.svg';
import equal from 'src/assets/icon-equal.svg';
import megaphone from 'src/assets/images/megaphone.png';
import laptop from 'src/assets/images/laptop.png';
import x from 'src/assets/icon-x.svg'

const VerifPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-5 h-screen">
      <div className='h-[50px] w-full flex items-center pl-[9px] bg-gray-0 mb-4'>
        <button onClick={() => router.push('/')} className='z-10'>
          <Image src={backbar} alt="" />
        </button>
        <p className='title-sm text-gray-80 text-center w-full ml-[-36px]'>저축인증</p>
      </div>
      <div className="px-5">
        <div className="bg-gray-10 rounded-[14px] h-[52px] flex justify-center items-center mx-auto gap-[10px] mb-[30px]">
          <Image src={megaphone} alt="" />
          <p className="caption-md">[리그 공지] 리그 종료까지 2시간 10분 남았어요!</p>
        </div>

        <p className="title-md mb-6">김모아님의 저축현황</p>

        <div className="h-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0),0px_4px_4px_0px_rgba(0,0,0,0)] bg-white rounded-[16px] flex items-center justify-center gap-[27px]">
          <div className="flex flex-col justify-center items-center gap-[11px]">
            <p className="label-md text-gray-80">누적 저축금액</p>
            <p className="title-xs text-purple-30">2,500,00원</p>
          </div>
          <Image src={equal} alt="=" />
          <div className="flex flex-col justify-center items-center h-full gap-[2px]">
            <p className="label-md text-gray-80 h-[41%] flex flex-col justify-end">아이맥 최신형</p>
            <Image src={laptop} alt="상품 이미지" className="h-[59%] object-contain object-top" />
          </div>
        </div>

        <div>
          <div>
            <p>이번 주 저축률</p>
            <p>목표금액:<span>200,000</span>원</p>
          </div>
          <div>
            그래프
          </div>
        </div>

        <Button.Icon disabled>저축 인증하기</Button.Icon>

        <div>
          <div>
            <Image src="" alt="" />
            <div>원 두개</div>
          </div>
          <div>
            <p>저축내역</p>
            <p>2025.1.1 ~ 2025.1.7</p>
            <p>목표금액:<span>100,000</span>원</p>
            <p>저축금액:<span>100,000</span>원</p>
            <p>누적금액:<span>100,000</span>원</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifPage;