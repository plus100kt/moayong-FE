// src/app/_components/register/InputSlide.tsx
import { useState } from 'react';
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

  const handleSubmit = () => {
    onNext(keyName, inputValue);
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
