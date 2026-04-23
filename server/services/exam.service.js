import Question from "../models/question.model.js";

const fetchQuestions = async () => {
  // 1. Fetch all questions
  let questions = await Question.find();

  // 2. Shuffle questions (random order)
  questions = questions.sort(() => Math.random() - 0.5);

  // 3. Limit to 50 questions
  questions = questions.slice(0, 50);

  // 4. Hide correct answers
  const safeQuestions = questions.map((q) => ({
    _id: q._id,
    question: q.question,
    options: q.options,
    // correctAnswer is NOT sent
  }));

  return safeQuestions;
};

export { fetchQuestions };