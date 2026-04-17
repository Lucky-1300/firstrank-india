import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Exam() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What is 15% of 480?",
      options: ["70", "72", "75", "78"],
      answer: 1,
    },
    {
      question: "If a train travels 60 km/hr, how far in 2.5 hours?",
      options: ["120 km", "140 km", "150 km", "160 km"],
      answer: 2,
    },
    {
      question: "Choose the synonym of Rapid",
      options: ["Slow", "Fast", "Weak", "Cold"],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(1800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  const submitExam = () => {
    navigate("/result");
  };

  const currentQuestion = questions[current];

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-4 gap-6">

        {/* Main Section */}
        <div className="lg:col-span-3 space-y-6">

          {/* Header */}
          <Card>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-500">
                  Live Test
                </p>

                <h1 className="mt-2 text-2xl sm:text-3xl font-black text-gray-900">
                  Quantitative Aptitude Test
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Question {current + 1} of {questions.length}
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-orange-50 text-orange-600 font-bold text-lg text-center min-w-[120px]">
                ⏱ {formatTime()}
              </div>
            </div>
          </Card>

          {/* Question */}
          <Card>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-8">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 space-y-4">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setAnswers({ ...answers, [current]: i })
                  }
                  className={`w-full text-left rounded-2xl border px-4 sm:px-5 py-4 transition font-medium ${
                    answers[current] === i
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 hover:border-orange-300 bg-white"
                  }`}
                >
                  <span className="mr-2 font-bold">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Button
                variant="secondary"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                fullWidth
                className="sm:w-auto"
              >
                Previous
              </Button>

              {current === questions.length - 1 ? (
                <Button
                  onClick={submitExam}
                  fullWidth
                  className="sm:w-auto"
                >
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrent(current + 1)}
                  fullWidth
                  className="sm:w-auto"
                >
                  Next Question
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          <Card>
            <h3 className="text-lg font-bold text-gray-900">
              Questions
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Navigate instantly
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3 mt-6">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-11 rounded-xl text-sm font-bold transition ${
                    current === i
                      ? "bg-orange-500 text-white"
                      : answers[i] !== undefined
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              fullWidth
              className="mt-8"
              onClick={submitExam}
            >
              Submit Now
            </Button>
          </Card>

          {/* Progress Card */}
          <Card>
            <h3 className="text-lg font-bold text-gray-900">
              Progress
            </h3>

            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span>Answered</span>
                <span>
                  {Object.keys(answers).length}/{questions.length}
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{
                    width: `${
                      (Object.keys(answers).length /
                        questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </Card>

        </div>
      </div>
    </main>
  );
}