'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputSlide from 'src/_components/register/InputSlide';
import { motion } from 'framer-motion';
import AccountTypeSelect from 'src/_components/register/AccountTypeSelect';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import Image from 'next/image';
import backbar from 'src/assets/appbar.svg'
import x from 'src/assets/icon-x.svg'
import AccountVerification from 'src/_components/register/AccountVerification';
import PassbookVerification from 'src/_components/register/PassbookVerification';

const RegisterPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputValues, setInputValues] = useState<any>({});
  const totalSlides = 8;
  const slideLabels = ['이름', '닉네임', '월 급여', '월 저축 목표', '저축 통장', '계좌 번호', '이미지 업로드', '완료'];
  const keys = ["name", "nickname", "salary", "savingGoal", "savingType", "account", "imageUploded"];
  const [showReviewPage, setShowReviewPage] = useState(false);
  const [open, setOpen] = useState(false);
  const [savingType, setSavingType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [ocrAccountNumber, setOcrAccountNumber] = useState('');

  const handleNextSlide = (key: any, value: any) => {
    setInputValues((prevValues: any) => ({
      ...prevValues,
      [key]: value,
    }));

    if (currentSlide < totalSlides - 1) {
      setIsGoingBack(false);
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowReviewPage(true); // 모든 입력이 끝나면 ReviewPage를 보여줌
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide >= 7) {
      setIsGoingBack(true);
      setCurrentSlide(5);
      return;
    }
    if (currentSlide > 0) {
      setIsGoingBack(true);
      setCurrentSlide(currentSlide - 1);
      return;
    }
  }

  const handleCompleteRegistration = () => {
    router.push('/onboarding');
  };

  const handleEditAccountInfo = () => {
    // 바텀시트 열기 전에 현재 값으로 초기화
    setSavingType(inputValues.savingType || '');
    setAccountNumber(inputValues.accountNumber || '');
    setOpen(true);
  };

  // const handleUpdateAccount = () => {
  //   // 바텀시트에서 수정된 정보로 업데이트
  //   setInputValues((prevValues: any) => ({
  //     ...prevValues,
  //     savingType,
  //     accountNumber: ocrAccountNumber,
  //   }));
  //   setOpen(false);
  // };
  const handleUpdateAccount = () => {
    // 바텀시트에서 수정된 정보로 업데이트
    setInputValues((prevValues: any) => {
      // 1. imageUploded가 있는지 확인
      if (!prevValues.imageUploded || !prevValues.imageUploded.ocrResult) {
        console.error("imageUploded 또는 ocrResult가 없습니다.");
        return prevValues; // 이전 상태를 그대로 반환
      }

      // 2. ocrResult 객체 복사 (불변성 유지)
      const updatedOcrResult = {
        ...prevValues.imageUploded.ocrResult,
        accountNumber: ocrAccountNumber, // 계좌번호 업데이트
      };

      // 3. imageUploded 객체 복사 (불변성 유지)
      const updatedImageUploded = {
        ...prevValues.imageUploded,
        ocrResult: updatedOcrResult, // ocrResult 업데이트
      };

      // 4. 최종적으로 inputValues 업데이트
      return {
        ...prevValues,
        savingType,
        imageUploded: updatedImageUploded, // imageUploded 업데이트
        accountNumber: ocrAccountNumber, // accountNumber 업데이트 (optional)
      };
    });
    setOpen(false);
  };
  const allDataPresent = Object.keys(inputValues).length > 0 && Object.keys(inputValues).every((key) => {
    return keys.every((key) => {
      if (key === 'account' || key === 'imageUploded') {
        return inputValues['imageUploded']?.ocrResult?.accountNumber
      }
      return inputValues[key];
    })
  });

  const banks = [
    { name: "KB국민은행", logo: "#" },
    { name: "신한은행", logo: "#" },
    { name: "우리은행", logo: "#" },
    { name: "KEB하나은행", logo: "#" },
    { name: "카카오뱅크", logo: "#" },
    { name: "케이뱅크", logo: "#" },
    { name: "토스", logo: "#" }
  ];

  const handleRegistrationComplete = () => {
    // 가입 완료 후 처리할 로직 (예: 팝업 표시, 페이지 이동)
    alert("가입이 완료되었습니다!");
    handleCompleteRegistration() // 완료 팝업에서 누르면 실행됨
    router.push('/'); // 완료 후 루트 페이지로 이동
  };

  useEffect(() => {
    // 이미지 업로드 후 OCR 결과에서 계좌 번호를 초기화
    if (inputValues['imageUploded']?.ocrResult?.accountNumber) {
      setOcrAccountNumber(inputValues['imageUploded'].ocrResult.accountNumber);
    }
  }, [inputValues['imageUploded']?.ocrResult?.accountNumber]);

  const renderSlideContent = () => {
    const slideDirection = isGoingBack ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 };
    const slideAnimate = isGoingBack ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 };

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
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 1 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {String(inputValues[key])}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 1:
        return (
          <>
            <InputSlide
              label="닉네임을 입력하세요:"
              keyName="nickname"
              onNext={handleNextSlide}
              initialValue={inputValues.nickname}
            />
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 2 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {String(inputValues[key])}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <InputSlide
              label="월 급여를 입력하세요:"
              keyName="salary"
              type="number"
              onNext={handleNextSlide}
              initialValue={inputValues.salary}
            />
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 3 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {String(inputValues[key])}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 3:
        return (
          <>
            <InputSlide
              label="월 저축 목표:"
              keyName="savingGoal"
              type="number"
              onNext={handleNextSlide}
              initialValue={inputValues.savingGoal}
              salary={inputValues.salary}
            />
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 4 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {String(inputValues[key])}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 4:
        return (
          <>
            <AccountTypeSelect
              initialBankName={inputValues.savingType || ''}
              onSelect={(savingType) => {
                handleNextSlide('savingType', savingType);
              }}
            />
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 5 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {String(inputValues[key])}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 5:
        return (
          <>
            <AccountVerification
              label="계좌번호:"
              keyName="account"
              type="number"
              onClick={(ocrResult) => handleNextSlide('imageUploded', ocrResult)}
              onNext={() => { }}
              handleSccess={handleRegistrationComplete}
              allDataPresent={allDataPresent}
              initialValue={inputValues.savingGoal}
            />
            {/* <div className="flex flex-col space-y-4">
              <label className="block text-sm font-medium">계좌번호 입력</label>
              <Input
                type="text"
                placeholder="계좌번호를 입력하세요"
                value={inputValues.accountNumber || ''}
                onChange={(e) => setInputValues({ ...inputValues, accountNumber: e.target.value })}
              />
              <Button onClick={() => handleNextSlide('imageUploaded', true)}>
                통장 인증 완료
              </Button>
            </div> */}
            {Object.keys(inputValues).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col-reverse"
              >
                {Object.keys(inputValues).map((key, index) => (
                  index < 6 &&
                  <motion.div
                    key={key}
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mx-[20px] label-md mb-1 text-gray-70 mt-[8px]">
                      {slideLabels[index]}
                    </label>
                    <div className="text-gray-50 border-b border-gray-30 mx-[20px] title-md pb-1">
                      {
                        inputValues[key]?.ocrResult?.accountNumber
                          ? String(inputValues[key]?.ocrResult?.accountNumber)
                          : typeof inputValues[key] === "object" && inputValues[key] !== null
                            ? ""
                            : String(inputValues[key]) || ""
                      }
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        );
      case 6: // 새로운 창이 떠야함 (화면 전체를 덮는 모달 - 통장 인증, 최종 결과)
        return (
          <>
            <PassbookVerification
              keyName="imageUploded"
              onClick={handleNextSlide}
            />
          </>
        );
      case 7: // 새로운 창이 떠야함 (화면 전체를 덮는 모달 - 통장 인증, 최종 결과)
        return (
          <>
            <div className="w-full">
              <h2 className="text-xl font-bold mb-6 text-center">입력 내용 확인</h2>

              {/* 이미지 렌더링 */}
              {inputValues.imageUploded?.imageDataURL && (
                <div className="flex justify-center relative">
                  {/* 
                    object-position: center center; (기본값) — 이미지를 중앙에 맞춤
                    object-position: left top; — 이미지를 왼쪽 상단에 맞춤
                    object-position: right bottom; — 이미지를 오른쪽 하단에 맞춤
                    object-position: 50% 50%; — 이미지를 중앙에 맞춤 (중간값)
                    object-position: 0px 0px; — 왼쪽 상단에 맞춤 (픽셀값으로도 설정 가능)
                  */}
                  <Image
                    src={inputValues.imageUploded.imageDataURL}
                    alt="Uploaded Passbook"
                    width={320}
                    height={240}
                    // TODO: w-[320], h-[280px] w-fit, h-fit 시안 논의
                    className="rounded-[16px] w-[320px] h-[280px] object-cover mb-[24px] shadow-lg"
                    style={{
                      objectPosition: '50% 15%',
                      boxShadow: '0 0px 1px #CDD1D5, 0 4px 2px #CDD1D5',
                    }}
                  />

                  {/* 하이라이트 박스 렌더링 */}
                  {inputValues.imageUploded.ocrResult?.highlightBoxes?.map((box: any, index: any) => (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        top: box.y,
                        left: box.x,
                        width: box.width,
                        height: box.height,
                        border: '2px solid red', // 하이라이트 색상
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="w-[320px] h-[149px] bg-gray-5 rounded-[16px] p-[20px] mx-auto">
                {/* 인증 내역 제목 */}
                <div className="title-sm text-gray-90 mb-[16px]">인증 내역</div>

                {/* 구분선 */}
                <div className="border-t-[1px] border-b-[1px] border-gray-10 my-[16px]" />

                {/* 계좌 번호 렌더링 */}
                {inputValues.imageUploded?.ocrResult?.accountNumber && (
                  <div className="flex justify-left mb-[8px] gap-[4px]">
                    <span className="text-gray-80 title-xs">계좌 번호</span>
                    <span className="body-md text-gray-80">
                      {inputValues.imageUploded.ocrResult.accountNumber}
                    </span>
                  </div>
                )}

                {/* 통장 잔액 렌더링 */}
                {inputValues.imageUploded?.ocrResult?.bankBalance && (
                  <div className="flex justify-left gap-[4px]">
                    <span className="text-gray-80 title-xs">통장 잔액</span>
                    <span className="body-md text-gray-80">
                      {Number(inputValues.imageUploded.ocrResult.bankBalance).toLocaleString()} 원
                    </span>
                  </div>
                )}
              </div>

              {/* TODO: 정보 렌더링 협의 */}
              {/* <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">이름:</span>
                  <span className="font-medium">{inputValues.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">닉네임:</span>
                  <span className="font-medium">{inputValues.nickname}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">월 급여:</span>
                  <span className="font-medium">{inputValues.salary?.toLocaleString()} 원</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">월 저축 목표:</span>
                  <span className="font-medium">{inputValues.savingGoal?.toLocaleString()} 원</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">저축 통장 종류:</span>
                  <span className="font-medium">{inputValues.savingType}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">계좌 번호:</span>
                  <span className="font-medium">{inputValues.accountNumber}</span>
                </div>
              </div> */}
              <div className="fixed bottom-[20px] left-0 right-0">
                <div className='flex flex-col justify-center items-center'>
                  <p className='title-xs text-gray-80'>김모아님 통장 계좌번호와</p>
                  <p className='title-xs text-gray-80'>잔액이 맞는지 다시 한번 확인해주세요.</p>
                </div>

                <div className="flex justify-center gap-[4px] mt-[24px]">
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                      <Button size={"small"} variant="secondary" onClick={handleEditAccountInfo}>
                        수정하기
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="sm:max-w-full border-t border-[#EDEFF1] h-[405px] bg-white p-[20px] rounded-t-xl">
                      <div className="h-1 w-[60px] bg-[#EDEFF1] mx-auto rounded-full mb-[20px]"></div>
                      <div className="flex flex-col h-full justify-between">
                        <div className="mt-[15px]">
                          <h3 className='text-gray-80 title-sm mb-[24px]'>계좌 수정하기</h3>
                          <div>
                            <span className='label-md text-gray-70'>저축 통장</span>
                            <Select onValueChange={setSavingType} defaultValue={inputValues.savingType}>
                              <SelectTrigger className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-6">
                                <SelectValue placeholder="선택하세요" />
                              </SelectTrigger>
                              <SelectContent>
                                {banks.map((bank) => (
                                  <SelectItem key={bank.name} value={bank.name} className="flex items-center cursor-pointer hover:bg-gray-5 active:bg-gray-10 rounded-[16px] py-[10px]">
                                    <div
                                      key={bank.name}
                                      className="flex items-center ursor-pointer hover:bg-gray-5 active:bg-gray-10 rounded-[16px] py-[10px]"
                                    >
                                      <div className="w-[32px] h-[32px] bg-gray-300 flex items-center justify-center rounded-full">
                                        {/* 은행 로고 자리 */}
                                        <span className="text-sm">🏦</span>
                                      </div>
                                      <span className="ml-4 text-gray-50 body-md">{bank.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className='mt-[24px]'>
                            <span className='label-md text-gray-70'>계좌번호</span>
                            <Input
                              type="text"
                              id="account-number"
                              placeholder="계좌 번호를 입력하세요"
                              value={ocrAccountNumber}
                              onChange={(e) => setOcrAccountNumber(e.target.value)}
                              className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
                            />
                          </div>
                          {/* <div className='mt-[24px]'>
                            <span className='label-md text-gray-70'>계좌번호</span>
                            <Input
                              type="text"
                              id="account-number"
                              placeholder="계좌 번호를 입력하세요"
                              value={ocrAccountNumber}
                              onChange={(e) => setOcrAccountNumber(e.target.value)}
                            />
                          </div> */}
                        </div>
                        <div className="flex items-center justify-center p-[20px]">
                          <Button size={"large"} onClick={() => {
                            handleUpdateAccount()
                            handlePrevSlide()
                          }}>수정 완료</Button>
                        </div>
                      </div>
                    </SheetContent>
                    {/* <SheetContent side="bottom" className="sm:max-w-full">
                      <div className="flex flex-col h-full justify-between">
                        <div className="px-6 py-4">
                          <h2 className="text-lg font-semibold">계좌 정보 수정</h2>
                          <p className="text-sm text-gray-500">정확한 계좌 정보를 입력해주세요.</p>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                          <div className="grid gap-2">
                            <label htmlFor="saving-type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              저축 통장
                            </label>
                            <Select onValueChange={setSavingType} defaultValue={inputValues.savingType}>
                              <SelectTrigger>
                                <SelectValue placeholder="선택하세요" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="정기 예금">정기 예금</SelectItem>
                                <SelectItem value="자유 적금">자유 적금</SelectItem>
                                <SelectItem value="체크 통장">체크 통장</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="account-number" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              계좌 번호
                            </label>
                            <Input
                              type="text"
                              id="account-number"
                              placeholder="계좌 번호를 입력하세요"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-center p-6">
                          <Button onClick={handleUpdateAccount}>수정 완료</Button>
                        </div>
                      </div>
                    </SheetContent> */}
                  </Sheet>
                  <Button size={"small"} onClick={() => {
                    handlePrevSlide()
                  }}>
                    인증완료
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <div>잘못된 슬라이드입니다.</div>;
    }
  };

  return (
    <div className="flex flex-col items-left justify-start overflow-auto pb-[20px]">
      <div className='h-[50px] w-full flex items-center pl-[9px]'>
        <button onClick={handlePrevSlide} className='z-10'>
          <Image src={currentSlide > 5 ? x : backbar} alt="" />
        </button>
        {
          currentSlide >= 5 && <p className='title-sm text-gray-80 text-center w-full ml-[-36px]'>통장인증</p>
        }
      </div>
      {
        currentSlide <= 5 && (
          <div className='pl-[20px] mb-1 mt-[40px] label-sm'>
            <span className='text-gray-80 mr-1'>{currentSlide + 1 > 5 ? 5 : currentSlide + 1}</span>
            <span className='text-gray-30'>/</span>
            <span className='text-gray-30'>
              {/* TODO: 정책 협의 */}
              {/* {slideLabels.length} */}
              5
            </span>
          </div>
        )
      }
      <div className="w-full max-w-md text-left heading-sm mb-[32px] pl-[20px]">
        <p className={`${currentSlide === 0 ? "block" : "hidden"}`}>
          당신의 <br /> 이름을 알려주세요.
        </p>
        <p className={`${currentSlide === 1 ? "block" : "hidden"}`}>
          리그에서 어떤 닉네임으로 <br /> 불러드릴까요?
        </p>
        <p className={`${currentSlide === 2 ? "block" : "hidden"}`}>
          당신의 월 급여는 <br /> 얼마인가요?
        </p>
        <p className={`${currentSlide === 3 ? "block" : "hidden"}`}>
          월 급여의 몇 퍼센트 <br /> 모으시겠어요?
        </p>
        <p className={`${currentSlide === 4 ? "block" : "hidden"}`}>
          저축 챌린지에 쓸 통장을 <br /> 인증해주세요.
        </p>
      </div>

      {renderSlideContent()}
    </div>
  );
};

export default RegisterPage;

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button } from 'src/components/ui/button';
// import { Input } from 'src/components/ui/input';
// import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form';

// const nameSchema = z.object({
//   name: z.string().min(2, { message: '이름은 최소 2글자 이상이어야 합니다.' }),
// });

// const nicknameSchema = z.object({
//   nickname: z.string().min(2, { message: '닉네임은 최소 2글자 이상이어야 합니다.' }),
// });

// const salarySchema = z.object({
//   salary: z.coerce.number().min(1, { message: '급여를 입력해주세요.' }),
// });

// const savingGoalSchema = z.object({
//   savingGoal: z.coerce.number().min(1, { message: '저축 목표를 입력해주세요.' }),
// });

// const savingTypeSchema = z.object({
//   savingType: z.string().min(1, { message: '저축 통장 종류를 선택해주세요.' }),
// });

// const accountNumberSchema = z.object({
//   accountNumber: z.string().min(10, { message: '유효한 계좌번호를 입력해주세요.' }).max(20, { message: '계좌번호가 너무 깁니다.' }),
// });

// // Create a combined schema for the entire form
// const formSchema = z.object({
//   name: nameSchema.shape.name,
//   nickname: nicknameSchema.shape.nickname,
//   salary: salarySchema.shape.salary,
//   savingGoal: savingGoalSchema.shape.savingGoal,
//   savingType: savingTypeSchema.shape.savingType,
//   accountNumber: accountNumberSchema.shape.accountNumber,
//   imageUploaded: z.boolean().optional(),
// });

// // Custom InputSlide component with form integration
// const InputSlideWithForm = ({
//   label,
//   name,
//   type = "text",
//   form,
//   onNext
// }: {
//   label: string,
//   name: string,
//   type?: string,
//   form: any,
//   onNext: () => void
// }) => {
//   return (
//     <div className="w-full max-w-md">
//       <FormField
//         control={form.control}
//         name={name}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className={form.formState.errors[name] ? "text-red-500" : ""}>{label}</FormLabel>
//             <FormControl>
//               <Input
//                 type={type}
//                 {...field}
//                 onChange={(e) => {
//                   const value = type === "number" ?
//                     e.target.value === "" ? "" : Number(e.target.value) :
//                     e.target.value;
//                   field.onChange(value);
//                 }}
//                 className={form.formState.errors[name] ? "border-red-500" : ""}
//               />
//             </FormControl>
//             <FormMessage className="text-red-500" />
//           </FormItem>
//         )}
//       />
//       <Button
//         className="mt-4 w-full"
//         onClick={onNext}
//         disabled={!form.formState.isValid || form.formState.errors[name]}
//       >
//         다음
//       </Button>
//     </div>
//   );
// };

// const RegisterPage = () => {
//   const router = useRouter();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = 7;
//   const slideLabels = ['이름', '닉네임', '월 급여', '월 저축 목표', '저축 통장'];
//   const [open, setOpen] = useState(false);

//   // Create the form
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: '',
//       nickname: '',
//       salary: undefined,
//       savingGoal: undefined,
//       savingType: '',
//       accountNumber: '',
//       imageUploaded: false,
//     },
//     mode: 'onChange',
//   });

//   // Form for the bottom sheet
//   const editForm = useForm({
//     resolver: zodResolver(z.object({
//       savingType: savingTypeSchema.shape.savingType,
//       accountNumber: accountNumberSchema.shape.accountNumber,
//     })),
//     defaultValues: {
//       savingType: '',
//       accountNumber: '',
//     },
//     mode: 'onChange',
//   });

//   // Update edit form values when main form changes
//   useEffect(() => {
//     editForm.reset({
//       savingType: form.getValues('savingType'),
//       accountNumber: form.getValues('accountNumber'),
//     });
//   }, [open]);

//   const handleNextSlide = () => {
//     if (currentSlide < totalSlides - 1) {
//       setCurrentSlide(currentSlide + 1);
//     }
//   };

//   const handleCompleteRegistration = () => {
//     console.log('Registration completed with values:', form.getValues());
//     router.push('/onboarding');
//   };

//   const handleEditAccountInfo = () => {
//     setOpen(true);
//   };

//   const handleUpdateAccount = () => {
//     if (editForm.formState.isValid) {
//       const { savingType, accountNumber } = editForm.getValues();
//       form.setValue('savingType', savingType, { shouldValidate: true });
//       form.setValue('accountNumber', accountNumber, { shouldValidate: true });
//       setOpen(false);
//     }
//   };

//   // Get the current values to show in the review section
//   const getFormValues = () => {
//     return form.getValues();
//   };

//   const renderSlideContent = () => {
//     switch (currentSlide) {
//       case 0:
//         return (
//           <>
//             <InputSlideWithForm
//               label="이름을 입력하세요:"
//               name="name"
//               form={form}
//               onNext={handleNextSlide}
//             />
//             {Object.keys(getFormValues()).filter(key => getFormValues()[key] !== '' && getFormValues()[key] !== undefined).length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, ease: 'easeInOut' }}
//                 className="flex flex-col-reverse mt-8 w-full max-w-md"
//               >
//                 {Object.entries(getFormValues())
//                   .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                   .map(([key, value], index) => {
//                     const labelIndex = slideLabels.findIndex((label) =>
//                       label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                     if (labelIndex === -1 || value === undefined) return null;

//                     return (
//                       <motion.div
//                         key={key}
//                         className="mb-4"
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                       >
//                         <label className="block text-sm font-medium text-gray-500">
//                           {slideLabels[labelIndex]}
//                         </label>
//                         <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                           {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//               </motion.div>
//             )}
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <InputSlideWithForm
//               label="닉네임을 입력하세요:"
//               name="nickname"
//               form={form}
//               onNext={handleNextSlide}
//             />
//             {/* Previous Values Display - Same pattern as case 0 */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="flex flex-col-reverse mt-8 w-full max-w-md"
//             >
//               {Object.entries(getFormValues())
//                 .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                 .map(([key, value], index) => {
//                   const labelIndex = slideLabels.findIndex((label) =>
//                     label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                   if (labelIndex === -1 || value === undefined) return null;

//                   return (
//                     <motion.div
//                       key={key}
//                       className="mb-4"
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-500">
//                         {slideLabels[labelIndex]}
//                       </label>
//                       <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                         {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//             </motion.div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <InputSlideWithForm
//               label="월 급여를 입력하세요:"
//               name="salary"
//               type="number"
//               form={form}
//               onNext={handleNextSlide}
//             />
//             {/* Previous Values Display */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="flex flex-col-reverse mt-8 w-full max-w-md"
//             >
//               {Object.entries(getFormValues())
//                 .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                 .map(([key, value], index) => {
//                   const labelIndex = slideLabels.findIndex((label) =>
//                     label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                   if (labelIndex === -1 || value === undefined) return null;

//                   return (
//                     <motion.div
//                       key={key}
//                       className="mb-4"
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-500">
//                         {slideLabels[labelIndex]}
//                       </label>
//                       <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                         {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//             </motion.div>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <InputSlideWithForm
//               label="월 저축 목표를 입력하세요:"
//               name="savingGoal"
//               type="number"
//               form={form}
//               onNext={handleNextSlide}
//             />
//             {/* Previous Values Display */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="flex flex-col-reverse mt-8 w-full max-w-md"
//             >
//               {Object.entries(getFormValues())
//                 .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                 .map(([key, value], index) => {
//                   const labelIndex = slideLabels.findIndex((label) =>
//                     label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                   if (labelIndex === -1 || value === undefined) return null;

//                   return (
//                     <motion.div
//                       key={key}
//                       className="mb-4"
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-500">
//                         {slideLabels[labelIndex]}
//                       </label>
//                       <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                         {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//             </motion.div>
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <div className="w-full max-w-md">
//               <FormField
//                 control={form.control}
//                 name="savingType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className={form.formState.errors.savingType ? "text-red-500" : ""}>
//                       저축 통장 종류를 선택하세요:
//                     </FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className={form.formState.errors.savingType ? "border-red-500" : ""}>
//                           <SelectValue placeholder="선택하세요" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="정기 예금">정기 예금</SelectItem>
//                         <SelectItem value="자유 적금">자유 적금</SelectItem>
//                         <SelectItem value="체크 통장">체크 통장</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="mt-4 w-full"
//                 onClick={handleNextSlide}
//                 disabled={!form.getFieldState('savingType').isDirty || !!form.formState.errors.savingType}
//               >
//                 다음
//               </Button>
//             </div>
//             {/* Previous Values Display */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="flex flex-col-reverse mt-8 w-full max-w-md"
//             >
//               {Object.entries(getFormValues())
//                 .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                 .map(([key, value], index) => {
//                   const labelIndex = slideLabels.findIndex((label) =>
//                     label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                   if (labelIndex === -1 || value === undefined) return null;

//                   return (
//                     <motion.div
//                       key={key}
//                       className="mb-4"
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-500">
//                         {slideLabels[labelIndex]}
//                       </label>
//                       <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                         {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//             </motion.div>
//           </>
//         );
//       case 5:
//         return (
//           <>
//             <div className="w-full max-w-md">
//               <FormField
//                 control={form.control}
//                 name="accountNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className={form.formState.errors.accountNumber ? "text-red-500" : ""}>
//                       계좌번호를 입력하세요:
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         className={form.formState.errors.accountNumber ? "border-red-500" : ""}
//                         placeholder="예: 123-456-789012"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="mt-4 w-full"
//                 onClick={() => {
//                   form.setValue('imageUploaded', true);
//                   handleNextSlide();
//                 }}
//                 disabled={!form.getFieldState('accountNumber').isDirty || !!form.formState.errors.accountNumber}
//               >
//                 통장 인증 완료
//               </Button>
//             </div>
//             {/* Previous Values Display */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="flex flex-col-reverse mt-8 w-full max-w-md"
//             >
//               {Object.entries(getFormValues())
//                 .filter(([key, value]) => value !== '' && value !== undefined && key !== 'imageUploaded')
//                 .map(([key, value], index) => {
//                   const labelIndex = slideLabels.findIndex((label) =>
//                     label.toLowerCase().includes(key.toLowerCase().replace(/[0-9]/g, '')));

//                   if (labelIndex === -1 || value === undefined) return null;

//                   return (
//                     <motion.div
//                       key={key}
//                       className="mb-4"
//                       initial={{ opacity: 0, y: -20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-500">
//                         {slideLabels[labelIndex]}
//                       </label>
//                       <div className="mt-1 text-gray-500 border-b border-gray-500 py-2">
//                         {typeof value === 'number' ? value.toLocaleString() : String(value)}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//             </motion.div>
//           </>
//         );
//       case 6:
//         const values = getFormValues();
//         return (
//           <>
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//               <h2 className="text-xl font-bold mb-6 text-center">입력 내용 확인</h2>

//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">이름:</span>
//                   <span className="font-medium">{values.name}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">닉네임:</span>
//                   <span className="font-medium">{values.nickname}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">월 급여:</span>
//                   <span className="font-medium">{values.salary?.toLocaleString()} 원</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">월 저축 목표:</span>
//                   <span className="font-medium">{values.savingGoal?.toLocaleString()} 원</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">저축 통장 종류:</span>
//                   <span className="font-medium">{values.savingType}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">계좌 번호:</span>
//                   <span className="font-medium">{values.accountNumber}</span>
//                 </div>
//               </div>

//               <div className="mt-8 space-y-3">
//                 <Button
//                   className="w-full"
//                   onClick={handleCompleteRegistration}
//                   disabled={!form.formState.isValid}
//                 >
//                   가입 완료
//                 </Button>

//                 <Sheet open={open} onOpenChange={setOpen}>
//                   <SheetTrigger asChild>
//                     <Button variant="secondary" className="w-full" onClick={handleEditAccountInfo}>
//                       계좌 정보 수정하기
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent side="bottom" className="sm:max-w-full">
//                     <Form {...editForm}>
//                       <div className="flex flex-col h-full justify-between">
//                         <div className="px-6 py-4">
//                           <h2 className="text-lg font-semibold">계좌 정보 수정</h2>
//                           <p className="text-sm text-gray-500">정확한 계좌 정보를 입력해주세요.</p>
//                         </div>
//                         <div className="px-6 py-4 space-y-4">
//                           <FormField
//                             control={editForm.control}
//                             name="savingType"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel className={editForm.formState.errors.savingType ? "text-red-500" : ""}>
//                                   저축 통장
//                                 </FormLabel>
//                                 <Select
//                                   onValueChange={field.onChange}
//                                   defaultValue={field.value}
//                                 >
//                                   <FormControl>
//                                     <SelectTrigger className={editForm.formState.errors.savingType ? "border-red-500" : ""}>
//                                       <SelectValue placeholder="선택하세요" />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     <SelectItem value="정기 예금">정기 예금</SelectItem>
//                                     <SelectItem value="자유 적금">자유 적금</SelectItem>
//                                     <SelectItem value="체크 통장">체크 통장</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                                 <FormMessage className="text-red-500" />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={editForm.control}
//                             name="accountNumber"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel className={editForm.formState.errors.accountNumber ? "text-red-500" : ""}>
//                                   계좌 번호
//                                 </FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     {...field}
//                                     className={editForm.formState.errors.accountNumber ? "border-red-500" : ""}
//                                     placeholder="예: 123-456-789012"
//                                   />
//                                 </FormControl>
//                                 <FormMessage className="text-red-500" />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div className="flex items-center justify-center p-6">
//                           <Button
//                             onClick={handleUpdateAccount}
//                             disabled={!editForm.formState.isValid || Object.keys(editForm.formState.errors).length > 0}
//                           >
//                             수정 완료
//                           </Button>
//                         </div>
//                       </div>
//                     </Form>
//                   </SheetContent>
//                 </Sheet>
//               </div>
//             </div>
//           </>
//         );
//       default:
//         return <div>잘못된 슬라이드입니다.</div>;
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-8">회원가입</h1>
//       <Form {...form}>
//         {renderSlideContent()}
//       </Form>
//     </div>
//   );
// };

// export default RegisterPage;