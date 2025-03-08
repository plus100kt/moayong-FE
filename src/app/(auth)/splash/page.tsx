'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from 'src/lib/utils';
import { motion } from 'framer-motion';
import icon from 'src/assets/icon-splash.svg';
import Image from 'next/image';

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

  const splashVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={cn(
        'flex flex-col items-start justify-center h-screen', // 좌측 정렬
        'bg-green-50 text-gray-0',
        loading ? 'opacity-100' : 'opacity-0 transition-opacity duration-500' // 페이드 아웃 효과
      )}
      variants={splashVariants}
      initial="initial"
      animate={loading ? 'animate' : 'exit'}
    >
      {/* 따옴표 */}
      <div className="mb-[17px] ml-[36px]">
        <Image src={icon} alt="Splash Icon" width={16} height={15} />
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
    </motion.div>
  );
};

export default SplashPage;
