// import { useState, useEffect } from 'react';
// import { Button } from 'src/components/ui/button';
// import { Input } from 'src/components/ui/input';
// import { Slider } from "src/components/ui/slider"
// import { cn } from 'src/lib/utils';

// interface InputSlideProps {
//   label: string;
//   keyName: string;
//   type?: string;
//   onNext: (key: string, value: string) => void;
//   initialValue?: string;
// }

// const InputSlide = ({
//   label,
//   keyName,
//   type = 'text',
//   onNext,
//   initialValue = '',
// }: InputSlideProps) => {
//   const [inputValue, setInputValue] = useState(initialValue);
//   const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
//   const [sliderValue, setSliderValue] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerHeight < 500) {  // 화면 높이가 작아지면 키보드가 열린 것으로 간주
//         setIsKeyboardOpen(true);
//       } else {
//         setIsKeyboardOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setInputValue(initialValue);
//   }, [keyName, initialValue]);

//   const handleSubmit = () => {
//     onNext(keyName, inputValue);
//     setInputValue('');
//   };

//   const isSavingsGoal = label === "월 저축 목표:";  // "월 저축 목표"일 때 슬라이더 표시

//   const handleSliderChange = (value: number[]) => {
//     setSliderValue(value[0]);  // 슬라이더 값 변경 시 inputValue 업데이트
//     setInputValue(String(value[0]));  // 슬라이더 값에 맞게 inputValue 변경
//   };

//   const monthlySalary = Number(initialValue);
//   const savingsAmount = Math.floor((sliderValue / 100) * monthlySalary);

//   return (
//     <div className="w-full flex flex-col items-start justify-center px-4 mb-[49px]">
//       <label className="text-green-50 label-md mb-1">
//         {label}
//       </label>

//       {/* 월 저축 목표일 때만 슬라이더 표시 */}
//       {isSavingsGoal && (
//         <div className="relative w-full">
//           <p className='title-md text-green-70 mb-[65px]'>월 급여의 {sliderValue} %</p>

//           {/* 슬라이더 */}
//           <Slider
//             value={[sliderValue]}  // 슬라이더의 값을 sliderValue로 설정
//             onValueChange={handleSliderChange}  // 슬라이더 값 변경 시 처리
//             max={100}
//             step={2}
//             className="h-1.5 w-full"
//           />

//           {/* 슬라이더 원에 툴팁 표시 */}
//           <div
//             className="absolute top-0"
//             style={{
//               left: `${sliderValue}%`,  // 슬라이더 값에 따라 툴팁 위치 조정
//               transform: 'translateX(-50%)',  // 중앙 정렬
//             }}
//           >
//             {/* 툴팁 - 항상 보이도록 설정, 디자인 변경 */}
//             <div className="relative bg-gray-50 text-gray-0 title-xs px-[14px] py-[8px] rounded-md shadow-md z-10 top-[33px]">
//               월 {savingsAmount.toLocaleString()} 원
//               <div className="absolute left-1/2 bottom-[-6px] transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-t-gray-50 border-l-transparent border-r-transparent"></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 월 저축 목표가 아닐 경우 다른 컴포넌트가 표시될 수 있음 */}
//       {!isSavingsGoal && (
//         <Input
//           type={type}
//           value={inputValue}
//           placeholder="입력하세요"
//           onChange={(e) => setInputValue(e.target.value)}
//           className="w-full text-gray-80 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none 
//                    border-b border-b-2 border-green-50 pl-0 title-md pb-3"
//         />
//       )}

//       <Button
//         size={isKeyboardOpen ? "xlarge" : "large"}
//         onClick={handleSubmit}
//         className={cn('fixed left-1/2 -translate-x-1/2', isKeyboardOpen ? "bottom-0" : 'bottom-5 ')}
//       >
//         다음
//       </Button>
//       <p className='mt-[16px] label-sm text-gray-70'>안내텍스트</p>
//     </div>
//   );
// };

// export default InputSlide;

import { useState, useEffect } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Slider } from "src/components/ui/slider"
import { cn } from 'src/lib/utils';

interface InputSlideProps {
  label: string;
  keyName: string;
  type?: string;
  onNext: (key: string, value: string) => void;
  initialValue?: string;
}

