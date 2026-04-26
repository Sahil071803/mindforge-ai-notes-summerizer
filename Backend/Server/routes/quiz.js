const express = require("express");
const router = express.Router();

const { generateQuiz } = require("../controllers/quizController");
const validateRequest = require("../middleware/validateRequest");

router.post("/", validateRequest(["text"]), generateQuiz);

module.exports = router;