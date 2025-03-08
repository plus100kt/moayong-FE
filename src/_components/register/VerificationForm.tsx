import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';


interface VerificationFormProps {
  onComplete: (bankName: string, accountNumber: string) => void;
}

const VerificationForm = ({ onComplete }: VerificationFormProps) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = () => {
    // 통장 인증 로직
    console.log('통장 인증:', bankName, accountNumber);
    onComplete(bankName, accountNumber);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input
        type="text"
        placeholder="은행명"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="계좌번호"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <Button onClick={handleSubmit}>인증하기</Button>
    </div>
  );
};

export default VerificationForm;
