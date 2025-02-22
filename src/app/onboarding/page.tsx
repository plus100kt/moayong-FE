"use client";

import { useEffect, useState } from "react";

const Onboarding = () => {
  const [alertText, setAlertText] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setAlertText("이것은 나중에 렌더링 될 것이다.");
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="gray-0">온보딩</h1>
      <h2>모아용 온보딩 페이지, 아주 친절하지.</h2>
      <h2>{alertText}</h2>
    </div>
  );
};

export default Onboarding;