const InputSlide = ({
  label,
  keyName,
  type = 'text',
  onNext,
  initialValue = '',
}: InputSlideProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) {  // 화면 높이가 작아지면 키보드가 열린 것으로 간주
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setInputValue(initialValue);
  }, [keyName, initialValue]);

  const handleSubmit = () => {
    onNext(keyName, inputValue);
    setInputValue('');
  };

  const isSavingsGoal = label === "월 저축 목표:";  // "월 저축 목표"일 때 슬라이더 표시

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);  // 슬라이더 값 변경 시 inputValue 업데이트
    setInputValue(String(value[0]));  // 슬라이더 값에 맞게 inputValue 변경
  };

  const monthlySalary = Number(initialValue);
  const savingsAmount = Math.floor((sliderValue / 100) * monthlySalary);

  // 툴팁 위치 계산 함수 - 백분율 기준
  const getTooltipPosition = () => {
    // 0%에서는 왼쪽 정렬, 100%에서는 오른쪽 정렬, 중간은 중앙 정렬
    if (sliderValue <= 10) {
      return '0%'; // 왼쪽 정렬
    } else if (sliderValue >= 90) {
      return '100%'; // 오른쪽 정렬
    } else {
      return `${sliderValue}%`; // 중앙 정렬
    }
  };

  // 툴팁 변환 계산 함수
  const getTooltipTransform = () => {
    if (sliderValue <= 10) {
      return 'translateX(0)'; // 왼쪽 정렬 시 변환 없음
    } else if (sliderValue >= 90) {
      return 'translateX(-100%)'; // 오른쪽 정렬 시 완전 왼쪽으로 변환
    } else {
      return 'translateX(-50%)'; // 중앙 정렬 시 중앙으로 변환
    }
  };

  // 화살표 위치 계산 함수
  const getArrowPosition = () => {
    if (sliderValue <= 10) {
      return '16%'; // 왼쪽에 가까울 때
    } else if (sliderValue >= 90) {
      return '90%'; // 오른쪽에 가까울 때
    } else {
      return '50%'; // 중앙
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center px-4 mb-[49px]">
      <label className="text-green-50 label-md mb-1">
        {label}
      </label>

      {/* 월 저축 목표일 때만 슬라이더 표시 */}
      {isSavingsGoal && (
        <div className="relative w-full">
          <p className='title-md text-green-70 mb-[65px]'>월 급여의 {sliderValue} %</p>

          {/* 슬라이더 */}
          <Slider
            value={[sliderValue]}  // 슬라이더의 값을 sliderValue로 설정
            onValueChange={handleSliderChange}  // 슬라이더 값 변경 시 처리
            max={100}
            step={2}
            className="h-1.5 w-full"
          />

          {/* 툴팁 - 새로운 포지셔닝 방식 */}
          <div
            className="absolute top-[33px]"
            style={{
              left: getTooltipPosition(),
              transform: getTooltipTransform(),
            }}
          >
            {/* 툴팁 내용 */}
            <div className="bg-gray-50 text-gray-0 title-xs px-[14px] py-[8px] rounded-md shadow-md z-10 whitespace-nowrap">
              월 {savingsAmount.toLocaleString()} 원

              {/* 화살표 - 별도 포지셔닝 */}
              <div
                className="absolute bottom-[-6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-t-gray-50 border-l-transparent border-r-transparent"
                style={{
                  left: getArrowPosition(),
                  transform: 'translateX(-50%)',
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* 월 저축 목표가 아닐 경우 다른 컴포넌트가 표시될 수 있음 */}
      {!isSavingsGoal && (
        <Input
          type={type}
          value={inputValue}
          placeholder="입력하세요"
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full text-gray-80 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none 
                   border-b border-b-2 border-green-50 pl-0 title-md pb-3"
        />
      )}

      <Button
        size={isKeyboardOpen ? "xlarge" : "large"}
        onClick={handleSubmit}
        className={cn('fixed left-1/2 -translate-x-1/2', isKeyboardOpen ? "bottom-0" : 'bottom-5 ')}
      >
        다음
      </Button>
      <p className='mt-[16px] label-sm text-gray-70'>안내텍스트</p>
    </div>
  );
};

export default InputSlide;