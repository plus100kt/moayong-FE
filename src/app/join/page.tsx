"use client";

import { useState } from "react";

const Join = () => {
  const [isChecked] = useState(false);

  console.log(isChecked);
  return (
    <div>
      <h1>회원가입</h1>
    </div>
  );
};

export default Join;
