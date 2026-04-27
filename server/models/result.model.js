import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🔥 important
      index: true,
    },

    answers: [
      {
        questionId: {
          type: String,
          required: true,
        },
        selectedOption: {
          type: String,
          required: true,
        },
      },
    ],

    correctCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      default: 0,
      min: 0,
    },

    timeTaken: {
      type: Number,
      default: 0,
      min: 0,
    },

    sectionScores: {
      type: Object,
      default: {},
    },

    categoryScore: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

// indexes 
resultSchema.index({ userId: 1, createdAt: -1 });
resultSchema.index({ score: -1, timeTaken: 1, createdAt: 1 });

const Result = mongoose.model("Result", resultSchema);

export default Result;