import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "examState";

export default function Exam() {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What is 15% of 480?",
      options: ["70", "72", "75", "78"],
      answer: 1,
    },
    {
      id: 2,
      question: "If a train travels 60 km/hr, how far in 2.5 hours?",
      options: ["120 km", "140 km", "150 km", "160 km"],
      answer: 2,
    },
    {
      id: 3,
      question: "Choose the synonym of Rapid",
      options: ["Slow", "Fast", "Weak", "Cold"],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [deadline, setDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);

  // LOAD STATE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved) {
      setAnswers(saved.answers || {});
      setCurrent(saved.current || 0);
      setDeadline(saved.deadline);
    } else {
      const newDeadline = Date.now() + 1800 * 1000;
      setDeadline(newDeadline);
    }
  }, []);

  // TIMER
  useEffect(() => {
    if (!deadline) return;

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((deadline - Date.now()) / 1000)
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        submitExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  // SAVE STATE
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, current, deadline })
    );
  }, [answers, current, deadline]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    return Math.round((score / questions.length) * 100);
  };

  const submitExam = () => {
    const score = calculateScore();

    localStorage.removeItem(STORAGE_KEY);

    navigate("/result", {
      state: {
        score,
        answers,
        questions,
      },
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-4 gap-4 sm:gap-6">

        {/* LEFT - Main Content */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">

          {/* Header Card with Timer */}
          <Card className="bg-white border-2 border-orange-100 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">
                  Question {current + 1} of {questions.length}
                </p>
                <h1 className="mt-1 text-xl sm:text-2xl font-black text-gray-900">
                  Test in Progress
                </h1>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-3 rounded-lg border border-orange-200">
                <Clock className="text-orange-500" size={20} />
                <div className="text-right">
                  <p className="text-xs text-gray-500">Time Left</p>
                  <p className="text-2xl font-black text-orange-600">
                    {formatTime()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Question Card */}
          <Card className="bg-white shadow-md">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                {questions[current].question}
              </h2>
            </div>

            {/* Options with Radio Style */}
            <div className="space-y-3 mb-8">
              {questions[current].options.map((opt, i) => {
                const selected = answers[current] === i;
                const isCorrect = questions[current].answer === i;

                return (
                  <label
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${
                        selected
                          ? "bg-orange-50 border-orange-500 shadow-md"
                          : "bg-gray-50 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selected}
                      onChange={() => handleAnswer(current, i)}
                      className="w-6 h-6 mt-1 cursor-pointer accent-orange-500"
                    />
                    <span className="text-base sm:text-lg font-medium text-gray-900 flex-1 leading-relaxed">
                      {opt}
                    </span>
                    {selected && (
                      <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    )}
                  </label>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className="w-full sm:w-auto"
              >
                ← Previous
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <AlertCircle size={16} />
                <span>Answer all to submit</span>
              </div>

              {current === questions.length - 1 ? (
                <Button 
                  onClick={submitExam}
                  className="w-full sm:w-auto"
                >
                  Submit Test
                </Button>
              ) : (
                <Button 
                  onClick={() => setCurrent(current + 1)}
                  className="w-full sm:w-auto"
                >
                  Next →
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT - Question Palette */}
        <Card className="bg-white shadow-md sticky top-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Questions</h3>
            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              {Object.keys(answers).length}/{questions.length}
            </span>
          </div>

          {/* Question Grid Palette */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((_, i) => {
              const answered = answers[i] !== undefined;
              const isCurrent = current === i;

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105
                    ${
                      isCurrent
                        ? "bg-orange-500 text-white shadow-lg ring-2 ring-orange-300"
                        : answered
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }
                  `}
                  title={`Question ${i + 1}${answered ? " (Answered)" : " (Not answered)"}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500" />
              <span className="text-gray-700">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
              <span className="text-gray-700">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-200" />
              <span className="text-gray-700">Not Answered</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={submitExam}
            fullWidth 
            className="mt-6"
          >
            Submit Now
          </Button>
        </Card>

      </div>
    </main>
  );
}