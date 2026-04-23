import { fetchQuestions, evaluateExam } from "../services/exam.service.js";

// GET QUESTIONS (Day 6/7)
const getQuestions = async (req, res) => {
  try {
    const questions = await fetchQuestions();

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch questions",
    });
  }
};

// SUBMIT EXAM (Day 8/9 🔥)
const submitExam = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers submitted",
      });
    }

    const result = await evaluateExam(answers);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error evaluating exam",
    });
  }
};

export { getQuestions, submitExam };