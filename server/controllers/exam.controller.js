import { fetchQuestions, evaluateExam } from "../services/exam.service.js";
import Result from "../models/result.model.js";

// GET QUESTIONS (Day 6/7)
const getQuestions = async (req, res) => {
  try {
    const questions = await fetchQuestions();

    return res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      count: questions.length,
      data: questions,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch questions",
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// SUBMIT EXAM (Day 8/9 🔥)
const submitExam = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers submitted",
        data: null,
        error: {
          code: "BAD_REQUEST",
        },
      });
    }

    const invalidAnswer = answers.find(
      (answer) =>
        !answer ||
        !answer.questionId ||
        typeof answer.selectedOption !== "string",
    );

    if (invalidAnswer) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer payload",
        data: null,
        error: {
          code: "BAD_REQUEST",
        },
      });
    }

    const result = await evaluateExam(answers);
    const parsedTimeTaken = Number(timeTaken);
    const safeTimeTaken =
      Number.isFinite(parsedTimeTaken) && parsedTimeTaken >= 0
        ? parsedTimeTaken
        : 0;

    await Result.create({
      userId: req.user?.id,
      answers,
      correctCount: result.score,
      score: result.score,
      total: result.total,
      timeTaken: safeTimeTaken,
      sectionScores: result.categoryScore,
      categoryScore: result.categoryScore,
    });

    return res.status(200).json({
      success: true,
      message: "Exam evaluated successfully",
      data: {
        summary: {
          score: result.score,
          percentage: result.percentage,
          total: result.total,
          correct: result.correctCount,
          timeTaken: safeTimeTaken,
        },
        sections: result.sectionScores,
        categories: result.categoryScore,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error evaluating exam",
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

export { getQuestions, submitExam };
