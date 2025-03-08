import Image from "next/image";
import google from "src/assets/images/icon-google.png";
import kakao from "src/assets/images/icon-kakao.png";
import naver from "src/assets/images/icon-naver.png";

interface OAuthButtonsProps {
  onSuccess: (user: { email: string }) => void;
}

const OAuthButtons = ({ onSuccess }: OAuthButtonsProps) => {
  const handleGoogleLogin = async () => {
    // Google 로그인 로직
    console.log('Google 로그인');
    // TODO: Google 로그인 API 호출 및 사용자 정보 획득

    const user = { email: 'test@example.com' }; // 임시 사용자 정보
    onSuccess(user);
  };

  const handleKakaoLogin = async () => {
    // Kakao 로그인 로직
    console.log('Kakao 로그인');
    // TODO: Kakao 로그인 API 호출 및 사용자 정보 획득

    const user = { email: 'test@example.com' }; // 임시 사용자 정보
    onSuccess(user);
  };

  const handleNaverLogin = async () => {
    // Naver 로그인 로직
    console.log('Naver 로그인');
    // TODO: Naver 로그인 API 호출 및 사용자 정보 획득

    const user = { email: 'test@example.com' }; // 임시 사용자 정보
    onSuccess(user);
  };

  return (
    <div className="flex flex-col space-y-2 my-[40px]">
      <button onClick={handleGoogleLogin} className="flex items-center bg-gray-0 justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]">
        <Image src={google} alt="" />
        <p className="text-gray-80 label-md">Google로 시작하기</p>
      </button>
      <button onClick={handleKakaoLogin} className="flex items-center bg-[#FEE500] justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]">
        <Image src={kakao} alt="" />
        <p className="text-gray-80 label-md">카카오로 시작하기</p>
      </button>
      <button onClick={handleNaverLogin} className="flex items-center bg-[#03C75A] justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]">
        <Image src={naver} alt="" />
        <p className="text-gray-0 label-md">네이버로 시작하기</p>
      </button>
    </div>
  );
};

export default OAuthButtons;
