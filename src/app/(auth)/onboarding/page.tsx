'use client'

import OnboardingSlider from "src/_components/OnboardingSlider";

const OnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>온보딩</h1>
      <OnboardingSlider />
    </div>
  );
};

export default OnboardingPage;
