'use client';

import { useRouter } from 'next/navigation';
import OAuthButtons from 'src/_components/auth/OAuthButtons';
import { checkExistingUser } from 'src/_lib/auth';

const LoginPage = () => {
  const router = useRouter();

  const handleOAuthLoginSuccess = async (user: any) => {
    // OAuth 로그인 성공 후 로직
    const isExistingUser = await checkExistingUser(user.email);

    if (isExistingUser) {
      // 이미 가입된 사용자인 경우 메인 페이지로 리다이렉트
      router.push('/home/home');
    } else {
      // 가입되지 않은 사용자인 경우 회원가입 정보 입력 페이지로 리다이렉트
      router.push('/register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>로그인</h1>
      <OAuthButtons onSuccess={handleOAuthLoginSuccess} />
    </div>
  );
};

export default LoginPage;
