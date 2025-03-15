// 'use client';

// import { useState } from 'react';
// import { Button } from 'src/components/ui/button';
// import { Input } from 'src/components/ui/input';
// import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
// import Image from 'next/image';
// import { useAtom } from 'jotai';
// import {
//   selectedImageAtom,
//   accountNumberAtom,
//   ocrResultAtom,
// } from 'src/_store/passbookAtoms';

// const ScreenPage = () => {
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState({
//     transactionDate: '',
//     transactionAmount: '',
//     senderName: '',
//   });

//   const [selectedImage] = useAtom(selectedImageAtom);
//   const [accountNumber, setAccountNumber] = useAtom(accountNumberAtom);
//   const [ocrResult, setOcrResult] = useAtom(ocrResultAtom);

//   const handleEditAccountInfo = () => {
//     if (!ocrResult) return;
//     setEditData({
//       transactionDate: ocrResult.transactionDate.toString(),
//       transactionAmount: ocrResult.transactionAmount.toString(),
//       senderName: ocrResult.senderName,
//     });
//     setOpen(true);
//   };

//   const handleChange = (field: keyof typeof editData, value: string) => {
//     setEditData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleUpdateAccount = () => {
//     setOcrResult((prev) => {
//       if (!prev) return prev;
//       return {
//         ...prev,
//         transactionDate: editData.transactionDate || '',
//         transactionAmount: editData.transactionAmount || '',
//         senderName: editData.senderName || '',
//       };
//     });
//     setOpen(false);
//   };

//   return (
//     <div>
//       <div className="w-full">
//         <h2 className="text-xl font-bold mb-6 text-center">입력 내용 확인</h2>

//         {selectedImage && (
//           <div className="flex justify-center relative">
//             <Image
//               src={selectedImage}
//               alt="Uploaded Passbook"
//               width={320}
//               height={240}
//               className="rounded-[16px] w-[320px] h-[280px] object-cover mb-[24px] shadow-lg"
//               style={{
//                 objectPosition: '50% 15%',
//                 boxShadow: '0 0px 1px #CDD1D5, 0 4px 2px #CDD1D5',
//               }}
//             />
//             {ocrResult?.highlightBoxes?.map((box, index) => (
//               <div
//                 key={index}
//                 style={{
//                   position: 'absolute',
//                   top: box.y,
//                   left: box.x,
//                   width: box.width,
//                   height: box.height,
//                   border: '2px solid red',
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         <div className="w-[320px] h-auto bg-gray-5 rounded-[16px] p-[20px] mx-auto">
//           <div className="title-sm text-gray-90 mb-[16px]">인증 내역</div>

//           <div className="border-t-[1px] border-b-[1px] border-gray-10 my-[16px]" />

//           {ocrResult?.accountNumber && (
//             <div className="flex justify-left mb-[8px] gap-[4px]">
//               <span className="text-gray-80 title-xs">계좌 번호</span>
//               <span className="body-md text-gray-80">{ocrResult.accountNumber}</span>
//             </div>
//           )}

//           {ocrResult?.transactionDate && (
//             <div className="flex justify-left mb-[8px] gap-[4px]">
//               <span className="text-gray-80 title-xs">거래 일시</span>
//               <span className="body-md text-gray-80">{ocrResult.transactionDate}</span>
//             </div>
//           )}

//           {ocrResult?.transactionAmount && (
//             <div className="flex justify-left mb-[8px] gap-[4px]">
//               <span className="text-gray-80 title-xs">거래 금액</span>
//               <span className="body-md text-gray-80">
//                 {Number(ocrResult.transactionAmount).toLocaleString()} 원
//               </span>
//             </div>
//           )}

//           {ocrResult?.senderName && (
//             <div className="flex justify-left mb-[8px] gap-[4px]">
//               <span className="text-gray-80 title-xs">보낸 사람</span>
//               <span className="body-md text-gray-80">{ocrResult.senderName}</span>
//             </div>
//           )}
//         </div>

//         <div className="fixed bottom-[20px] left-0 right-0">
//           <div className="flex flex-col justify-center items-center">
//             <p className="title-xs text-gray-80">김모아님 인증 내역이 맞는지</p>
//             <p className="title-xs text-gray-80">다시 한번 확인해주세요.</p>
//           </div>

//           <div className="flex justify-center gap-[4px] mt-[24px]">
//             <Sheet open={open} onOpenChange={setOpen}>
//               <SheetTrigger asChild>
//                 <Button size="small" variant="secondary" onClick={handleEditAccountInfo}>
//                   수정하기
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="bottom"
//                 className="sm:max-w-full border-t border-[#EDEFF1] h-[466px] bg-white p-[20px] rounded-t-xl"
//               >
//                 <div className="h-1 w-[60px] bg-[#EDEFF1] mx-auto rounded-full mb-[20px]"></div>
//                 <div className="flex flex-col h-full justify-between">
//                   <div className="mt-[15px]">
//                     <h3 className="text-gray-80 title-sm mb-[24px]">수정하기</h3>
//                     <div>
//                       <div className="mt-[24px]">
//                         <span className="label-md text-gray-70">거래일시</span>
//                         <Input
//                           type="text"
//                           value={editData.transactionDate}
//                           onChange={(e) => handleChange('transactionDate', e.target.value)}
//                           className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
//                         />
//                       </div>

//                       <div className="mt-[24px]">
//                         <span className="label-md text-gray-70">거래금액</span>
//                         <Input
//                           type="number"
//                           value={editData.transactionAmount}
//                           onChange={(e) => handleChange('transactionAmount', e.target.value)}
//                           className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
//                         />
//                       </div>

//                       <div className="mt-[24px]">
//                         <span className="label-md text-gray-70">보낸사람</span>
//                         <Input
//                           type="text"
//                           value={editData.senderName}
//                           onChange={(e) => handleChange('senderName', e.target.value)}
//                           className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
//                         />
//                       </div>

//                       <div className="flex items-center justify-center p-[20px]">
//                         <Button size="large" onClick={handleUpdateAccount}>
//                           수정 완료
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//             <Button size="small" onClick={() => setOpen(false)}>
//               인증완료
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScreenPage;

'use client';

import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import {
  selectedImageAtom,
  accountNumberAtom,
  ocrResultAtom,
  isVerifiedAtom,
  updatePassbookDataAtom,
} from 'src/_store/passbookAtoms';

const ScreenPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    transactionDate: '',
    transactionAmount: '',
    senderName: '',
  });

  const [selectedImage] = useAtom(selectedImageAtom);
  const [accountNumber] = useAtom(accountNumberAtom);
  const [ocrResult, setOcrResult] = useAtom(ocrResultAtom);
  const [isVerified, setIsVerified] = useAtom(isVerifiedAtom);
  const [, updatePassbookData] = useAtom(updatePassbookDataAtom);

  const handleEditAccountInfo = () => {
    if (!ocrResult) return;
    setEditData({
      transactionDate: ocrResult.transactionDate.toString(),
      transactionAmount: ocrResult.transactionAmount.toString(),
      senderName: ocrResult.senderName,
    });
    setOpen(true);
  };

  const handleChange = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateAccount = () => {
    if (!ocrResult) return;
    const updatedResult = {
      ...ocrResult,
      transactionDate: editData.transactionDate,
      transactionAmount: editData.transactionAmount,
      senderName: editData.senderName,
    };
    setOcrResult(updatedResult);
    updatePassbookData({ imageDataURL: selectedImage, ocrResult: updatedResult });
    setOpen(false);
  };

  const handleVerificationComplete = async () => {
    try {
      // 실제 API 호출 (현재는 목데이터 사용)
      // const response = await fetch('/api/verify-passbook', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(ocrResult),
      // });
      // const data = await response.json();

      // 목데이터 (실제 API 응답을 시뮬레이션)
      const data = { success: true };

      if (data.success) {
        setIsVerified(true);
        router.push('/verification-success');
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div className="w-full">
        <h2 className="text-xl font-bold mb-6 text-center">입력 내용 확인</h2>

        {selectedImage && (
          <div className="flex justify-center relative">
            <Image
              src={selectedImage}
              alt="Uploaded Passbook"
              width={320}
              height={240}
              className="rounded-[16px] w-[320px] h-[280px] object-cover mb-[24px] shadow-lg"
              style={{
                objectPosition: '50% 15%',
                boxShadow: '0 0px 1px #CDD1D5, 0 4px 2px #CDD1D5',
              }}
            />
            {ocrResult?.highlightBoxes?.map((box, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: box.y,
                  left: box.x,
                  width: box.width,
                  height: box.height,
                  border: '2px solid red',
                }}
              />
            ))}
          </div>
        )}

        <div className="w-[320px] h-auto bg-gray-5 rounded-[16px] p-[20px] mx-auto">
          <div className="title-sm text-gray-90 mb-[16px]">인증 내역</div>

          <div className="border-t-[1px] border-b-[1px] border-gray-10 my-[16px]" />

          {ocrResult?.accountNumber && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">계좌 번호</span>
              <span className="body-md text-gray-80">{ocrResult.accountNumber}</span>
            </div>
          )}

          {ocrResult?.transactionDate && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">거래 일시</span>
              <span className="body-md text-gray-80">{ocrResult.transactionDate}</span>
            </div>
          )}

          {ocrResult?.transactionAmount && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">거래 금액</span>
              <span className="body-md text-gray-80">
                {Number(ocrResult.transactionAmount).toLocaleString()} 원
              </span>
            </div>
          )}

          {ocrResult?.senderName && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">보낸 사람</span>
              <span className="body-md text-gray-80">{ocrResult.senderName}</span>
            </div>
          )}
        </div>

        <div className="fixed bottom-[20px] left-0 right-0">
          <div className="flex flex-col justify-center items-center">
            <p className="title-xs text-gray-80">김모아님 인증 내역이 맞는지</p>
            <p className="title-xs text-gray-80">다시 한번 확인해주세요.</p>
          </div>

          <div className="flex justify-center gap-[4px] mt-[24px]">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="small" variant="secondary" onClick={handleEditAccountInfo}>
                  수정하기
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="sm:max-w-full border-t border-[#EDEFF1] h-[466px] bg-white p-[20px] rounded-t-xl"
              >
                {/* ... (Sheet 내용은 변경 없음) */}
              </SheetContent>
            </Sheet>
            <Button size="small" onClick={handleVerificationComplete}>
              인증완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenPage;
