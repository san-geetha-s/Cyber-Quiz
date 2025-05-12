// src/app/quiz/page.tsx
"use client";

import { useQuizContext } from "@/context/QuizContext";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function QuizPage() {
  const {
    questions,
    currentQuestionIndex,
    submitAnswer,
    isQuizFinished,
    feedback,
    explanation,
    correctAnswers,
  } = useQuizContext();

  const router = useRouter(); // Initialize the router

  const currentQuestion = questions[currentQuestionIndex];

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

          <div className="mt-4">
            <p className="text-lg font-medium text-gray-700">
              Well done! Keep up the good work and keep learning.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              You've completed the quiz. If you want to try again or share your results, feel free to go ahead!
            </p>
          </div>

          {/* Try Again Button with Navigation */}
          <button
            onClick={() => router.push("/")} // Redirect to the home or start quiz page
            className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 hover:from-cyan-600 hover:to-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {currentQuestion.question}
        </h2>

        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={() => submitAnswer(index)}
            >
              {option}
            </button>
          ))}
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
