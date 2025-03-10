import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const OnboardingSlider = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/onboarding/1.png',
    '/images/onboarding/2.png',
    '/images/onboarding/3.png',
  ]; // 온보딩 이미지 경로

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // 2초마다 이미지 변경

    // 마지막 이미지 후 메인 페이지로 리다이렉트
    if (currentImageIndex === images.length - 1) {
      clearInterval(timer);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [currentImageIndex, images.length, router]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src={images[currentImageIndex]}
        alt={`Onboarding ${currentImageIndex + 1}`}
        width={300} // 적절한 width 값 설정
        height={400} // 적절한 height 값 설정
      />
    </div>
  );
};

export default OnboardingSlider;
