import Question from "../models/question.model.js";

// GET QUESTIONS (Day 6/7)
const fetchQuestions = async () => {
  const safeQuestions = await Question.aggregate([
    {
      $match: {
        "options.0": { $exists: true },
      },
    },
    {
      $sample: { size: 50 },
    },
    {
      $project: {
        _id: 1,
        question: 1,
        options: 1,
        category: 1,
        difficulty: 1,
      },
    },
  ]);

  return safeQuestions;
};

// EVALUATE EXAM (Day 8/9 🔥)
const evaluateExam = async (answers) => {
  const validAnswers = (answers || []).filter((answer) => answer?.questionId);

  const questionIds = [
    ...new Set(validAnswers.map((answer) => String(answer.questionId))),
  ];
  const questions = await Question.find({ _id: { $in: questionIds } })
    .select("_id category correctAnswer")
    .lean();

  const questionMap = new Map(
    questions.map((question) => [String(question._id), question]),
  );

  let correctCount = 0;
  let evaluatedCount = 0;
  const sectionScores = {};

  for (const ans of validAnswers) {
    const question = questionMap.get(String(ans.questionId));
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
    score: correctCount,
    percentage: evaluatedCount
      ? Math.round((correctCount / evaluatedCount) * 100)
      : 0,
    correctCount,
    total: evaluatedCount,
    sectionScores,
    categoryScore: Object.fromEntries(
      Object.entries(sectionScores).map(([section, value]) => [
        section,
        value.correct,
      ]),
    ),
  };
};
export { fetchQuestions, evaluateExam };
