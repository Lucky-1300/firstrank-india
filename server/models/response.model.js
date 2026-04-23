import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  answers: [
    {
      questionId: String,
      selectedOption: String
    }
  ],
  score: Number,
  categoryScore: Object
}, { timestamps: true });

export default mongoose.model("Response", responseSchema);