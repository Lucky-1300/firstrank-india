import { fetchQuestions } from "../services/exam.service.js";

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

export { getQuestions };