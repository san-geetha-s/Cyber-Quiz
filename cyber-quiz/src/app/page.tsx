// src/app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">🛡️ Cybersecurity Awareness Quiz</h1>
        <p className="text-lg text-gray-600">
          Test your knowledge and learn how to stay safe online.
        </p>

        <Link href="/quiz">
          <button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded shadow-lg transition duration-300"
          >
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
}
