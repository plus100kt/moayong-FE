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
    <div className="flex flex-col space-y-2">
      <button onClick={handleGoogleLogin}>Google로 시작하기</button>
      <button onClick={handleKakaoLogin}>Kakao로 시작하기</button>
      <button onClick={handleNaverLogin}>Naver로 시작하기</button>
    </div>
  );
};

export default OAuthButtons;
