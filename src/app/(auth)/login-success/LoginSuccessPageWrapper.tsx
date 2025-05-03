"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LoginSuccessPage = dynamic(() => import("./LoginSuccessPage"), {
  ssr: false,
});

export default function LoginSuccessPageWrapper() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginSuccessPage />
    </Suspense>
  );
}