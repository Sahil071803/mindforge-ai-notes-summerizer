const express = require("express");
const router = express.Router();

const {
  getScores,
  addScore,
} = require("../controllers/scoresController");

router.get("/", getScores);
router.post("/", addScore);

module.exports = router;