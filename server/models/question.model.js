import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["mcq", "subjective"],
      required: true,
    },

    options: {
      type: [String],
      default: [],
      validate: {
        validator: function (val) {
          if (this.type === "mcq") return val.length >= 2;
          return true;
        },
        message: "MCQ must have at least 2 options",
      },
    },

    correctAnswer: {
      type: String,
      validate: {
        validator: function (val) {
          if (this.type === "mcq") return !!val;
          return true;
        },
        message: "MCQ must have correct answer",
      },
    },

    category: {
      type: String,
      enum: ["Logic", "Decision", "Finance", "Leadership"],
      required: true,
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    marks: {
      type: Number,
      default: 1,
    },

    timeLimit: {
      type: Number,
      default: 60,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;