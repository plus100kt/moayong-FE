// src/app/_components/register/InputSlide.tsx
import { useState, useEffect } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

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

  // 컴포넌트가 마운트되거나 keyName이 변경될 때 inputValue를 초기화
  useEffect(() => {
    // keyName이 변경되었다는 것은 다른 슬라이드로 이동했다는 의미
    setInputValue(initialValue);
  }, [keyName, initialValue]);

  const handleSubmit = () => {
    onNext(keyName, inputValue);
    // 제출 후 입력값 초기화
    setInputValue('');
  };

  return (
    <div className="w-full h-40 flex flex-col items-center justify-center">
      <label>{label}</label>
      <Input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleSubmit}>다음</Button>
    </div>
  );
};

export default InputSlide;