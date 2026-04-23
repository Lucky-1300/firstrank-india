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
  let score = 0;
  let categoryScore = {};

  console.log("ANSWERS FROM FRONTEND:", answers);

  for (const ans of answers) {
    const question = await Question.findById(ans.questionId);



    if (!question) {
     
      continue;
    }

    if (String(question.correctAnswer).trim() === String(ans.selectedOption).trim()) {
      score++;

      const category = question.category;
      categoryScore[category] = (categoryScore[category] || 0) + 1;
    }
  }

  return {
    score,
    total: answers.length,
    categoryScore,
  };
};
export { fetchQuestions, evaluateExam };