// import { useState, useEffect } from 'react';
// import { Button } from 'src/components/ui/button';
// import { Input } from 'src/components/ui/input';
// import { Slider } from "src/components/ui/slider";
// import { cn } from 'src/lib/utils';

// interface InputSlideProps {
//   label: string;
//   keyName: string;
//   type?: string;
//   onNext: (key: string, value: string) => void;
//   initialValue?: string;
//   salary?: string | number;
// }

// const InputSlide = ({
//   label,
//   keyName,
//   type = 'text',
//   onNext,
//   initialValue = '',
//   salary
// }: InputSlideProps) => {
//   const [inputValue, setInputValue] = useState(initialValue);
//   const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
//   const [sliderValue, setSliderValue] = useState(0);
//   // 월급을 상수로 먼저 정의
//   const monthlySalary = Number(salary);

//   // useEffect를 통해 initialValue가 변경될 때마다 슬라이더와 inputValue를 업데이트
//   useEffect(() => {
//     if (initialValue) {
//       const sliderMatch = initialValue.match(/(\d+)%/); // 텍스트 내에서 퍼센트를 추출
//       if (sliderMatch) {
//         setSliderValue(Number(sliderMatch[1]));
//       }
//       setInputValue(initialValue);
//       console.log(initialValue, sliderMatch)
//     }
//   }, [initialValue]);

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

//   const handleSubmit = () => {
//     onNext(keyName, inputValue);
//     setInputValue('');
//   };

//   const isSavingsGoal = label === "월 저축 목표:";  // "월 저축 목표"일 때 슬라이더 표시

//   // 계산된 저축액
//   const savingsAmount = Math.floor((sliderValue / 100) * monthlySalary);

//   const handleSliderChange = (value: number[]) => {
//     const newSliderValue = value[0];
//     // 새 값으로 직접 계산
//     const newSavingsAmount = Math.floor((newSliderValue / 100) * monthlySalary);

//     // 상태 업데이트
//     setSliderValue(newSliderValue);

//     // 새로 계산된 값으로 텍스트 구성
//     const txt = `월 급여의 ${newSliderValue}% ・ ${newSavingsAmount.toLocaleString()} 원`;
//     setInputValue(txt);
//   };

//   // 툴팁 위치 계산 함수 - 백분율 기준
//   const getTooltipPosition = () => {
//     // 0%에서는 왼쪽 정렬, 100%에서는 오른쪽 정렬, 중간은 중앙 정렬
//     if (sliderValue <= 10) {
//       return '0%'; // 왼쪽 정렬
//     } else if (sliderValue >= 90) {
//       return '100%'; // 오른쪽 정렬
//     } else {
//       return `${sliderValue}%`; // 중앙 정렬
//     }
//   };

//   // 툴팁 변환 계산 함수
//   const getTooltipTransform = () => {
//     if (sliderValue <= 10) {
//       return 'translateX(0)'; // 왼쪽 정렬 시 변환 없음
//     } else if (sliderValue >= 90) {
//       return 'translateX(-100%)'; // 오른쪽 정렬 시 완전 왼쪽으로 변환
//     } else {
//       return 'translateX(-50%)'; // 중앙 정렬 시 중앙으로 변환
//     }
//   };

//   // 화살표 위치 계산 함수
//   const getArrowPosition = () => {
//     if (sliderValue <= 10) {
//       return '16%'; // 왼쪽에 가까울 때
//     } else if (sliderValue >= 90) {
//       return '90%'; // 오른쪽에 가까울 때
//     } else {
//       return '50%'; // 중앙
//     }
//   };

//   // 슬라이더의 초기값이 0일 때 툴팁에 저축액 0원이 표시되도록
//   const displayedSavingsAmount = savingsAmount > 0 ? savingsAmount : 0;

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
//             step={1}
//             className="h-1.5 w-full"
//           />

//           {/* 툴팁 - 새로운 포지셔닝 방식 */}
//           <div
//             className="absolute top-[33px]"
//             style={{
//               left: getTooltipPosition(),
//               transform: getTooltipTransform(),
//             }}
//           >
//             {/* 툴팁 내용 */}
//             <div className="bg-gray-50 text-gray-0 title-xs px-[14px] py-[8px] rounded-md shadow-md z-10 whitespace-nowrap">
//               월 {displayedSavingsAmount.toLocaleString()} 원

//               {/* 화살표 - 별도 포지셔닝 */}
//               <div
//                 className="absolute bottom-[-6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-t-gray-50 border-l-transparent border-r-transparent"
//                 style={{
//                   left: getArrowPosition(),
//                   transform: 'translateX(-50%)',
//                 }}
//               ></div>
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


import { useState, useEffect, useRef } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Slider } from "src/components/ui/slider";
import { cn } from 'src/lib/utils';

interface InputSlideProps {
  label: string;
  keyName: string;
  type?: string;
  onNext: (key: string, value: string) => void;
  initialValue?: string;
  salary?: string | number;
}

const InputSlide = ({
  label,
  keyName,
  type = 'text',
  onNext,
  initialValue = '',
  salary
}: InputSlideProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // 월급을 상수로 먼저 정의
  const monthlySalary = Number(salary);

  // useEffect를 통해 initialValue가 변경될 때마다 슬라이더와 inputValue를 업데이트
  useEffect(() => {
    if (initialValue) {
      const sliderMatch = initialValue.match(/(\d+)%/); // 텍스트 내에서 퍼센트를 추출
      if (sliderMatch) {
        setSliderValue(Number(sliderMatch[1]));
      }
      setInputValue(initialValue);
      console.log(initialValue, sliderMatch)
    }
  }, [initialValue]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const newKeyboardHeight = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(newKeyboardHeight > 0 ? newKeyboardHeight : 0);
        setIsKeyboardOpen(newKeyboardHeight > 0);

        if (buttonRef.current) {
          buttonRef.current.style.bottom = `${newKeyboardHeight}px`;
        }
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('scroll', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  const handleSubmit = () => {
    onNext(keyName, inputValue);
    setInputValue('');
  };

  const isSavingsGoal = label === "월 저축 목표:";  // "월 저축 목표"일 때 슬라이더 표시

  // 계산된 저축액
  const savingsAmount = Math.floor((sliderValue / 100) * monthlySalary);

  const handleSliderChange = (value: number[]) => {
    const newSliderValue = value[0];
    // 새 값으로 직접 계산
    const newSavingsAmount = Math.floor((newSliderValue / 100) * monthlySalary);

    // 상태 업데이트
    setSliderValue(newSliderValue);

    // 새로 계산된 값으로 텍스트 구성
    const txt = `월 급여의 ${newSliderValue}% ・ ${newSavingsAmount.toLocaleString()} 원`;
    setInputValue(txt);
  };

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

  // 슬라이더의 초기값이 0일 때 툴팁에 저축액 0원이 표시되도록
  const displayedSavingsAmount = savingsAmount > 0 ? savingsAmount : 0;

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
            step={1}
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
              월 {displayedSavingsAmount.toLocaleString()} 원

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
        ref={buttonRef}
        size={isKeyboardOpen ? "xlarge" : "large"}
        onClick={handleSubmit}
        className={cn('fixed left-1/2 -translate-x-1/2 transition-all duration-300',
          isKeyboardOpen ? "bottom-0" : 'bottom-5')}
        style={{
          bottom: isKeyboardOpen ? `${keyboardHeight}px` : undefined,
        }}
      >
        다음
      </Button>
      <p className='mt-[16px] label-sm text-gray-70'>안내텍스트</p>
    </div>
  );
};

export default InputSlide;
