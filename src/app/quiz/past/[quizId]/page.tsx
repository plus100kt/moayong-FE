"use client";

import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDailyQuizByMemberId, getMe, getSolvedQuiz, showQuiz, submitQuiz } from "src/_api/api";

import deco from "src/assets/images/icon-deco.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "src/_lib/utils";

export default function PastQuizDetail() {
  const { quizId } = useParams();
  console.log(quizId);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const router = useRouter();

  const quizIdNumber = Number(quizId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>("");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });

  const { data: quiz } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getSolvedQuiz(user?.id, quizIdNumber),
    enabled: !!user?.id && !!quizIdNumber,
  });
  console.log(quiz);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="금융퀴즈" />
      <div className="bg-white py-11 px-5  ">
        <div className="flex flex-col gap-2">
          <div className="heading-sm text-gray-80 pb-20">{quiz?.financeTitle}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="body-md text-gray-80 rounded-2xl bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] px-6 py-4">
            {quiz?.financeDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
