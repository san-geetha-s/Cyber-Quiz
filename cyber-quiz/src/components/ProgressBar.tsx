// src/components/ProgressBar.tsx
"use client";

import { useQuizContext } from "@/context/QuizContext";

const ProgressBar = () => {
  const { currentQuestionIndex, questions } = useQuizContext();

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
      <div
        className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
