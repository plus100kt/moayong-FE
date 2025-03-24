"use client";

import { TopBarWithBackButton } from "src/_components/TopBarWithBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showQuiz, submitQuiz } from "src/_api/api";

import deco from "src/assets/images/icon-deco.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "src/_lib/utils";
import { useAuth } from "src/_hooks/auth";

export default function ProblemDetail() {
  const { problemId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const problemIdNumber = Number(problemId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerDescription, setAnswerDescription] = useState<string>("");

  const { data: problem } = useQuery({
    queryKey: ["problem"],
    queryFn: () => showQuiz(user?.id, problemIdNumber),
    enabled: !!user?.id && !!problemId,
  });

  const {
    mutate: mutateSubmitQuiz,
    data: submitQuizData,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (answer: number) => submitQuiz(user?.id, problemIdNumber, answer),
  });

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    mutateSubmitQuiz(selectedAnswer + 1);
  };

  useEffect(() => {
    if (isSuccess) {
      if (submitQuizData.status === "CORRECT") {
        setPopupMessage("정답이에요!");
        setShowPopup(true);
        setSelectedAnswer(submitQuizData.answerNumber);
        setAnswerDescription(submitQuizData.answerDescription);
      } else {
        setPopupMessage("아쉬워요\n내일 기회가 또 있어요!!");
        setShowPopup(true);
      }
    }
  }, [isSuccess]);

  console.log(submitQuizData);
  return (
    <div className="flex flex-col min-h-screen">
      <TopBarWithBackButton title="금융퀴즈" />
      <div className="bg-white py-11 px-5  ">
        <div className="flex flex-col gap-2">
          <div className="heading-sm text-gray-80 pb-20">{problem?.problemTitle}</div>
        </div>

        <div className="flex flex-col gap-3">
          {problem?.problemOptions.map((option, index) => {
            const isSelected = submitQuizData
              ? submitQuizData.answerNumber === index
              : selectedAnswer === index;
            return (
              <button
                className={`py-5 px-5 rounded-2xl bg-gray-5 border-gray-10 border text-left ${
                  isSelected!! ? "bg-green-5 border-green-50" : ""
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <div className="text-[16px] text-gray-90 font-medium">{option}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-5 fixed bottom-0 left-0 right-0 ">
        {/* buttons */}
        {!submitQuizData ? (
          <div
            onClick={handleSubmit}
            className={cn(
              "flex justify-center py-4 w-full rounded-2xl bg-green-50 cursor-pointer",
              selectedAnswer === null ? "bg-gray-10" : "bg-green-50"
            )}
          >
            <div
              className={cn(
                "btn-primary label-lg text-white",
                selectedAnswer === null ? "bg-gray-60" : "bg-green-50"
              )}
            >
              제출하기
            </div>
          </div>
        ) : (
          <div
            onClick={() => router.push("/quiz")}
            className={cn(
              "flex justify-center py-4 w-full rounded-2xl border border-green-50 text-green-50 cursor-pointer"
            )}
          >
            목록으로 돌아가기
          </div>
        )}
        {answerDescription !== "" && (
          <div className="">
            <div className="body-md text-gray-80 rounded-2xl bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] px-6 py-4">
              {answerDescription}
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-0 w-[262px] h-[232px] rounded-[16px] flex flex-col items-center justify-end relative">
            <Image src={deco} alt="출석 완료" className="mx-auto mb-4 absolute top-[-43%]" />
            <p className="title-md text-gray-40 whitespace-pre-line">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="text-green-50 title-xs mb-[25px] mt-[33px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
