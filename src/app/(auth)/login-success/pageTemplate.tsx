"use client";
import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMe } from "src/_api/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UserResponse } from "src/_types/type";

const LoginSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const {
    data: dataUser,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useQuery<UserResponse, AxiosError>({
    queryKey: ["get-user"],
    queryFn: () => getMe(),
    retry: false,
    enabled: role !== "ONBOARDING", // ONBOARDING이면 요청 자체를 막음
  });

  useEffect(() => {
    if (role === "ONBOARDING") {
      router.push("/register");
    }
  }, [role]);

  useEffect(() => {
    if (isUserError) {
      const statusCode = userError.response?.status;
      const errorCode = (userError.response?.data as { code?: string })?.code;
      console.log(errorCode);
      if (statusCode === 403) {
        router.push("/register");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        router.push("/login");
      }
    }
  }, [isUserError]);

  useEffect(() => {
    if (isUserSuccess) {
      router.push("/");
    }
  }, [isUserSuccess]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoaderPinwheel className="animate-spin" />
    </div>
  );
};

export default LoginSuccessPage;