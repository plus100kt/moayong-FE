'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputSlide from 'src/_components/register/InputSlide';
import VerificationForm from 'src/_components/register/VerificationForm';
import { motion } from 'framer-motion'; // framer-motion 추가

const RegisterPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputValues, setInputValues] = useState<any>({}); // 입력 값들을 저장하는 상태
  const totalSlides = 4; // 전체 슬라이드 개수 (이름, 나이, 직업, 통장인증)
  const slideLabels = ['이름', '나이', '직업', '통장인증'];

  const handleNextSlide = (key: any, value: any) => {
    // 입력 값 저장
    setInputValues({ ...inputValues, [key]: value });

    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // 모든 슬라이드 완료 후 로직 (예: 데이터 저장 및 다음 페이지로 이동)
      console.log('회원가입 완료:', inputValues);
      // TODO: 데이터베이스에 사용자 정보 저장
      router.push('/onboarding'); // 온보딩 페이지로 이동
    }
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <>
            <InputSlide
              label="이름을 입력하세요:"
              keyName="name"
              onNext={handleNextSlide}
              initialValue={inputValues.name}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col-reverse" // 스택처럼 쌓기 위해 추가
            >
              {/* 이전 입력 내용 표시 */}
              {Object.keys(inputValues)
                .slice(0, Object.keys(inputValues).length) // 모든 입력 내용 표시
                .map((key, index) => (
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-500">
                      {slideLabels[index]}
                    </label>
                    <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
                      {inputValues[key]}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        );
      case 1:
        return (
          <>
            <InputSlide
              label="나이를 입력하세요:"
              keyName="age"
              type="number"
              onNext={handleNextSlide}
              initialValue={inputValues.age}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col-reverse" // 스택처럼 쌓기 위해 추가
            >
              {/* 이전 입력 내용 표시 */}
              {Object.keys(inputValues)
                .slice(0, Object.keys(inputValues).length) // 모든 입력 내용 표시
                .map((key, index) => (
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-500">
                      {slideLabels[index]}
                    </label>
                    <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
                      {inputValues[key]}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        );
      case 2:
        return (
          <>
            <InputSlide
              label="직업을 입력하세요:"
              keyName="job"
              onNext={handleNextSlide}
              initialValue={inputValues.job}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col-reverse" // 스택처럼 쌓기 위해 추가
            >
              {/* 이전 입력 내용 표시 */}
              {Object.keys(inputValues)
                .slice(0, Object.keys(inputValues).length) // 모든 입력 내용 표시
                .map((key, index) => (
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-500">
                      {slideLabels[index]}
                    </label>
                    <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
                      {inputValues[key]}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        );
      case 3:
        return (
          <>
            <VerificationForm
              onComplete={(bankName: any, accountNumber: any) => {
                setInputValues({
                  ...inputValues,
                  bankName,
                  accountNumber,
                });
                handleNextSlide('bankInfo', { bankName, accountNumber });
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col-reverse" // 스택처럼 쌓기 위해 추가
            >
              {/* 이전 입력 내용 표시 */}
              {Object.keys(inputValues)
                .slice(0, Object.keys(inputValues).length) // 모든 입력 내용 표시
                .map((key, index) => (
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-500">
                      {slideLabels[index]}
                    </label>
                    <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
                      {inputValues[key]}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        );
      default:
        return <div>잘못된 슬라이드입니다.</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>회원가입</h1>
      {renderSlideContent()}
    </div>
  );
};

export default RegisterPage;
