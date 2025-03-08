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
    }, 2000000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [router]);

  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center h-screen', // 좌측 정렬
        'bg-green-50 text-gray-0',
        loading ? 'opacity-100' : 'opacity-0 transition-opacity duration-500' // 페이드 아웃 효과
      )}
    >
      {/* 따옴표 */}
      <div className="mb-[17px] ml-[36px]">
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.55224 15V8.47826C9.61194 3.97233 11.1642 1.83795 12.7761 0.830039C13.791 0.296442 14.8657 0 15.9403 0V2.84585C13.0746 2.84585 12.5373 6.28459 12.5373 8.47826H16V15H9.55224ZM0 15V8.47826C0.0597016 3.97233 1.61194 1.83795 3.22388 0.830039C4.23881 0.296442 5.31343 0 6.38806 0V2.84585C3.52239 2.84585 2.98507 6.28459 2.98507 8.47826H6.44776V15H0Z" fill="white" />
        </svg>
      </div>

      {/* 인용구 */}
      <div className="w-full ml-[36px] mb-[24px]">
        <div className="text-center">
          <p className="leading-relaxed text-left title-xl">
            지출하고 남은
            <br />
            돈을 저축하지 말고,
            <br />
            저축하고 남은
            <br />
            돈을 써라.
          </p>
        </div>
      </div>

      {/* 워런 버핏 */}
      <div className="text-gray-5 mb-16 ml-[36px] body-md"> {/* 좌측 정렬 */}
        워런 버핏 (Warren Buffett)
      </div>

      {/* 하단 MOAYONG */}
      <div className="text-center text-gray-10 absolute bottom-4 w-full body-sm">
        ©MOAYONG
      </div>
    </div>
  );
};

export default SplashPage;
