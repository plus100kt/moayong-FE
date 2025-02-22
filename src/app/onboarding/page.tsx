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
    <div className="font-sans">
      <h1 className="text-heading-lg-mobile md:text-heading-lg text-gray-90 mb-6">온보딩</h1>
      <h2 className="text-title-lg text-gray-70 mb-4">
        모아용 온보딩 페이지, 아주 친절하지.
      </h2>
      <h2 className="text-body-lg text-purple-60">{alertText}</h2>
  </div>
  );
};

export default Onboarding;
