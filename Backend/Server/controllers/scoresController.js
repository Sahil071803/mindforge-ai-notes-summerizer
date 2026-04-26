const Score = require("../models/Score");

// 🔥 GET ALL SCORES (Leaderboard)
const getScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 }) // highest first
      .limit(50);

    res.json({
      success: true,
      data: scores,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch scores",
      error: err.message,
    });
  }
};

// 🔥 ADD SCORE
const addScore = async (req, res) => {
  try {
    const { name, score, totalQuestions } = req.body;

    if (!name || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and score are required",
      });
    }

    const newScore = await Score.create({
      name,
      score,
      totalQuestions,
    });

    res.status(201).json({
      success: true,
      message: "Score saved",
      data: newScore,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save score",
      error: err.message,
    });
  }
};

module.exports = { getScores, addScore };