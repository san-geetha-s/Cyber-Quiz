"use client";

import { useQuizContext } from "@/context/QuizContext";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";

export default function QuizPage() {
  const {
    questions,
    currentQuestionIndex,
    submitAnswer,
    isQuizFinished,
    feedback,
    explanation,
    correctAnswers,
    timeLeft,
    selectedAnswer,
  } = useQuizContext();

  const router = useRouter();

  if (isQuizFinished) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
        <div className="text-center bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            <span className="text-purple-600">Quiz Finished!</span>
          </h2>

          <div className="flex justify-center items-center mb-4">
            <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center">
              <FaCheckCircle className="mr-2 text-3xl text-green-400" />
              <p className="text-2xl font-bold">
                You got{" "}
                <span className="text-4xl text-indigo-300">{correctAnswers}</span> out of{" "}
                <span className="text-4xl text-indigo-300">{questions.length}</span> correct!
              </p>
            </div>
          </div>

          <p className="text-lg font-medium text-gray-700 mt-4">
            Well done! Keep up the good work and keep learning.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 hover:from-cyan-600 hover:to-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          <ProgressBar />
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p
              className={`font-semibold ${
                timeLeft <= 10 ? "text-red-600" : "text-green-600"
              }`}
            >
              ⏳ {timeLeft}s left
            </p>
          </div>
        </h2>

        <h3 className="text-xl font-semibold text-gray-800">
          {currentQuestion.question}
        </h3>

        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            let bgColor = "bg-indigo-600 hover:bg-indigo-700";

            if (selectedAnswer !== null) {
              if (index === correctIndex) {
                bgColor = "bg-green-500 text-white";
              } else if (index === selectedAnswer) {
                bgColor = "bg-red-500 text-white";
              } else {
                bgColor = "bg-gray-300 text-gray-600";
              }
            }

            return (
              <button
                key={index}
                className={`w-full p-3 rounded-md transition duration-300 font-medium ${bgColor}`}
                onClick={() => submitAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <p className="mt-4 text-lg font-medium text-gray-700">{feedback}</p>
        )}

        {explanation && (
          <div className="mt-2 p-2 bg-gray-200 rounded-md">
            <p className="text-sm text-gray-700">Explanation: {explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
