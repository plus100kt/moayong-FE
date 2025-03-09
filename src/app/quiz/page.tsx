"use client";

import { Callout } from "src/_components/Callout";
import { QuizListItem } from "./_components/QuizListItem";
import { Arrow } from "src/components/common/Icons/Arrow";
import { useRouter } from "next/navigation";

export default function Quiz() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[50px] border-b border-[#CDD1D5] relative flex justify-center items-center">
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <Arrow variant="left" />
        </div>
        <div className="title-sm">금융 지식</div>
      </div>
      <div className="bg-white py-6 px-5 ">
        <section className="pb-8">
          <div className="flex flex-col gap-2">
            {/* -- Callout --- */}
            <Callout variant="warning">
              <div>
                <p>퀴즈를 응시하면 티어 점수가 올라가요.</p>
                <p>퀴즈는 하루에 5번까지 응시가 가능해요.</p>
              </div>
            </Callout>
            <Callout variant="info">
              <div>[리그 공지] 승급심사까지 2시간 30분 남았어요!</div>
            </Callout>
          </div>
        </section>
        <section>
          <h3 className="title-sm text-gray-90 pb-4">하루 3분 금융지식 알아가기</h3>
          <ul className="flex flex-col gap-2">
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
            <QuizListItem text="분산 투자란 무엇인가요?" onClick={() => {}} />
          </ul>
        </section>
        <div className="px-5 py-5 fixed bottom-0 left-0 right-0 bg-white">
          <div className="flex justify-center py-4 w-full rounded-2xl bg-gray-10">
            <button className="btn-primary label-lg">다음 퀴즈는 내일 9시에 공개돼요 🔒</button>
          </div>
        </div>
      </div>
    </div>
  );
}
