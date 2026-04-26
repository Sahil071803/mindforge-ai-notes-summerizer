const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 10,
    },

    percentage: {
      type: Number,
    },
  },
  { timestamps: true }
);

// 🔥 Auto calculate percentage
scoreSchema.pre("save", function (next) {
  if (this.totalQuestions > 0) {
    this.percentage = ((this.score / this.totalQuestions) * 100).toFixed(2);
  }
  next();
});

module.exports = mongoose.model("Score", scoreSchema);