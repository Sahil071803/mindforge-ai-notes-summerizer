import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { saveScore } from "../services/api"; // 🔥 API

export default function Quiz({ quiz = [] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(15);

  const currentQ = quiz[current];

  // ⏱ Timer
  useEffect(() => {
    if (submitted) return;

    if (time === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, submitted]);

  useEffect(() => {
    setTime(15);
  }, [current]);

  // 🎯 Select option
  const select = (opt) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [current]: opt }));
  };

  // 👉 Next question
  const handleNext = () => {
    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  // 🔥 SUBMIT QUIZ (SAVE TO DB)
  const submitQuiz = async () => {
    let s = 0;

    quiz.forEach((q, i) => {
      if (selected[i] === q.answer) s++;
    });

    setScore(s);
    setSubmitted(true);

    try {
      await saveScore({
        score: s,
        total: quiz.length,
      });
    } catch (err) {
      console.error("Score save error:", err);
    }
  };

  if (!quiz.length) return null;

  return (
    <Box mt={3}>
      <Typography>
        Question {current + 1}/{quiz.length} | ⏱ {time}s
      </Typography>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">{currentQ.question}</Typography>

          {currentQ.options.map((opt, i) => (
            <Button
              key={i}
              fullWidth
              variant={
                selected[current] === opt ? "contained" : "outlined"
              }
              onClick={() => select(opt)}
              sx={{ mt: 1 }}
            >
              {opt}
            </Button>
          ))}

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 2 }}
          >
            {current === quiz.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardContent>
      </Card>

      {submitted && (
        <Typography variant="h5" textAlign="center" mt={2}>
          🎯 Score: {score} / {quiz.length}
        </Typography>
      )}
    </Box>
  );
}