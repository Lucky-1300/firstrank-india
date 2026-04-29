import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "examState";

export default function Exam() {
  const navigate = useNavigate();

  
  const [questions, setQuestions] = useState([]);

  const [result, setResult] = useState(null);




  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const totalQuestions = 45;
  const totalQuestions = questions.length;


// FETCH QUESTIONS
useEffect(() => {
  fetch("http://localhost:3000/api/exam/questions")
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data?.data);
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  console.log(questions);
}, [questions]);



  // LOAD STATE
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

  
    if (saved?.hasStarted && saved?.deadline) {
      setHasStarted(true);
      setAnswers(saved.answers || {});
      setCurrent(saved.current || 0);
      setDeadline(saved.deadline);

      const remaining = Math.max(0, Math.floor((saved.deadline - Date.now()) / 1000));
      setTimeLeft(remaining);
    } else {
      setHasStarted(false);
      setAnswers(saved?.answers || {});
      setCurrent(saved?.current || 0);
      setDeadline(null);
      setTimeLeft(1800);
    }
  }, []);

  // TIMER
  useEffect(() => {
      if (!hasStarted || !deadline) return;


    setTimeLeft(Math.floor((deadline - Date.now()) / 1000));

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
  }, [deadline, hasStarted]);

  // SAVE STATE
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, current, deadline, hasStarted })
    );
  }, [answers, current, deadline, hasStarted]);

  const startExam = () => {
    if (hasStarted) return;
    const newDeadline = Date.now() + 1800 * 1000;
    setCurrent(0);
    setAnswers({});
    setDeadline(newDeadline);
    setTimeLeft(1800);
    setHasStarted(true);
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };


  const calculateScore = () => {
  if (!questions.length) return 0;

  let score = 0;

  questions.forEach((q, i) => {
    if (
      answers[i] !== undefined &&
      q.correctAnswer === q.options[answers[i]]
    ) {
      score++;
    }
  });

  return Math.round((score / questions.length) * 100);
};

const submitExam = () => {
  if (isSubmitted) return;
setIsSubmitted(true)
  const score = calculateScore();

  const payload = {
    answers: questions
      .map((question, i) => {
        if (answers[i] === undefined) return null;

        return {
          questionId: question._id,
          selectedOption: question.options[answers[i]],
        };
      })
      .filter(Boolean),
    score,
    timeTaken: 1800 - timeLeft,
  };

  const token = localStorage.getItem("authToken");

  console.log("TOKEN:", token);
  console.log("PAYLOAD:", payload);

  fetch("http://localhost:3000/api/exam/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Submit response:", data);

      if (!data.success) return;

      // ✅ TOKEN se userId nikaal rahe
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      // const userId = tokenData.id;
      const userId = localStorage.getItem("userId");

      setTimeout(() => {
        fetch(`http://localhost:3000/api/result/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((resultData) => {
            console.log("Result API:", resultData);

            if (!resultData.success) return;

            setResult(resultData.data);

            localStorage.removeItem("examState");

            navigate("/result", {
              state: resultData.data.report,
            });
          });
      }, 1500);
    })
    .catch((err) => console.log(err));
  };

  if (!hasStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 py-6 sm:py-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="bg-white dark:bg-slate-900 border-2 border-orange-100 dark:border-slate-800 shadow-xl p-8 sm:p-10 text-center">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Exam Instructions</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              Ready to start your test?
            </h1>
            <p className="mt-4 text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-8">
              The timer will start only when you click Start Exam. You will get 30 minutes and can navigate across questions using the palette.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
              <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Total Questions</p>
                <p className="text-2xl font-black text-orange-600 mt-1">{questions.length || totalQuestions}</p>
              </div>
              <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Duration</p>
                <p className="text-2xl font-black text-orange-600 mt-1">30 min</p>
              </div>
              <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Navigation</p>
                <p className="text-2xl font-black text-orange-600 mt-1">Flexible</p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                onClick={startExam}
                disabled={!questions.length}
                className="min-w-52"
              >
                {questions.length ? "Start Exam" : "Loading Questions..."}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 py-6 sm:py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-4 gap-4 sm:gap-6">

        {/* LEFT - Main Content */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">

          {/* Header Card with Timer */}
          <Card className="bg-white dark:bg-slate-900 border-2 border-orange-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">
                  Question {current + 1} of {questions.length}
                </p>
                <h1 className="mt-1 text-xl sm:text-2xl font-black text-gray-900 dark:text-white transition-colors duration-300">
                  Test in Progress
                </h1>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 rounded-lg border border-orange-200 dark:border-orange-500/20 transition-colors duration-300">
                <Clock className="text-orange-500" size={20} />
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-slate-400 transition-colors duration-300">Time Left</p>
                  <p className="text-2xl font-black text-orange-600">
                    {formatTime()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Question Card */}
          <Card className="bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="border-b border-gray-200 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-relaxed transition-colors duration-300">
                {/* {questions[current].question} */}
                {questions[current]?.question || "Loading question..."}
              </h2>
            </div>

            {/* Options with Radio Style */}
            <div className="space-y-3 mb-8">
              {questions[current]?.options?.map((opt, i) => {
                const selected = answers[current] === i;

                return (
                  <label
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${
                        selected
                            ? "bg-orange-50 dark:bg-orange-500/10 border-orange-500 shadow-md"
                            : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-slate-700"
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
                    <span className="text-base sm:text-lg font-medium text-gray-900 dark:text-slate-100 flex-1 leading-relaxed transition-colors duration-300">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <Button
                variant="secondary"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className="w-full sm:w-auto"
              >
                ← Previous
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
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
        <Card className="bg-white dark:bg-slate-900 shadow-md sticky top-6 h-fit hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg transition-colors duration-300">Questions</h3>
            <span className="text-xs font-semibold bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full transition-colors duration-300">
              {Object.keys(answers).length}/{totalQuestions}
            </span>
          </div>

          {/* Question Grid Palette */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const answered = answers[i] !== undefined;
              const isCurrent = current === i;
              const available = i < questions.length;

              return (
                <button
                  key={i}
                  onClick={() => available && setCurrent(i)}
                  disabled={!available}
                    className={`h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105
                    ${
                      isCurrent
                        ? "bg-orange-500 text-white shadow-lg ring-2 ring-orange-300"
                        : answered
                        ? "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-500/25"
                        : available
                        ? "bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed"
                    }
                  `}
                  title={`Question ${i + 1}${answered ? " (Answered)" : available ? " (Not answered)" : " (Unavailable)"}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs border-t border-gray-200 dark:border-slate-800 pt-4 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500" />
              <span className="text-gray-700 dark:text-slate-300">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-500/15 border border-green-300 dark:border-green-400/20" />
              <span className="text-gray-700 dark:text-slate-300">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-200 dark:bg-slate-700" />
              <span className="text-gray-700 dark:text-slate-300">Not Answered</span>
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