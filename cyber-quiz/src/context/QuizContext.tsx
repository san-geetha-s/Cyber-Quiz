"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { questions } from "@/data/questions";

interface QuizContextType {
  questions: typeof questions;
  currentQuestionIndex: number;
  submitAnswer: (index: number | null) => void;
  isQuizFinished: boolean;
  feedback: string;
  explanation: string;
  correctAnswers: number;
  timeLeft: number;
  selectedAnswer: number | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswering, setIsAnswering] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const submitAnswer = (index: number | null) => {
    if (isAnswering || isQuizFinished) return;
    setIsAnswering(true);
    setSelectedAnswer(index);

    const correctIndex = questions[currentQuestionIndex].answer;

    if (index === correctIndex) {
      setCorrectAnswers((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else if (index === null) {
      setFeedback("⏰ Time's up! No answer selected.");
    } else {
      setFeedback("❌ Wrong!");
    }

    setExplanation(questions[currentQuestionIndex].explanation);

    setTimeout(() => {
      setFeedback("");
      setExplanation("");
      setIsAnswering(false);
      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(15);
      } else {
        setIsQuizFinished(true);
      }
    }, 4000);
  };

  useEffect(() => {
    if (isQuizFinished || isAnswering) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          submitAnswer(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswering, isQuizFinished]);

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
        timeLeft,
        selectedAnswer,
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
