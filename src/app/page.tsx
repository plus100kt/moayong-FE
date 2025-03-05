'use client';


import { useAtom } from 'jotai';
import { usernameAtom, userAtom, isLoggedInAtom } from 'src/_store/atoms';
import { useState } from 'react';
import TestButton from 'src/_components/TestButton';
import Button from 'src/_components/Button';

export default function Home() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <div>
      <div>
        <h2>테스트</h2>
        <Button.Default variant="default" size={'xlarge'} onClick={() => console.log('test')}>Shadcn 테스트 버튼</Button.Default>
        <Button.Icon>저축 인증하기</Button.Icon>

        <Button.Default variant="secondary" size={'xsmall'}>Primary</Button.Default>
        <TestButton label='테스트' />
      </div>
    </div>
  );
}
