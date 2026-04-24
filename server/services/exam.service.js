import Question from "../models/question.model.js";

// GET QUESTIONS (Day 6/7)
const fetchQuestions = async () => {
  let questions = await Question.find();

  // ✅ remove invalid questions (VERY IMPORTANT)
  questions = questions.filter(
    (q) => q.options && q.options.length > 0
  );

  // shuffle
  questions = questions.sort(() => Math.random() - 0.5);

  // limit
  questions = questions.slice(0, 50);

  // hide correct answers
  const safeQuestions = questions.map((q) => ({
    _id: q._id,
    question: q.question,
    options: q.options,
    category: q.category,
    difficulty: q.difficulty,
  }));

  return safeQuestions;
};

// EVALUATE EXAM (Day 8/9 🔥)
const evaluateExam = async (answers) => {
  let correctCount = 0;
  let evaluatedCount = 0;
  const sectionScores = {};

  for (const ans of answers) {
    const questionId = ans?.questionId;
    if (!questionId) {
      continue;
    }

    const question = await Question.findById(questionId);
    if (!question) {
      continue;
    }

    const section = question.category || "Uncategorized";

    if (!sectionScores[section]) {
      sectionScores[section] = {
        correct: 0,
        total: 0,
        attempted: 0,
        score: 0,
        percentage: 0,
      };
    }

    evaluatedCount += 1;
    sectionScores[section].total += 1;

    const selectedOption = String(ans.selectedOption ?? "").trim();
    const correctAnswer = String(question.correctAnswer ?? "").trim();
    const attempted = selectedOption.length > 0;

    if (attempted) {
      sectionScores[section].attempted += 1;
    }

    if (selectedOption === correctAnswer) {
      correctCount += 1;
      sectionScores[section].correct += 1;
    }
  }

  for (const section of Object.keys(sectionScores)) {
    const sectionResult = sectionScores[section];
    sectionResult.score = sectionResult.correct;
    sectionResult.percentage = sectionResult.total
      ? Math.round((sectionResult.correct / sectionResult.total) * 100)
      : 0;
  }

  return {
    score: evaluatedCount ? Math.round((correctCount / evaluatedCount) * 100) : 0,
    correctCount,
    total: evaluatedCount,
    sectionScores,
    categoryScore: Object.fromEntries(
      Object.entries(sectionScores).map(([section, value]) => [section, value.correct])
    ),
  };
};
export { fetchQuestions, evaluateExam };