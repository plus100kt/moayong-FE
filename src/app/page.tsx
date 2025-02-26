"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { usernameAtom, userAtom, isLoggedInAtom } from "src/_store/atoms";
import { useState } from "react";
import TestButton from "src/_components/TestButton";

export default function Home() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2>테스트</h2>
        <TestButton label="테스트" />
      </div>
    </div>
  );
}
