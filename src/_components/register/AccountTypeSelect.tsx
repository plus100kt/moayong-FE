// import { useState, useEffect } from 'react';
// import { Button } from 'src/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
// import { DialogTitle } from 'src/components/ui/dialog';
// import { cn } from "src/lib/utils";
// import select from 'src/assets/icon-select.svg';
// import Image from 'next/image';

// interface AccountTypeSelectProps {
//   onSelect: (bankName: string) => void;
//   initialBankName: string;
// }

// const AccountTypeSelect = ({ onSelect, initialBankName }: AccountTypeSelectProps) => {
//   const [savingType, setSavingType] = useState(initialBankName || '');
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (initialBankName) setSavingType(initialBankName);
//   }, [initialBankName]);

//   const handleUpdate = () => {
//     console.log('선택 완료:', savingType);
//     onSelect(savingType);
//     setOpen(false);
//   };

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <label className="mx-[20px] text-green-50 label-md mb-1">
//         저축 통장
//       </label>
//       <SheetTrigger asChild>
//         <div>
//           <input
//             type='button'
//             value={'은행을 선택해주세요.'}
//             className={cn(
//               "mb-[32px] mx-[20px] flex h-9 w-full rounded-md border border-input bg-transparent py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//               "text-gray-80 text-gray-50 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none border-b border-b-2 border-green-50 pl-0 title-md pb-3"
//             )}
//           />
//           <Image src={select} alt="" />
//         </div>
//       </SheetTrigger>
//       <SheetContent side="bottom" className="sm:max-w-full">
//         <div className="flex flex-col h-full justify-between">
//           <div className="px-6 py-4">
//             <DialogTitle className="text-lg font-semibold">저축 통장 선택</DialogTitle>
//             <p className="text-sm text-gray-500">저축 통장을 선택해주세요.</p>
//           </div>
//           <div className="px-6 py-4 space-y-4">
//             <div className="grid gap-2">
//               <label htmlFor="saving-type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 통장 종류
//               </label>
//               <Select onValueChange={setSavingType} defaultValue={savingType}>
//                 <SelectTrigger className="data-[placeholder=true]:text-muted-foreground">
//                   <SelectValue placeholder="선택하세요" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="정기 예금">정기 예금</SelectItem>
//                   <SelectItem value="자유 적금">자유 적금</SelectItem>
//                   <SelectItem value="체크 통장">체크 통장</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="flex items-center justify-center p-6">
//             <Button onClick={handleUpdate}>선택 완료</Button>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet >
//   );
// };

// export default AccountTypeSelect;
import { useState, useEffect } from 'react';
import { Button } from 'src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { DialogTitle } from 'src/components/ui/dialog';
import { cn } from "src/lib/utils";
import select from 'src/assets/icon-select.svg';
import Image from 'next/image';

interface AccountTypeSelectProps {
  onSelect: (bankName: string) => void;
  initialBankName: string;
}

const banks = [
  { name: "KB국민은행", logo: "#" },
  { name: "신한은행", logo: "#" },
  { name: "우리은행", logo: "#" },
  { name: "KEB하나은행", logo: "#" },
  { name: "카카오뱅크", logo: "#" },
  { name: "케이뱅크", logo: "#" },
  { name: "토스", logo: "#" }
];

const AccountTypeSelect = ({ onSelect, initialBankName }: AccountTypeSelectProps) => {
  const [savingType, setSavingType] = useState(initialBankName || '');
  const [open, setOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
    if (initialBankName) setSavingType(initialBankName);
  }, [initialBankName]);

  const handleUpdate = () => {
    console.log('선택 완료:', savingType);
    onSelect(savingType);
    setOpen(false);
  };

  const handleSelect = (bankName: string) => {
    setSavingType(bankName);
    onSelect(bankName);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <label className="mx-[20px] text-green-50 label-md mb-2">
        저축 통장
      </label>
      <SheetTrigger asChild>
        <div className="relative w-full px-[20px]">
          <input
            type="button"
            value={'은행을 선택해주세요.'}
            className={cn(
              "mb-[32px] flex h-9 w-full rounded-md border border-input bg-transparent pb-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-gray-80 text-gray-50 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none border-b border-b-2 border-green-50 pl-0 title-md pb-3",
              "text-left" // 텍스트를 왼쪽으로 정렬
            )}
          />
          <Image
            src={select}
            alt="Select arrow"
            className={cn(
              "absolute right-5 top-1/4 transform -translate-y-1/2 transition-transform", // 화살표 위치와 애니메이션
              open ? "rotate-180" : "" // 열림 상태에서 화살표 회전
            )}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="sm:max-w-full border-t border-[#EDEFF1] h-[489px] bg-white p-6 rounded-t-xl">
        <div className="h-1 w-[60px] bg-[#EDEFF1] mx-auto rounded-full mb-[20px]"></div>
        <div className="flex flex-col h-full justify-between">
          <div className="sr-only">
            <DialogTitle className="text-lg font-semibold">저축 통장 선택</DialogTitle>
            <p className="text-sm text-gray-500">저축 통장을 선택해주세요.</p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="saving-type" className="sr-only">
                통장 종류
              </label>

              <div className="space-y-[12px] overflow-y-auto h-[100%]">
                {banks.map((bank) => (
                  <div
                    key={bank.name}
                    className="flex items-center cursor-pointer hover:bg-gray-5 active:bg-gray-10 rounded-[16px] py-[10px] pl-[16px]"
                    onClick={() => handleSelect(bank.name)}
                  >
                    <div className="w-[32px] h-[32px] bg-gray-300 flex items-center justify-center rounded-full">
                      {/* 은행 로고 자리 */}
                      <span className="text-sm">🏦</span>
                    </div>
                    <span className="ml-4 text-gray-50 body-md">{bank.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
      <Button
        size={isKeyboardOpen ? "xlarge" : "large"}
        onClick={handleUpdate}
        className={cn('fixed left-1/2 -translate-x-1/2', isKeyboardOpen ? "bottom-0" : 'bottom-5 ')}
      >
        다음
      </Button>
    </Sheet >
  );
};

export default AccountTypeSelect;
