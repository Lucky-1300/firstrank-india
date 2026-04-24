import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			index: true,
		},
		answers: [
			{
				questionId: String,
				selectedOption: String,
			},
		],
		correctCount: {
			type: Number,
			default: 0,
		},
		score: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			default: 0,
		},
		timeTaken: {
			type: Number,
			default: 0,
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

const Result = mongoose.model("Result", resultSchema);

export default Result;
