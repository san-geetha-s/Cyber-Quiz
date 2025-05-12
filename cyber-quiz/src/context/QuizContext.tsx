// src/context/QuizContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { questions } from "@/data/questions";

interface QuizContextType {
  questions: typeof questions;
  currentQuestionIndex: number;
  submitAnswer: (index: number) => void;
  isQuizFinished: boolean;
  feedback: string;
  explanation: string;
  correctAnswers: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const submitAnswer = (index: number) => {
    const correctIndex = questions[currentQuestionIndex].answer;

    if (index === correctIndex) {
      setCorrectAnswers(correctAnswers + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

    setExplanation(questions[currentQuestionIndex].explanation);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        submitAnswer,
        isQuizFinished,
        feedback,
        explanation,
        correctAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
