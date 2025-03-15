import React from 'react';
import Image from 'next/image';
import { Button } from 'src/components/ui/button';

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[16px] w-[320px] h-[480px] flex flex-col items-center justify-center shadow-lg">
        {/* 이미지 자리 */}
        <div className="w-[120px] h-[120px] mb-[24px]">
          <Image
            src="/path/to/success-image-placeholder.png" // 이미지 경로 수정
            alt="Success"
            width={120}
            height={120}
            className="object-cover"
          />
        </div>
        <p className="text-lg font-bold text-center mb-4">저축인증이 완료되었습니다!</p>
        <p className="text-sm text-gray-700 text-center mb-6">
          오늘 1,345명의 사람들이 저축인증을 했어요!
        </p>
        <Button size="small" onClick={onClose}>
          인증내역 확인하기
        </Button>
      </div>
    </div>
  );
};

export default SuccessPopup;
