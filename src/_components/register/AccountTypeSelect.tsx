// src/_components/register/AccountTypeSelect.tsx
import { useState, useEffect } from 'react';
import { Button } from 'src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { DialogTitle } from 'src/components/ui/dialog';

interface AccountTypeSelectProps {
  onSelect: (bankName: string) => void;
  initialBankName: string;
}

const AccountTypeSelect = ({ onSelect, initialBankName }: AccountTypeSelectProps) => {
  const [savingType, setSavingType] = useState(initialBankName || '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialBankName) setSavingType(initialBankName);
  }, [initialBankName]);

  const handleUpdate = () => {
    console.log('선택 완료:', savingType);
    onSelect(savingType);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>저축 통장 선택</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="sm:max-w-full">
        <div className="flex flex-col h-full justify-between">
          <div className="px-6 py-4">
            <DialogTitle className="text-lg font-semibold">저축 통장 선택</DialogTitle>
            <p className="text-sm text-gray-500">저축 통장을 선택해주세요.</p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="grid gap-2">
              <label htmlFor="saving-type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                통장 종류
              </label>
              <Select onValueChange={setSavingType} defaultValue={savingType}>
                <SelectTrigger className="data-[placeholder=true]:text-muted-foreground">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="정기 예금">정기 예금</SelectItem>
                  <SelectItem value="자유 적금">자유 적금</SelectItem>
                  <SelectItem value="체크 통장">체크 통장</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-center p-6">
            <Button onClick={handleUpdate}>선택 완료</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet >
  );
};

export default AccountTypeSelect;
