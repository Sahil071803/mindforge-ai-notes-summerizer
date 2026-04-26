const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    text: String,
    summary: String,
    quiz: {
      type: Array,
      default: [],
    },
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);