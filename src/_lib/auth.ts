export const checkExistingUser = async (email: string): Promise<boolean> => {
  // TODO: API를 통해 사용자 정보 확인
  // 예시:
  // const response = await fetch(`/api/users?email=${email}`);
  // const data = await response.json();
  // return data.exists;

  // 임시로 모든 사용자가 존재하지 않는 것으로 처리
  return false;
};
