"use client";

import { useState } from "react";

export default function Home() {
  const [expression, setExpression] = useState<string>("");
  const [language, setLanguage] = useState<string>("korean");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchExpression = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/expression?language=${language}`);
    const data = await response.json();
    setExpression(data.expression);
    setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hahajoonjoon") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border rounded p-2 mr-4"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Daily Japanese Expression</h1>
      <div className="mt-4">
        <label className="mr-2">Choose Translation Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1 bg-black text-white"
        >
          <option value="korean">Korean</option>
          <option value="english">English</option>
        </select>
      </div>
      <button
        onClick={fetchExpression}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Get New Expression
      </button>
      <div className="mt-6 p-4 bg-gray-800 rounded whitespace-pre-line">
        {isLoading
          ? "Loading..."
          : expression || "Click the button to get a new expression!"}
      </div>
    </div>
  );
}
