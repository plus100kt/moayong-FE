'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from 'src/lib/utils';

const SplashPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2초 동안 스플래시 화면을 보여준 후 로그인 페이지로 이동
    const timer = setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [router]);

  return (
    <div
      className={cn(
        'flex items-center justify-center h-screen',
        'bg-green-50 text-gray-0',
        loading ? 'opacity-100' : 'opacity-0 transition-opacity duration-500' // 페이드 아웃 효과
      )}
    >
      {/* 로고 또는 간단한 텍스트 */}
      <h1>서비스 이름</h1>
    </div>
  );
};

export default SplashPage;
