import { useState } from "react";
import { summarizeText, generateQuiz } from "../services/api";
import Summary from "../components/Summary";
import Quiz from "../components/Quiz";
import Loader from "../components/Loader";
import FileUpload from "../components/FileUpload";

import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  Box,
  Paper,
} from "@mui/material";

function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [points, setPoints] = useState([]); // 🔥 NEW
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(5);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");

  const maxWords = 300;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const trimmed = pasted.split(/\s+/).slice(0, maxWords).join(" ");
    setText(trimmed);
  };

  const handleAction = async (type) => {
    if (!text.trim()) {
      setError("⚠️ Please enter or upload notes");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setPoints([]);
    setQuiz([]);

    try {
      // 📝 SUMMARY
      if (type === "summary") {
        const res = await summarizeText({ text });
        setSummary(res.data.summary);
      }

      // 📌 KEY POINTS (IMPORTANT FIX)
      if (type === "points") {
        const res = await summarizeText({
          text,
          type: "points",
          instruction:
            "Return only 5-8 most important bullet points. No explanation. No paragraph."
        });

        const raw = res.data.summary || "";

        const bullets = raw
          .split("\n")
          .map((p) => p.replace(/•|-|\*/g, "").trim())
          .filter((p) => p.length > 0);

        setPoints(bullets);
      }

      // 🧠 QUIZ
      if (type === "quiz") {
        const res = await generateQuiz(text, difficulty, questionCount);
        setQuiz(res.data.quiz || []);
      }

    } catch (err) {
      setError("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>

      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          MindForge
        </Typography>
        <Typography sx={{ color: "#6b7280" }}>
          Transform Notes into Intelligence
        </Typography>
      </Box>

      {/* INPUT */}
      <Paper
        sx={{
          p: 2,
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Start writing or paste notes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          sx={{
            "& textarea": {
              color: "#111827",
              fontSize: "15px",
              lineHeight: "1.6",
            },
            "& fieldset": { border: "none" },
          }}
        />

        {/* COUNTER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
            {wordCount} / {maxWords} words
          </Typography>
        </Box>
      </Paper>

      {/* FILE */}
      <FileUpload setText={setText} />

      {/* TABS */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mt: 3 }}>
        <Tab label="Summary" />
        <Tab label="Key Points" />
        <Tab label="Quiz" />
      </Tabs>

      {/* SETTINGS */}
      {tab === 2 && (
        <Box>
          <TextField
            select
            fullWidth
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Questions"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            sx={{ mt: 2 }}
          >
            {[5, 10, 15, 20].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {/* BUTTONS */}
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        {tab === 0 && (
          <Button variant="contained" onClick={() => handleAction("summary")}>
            Generate Summary
          </Button>
        )}

        {tab === 1 && (
          <Button variant="outlined" onClick={() => handleAction("points")}>
            Key Points
          </Button>
        )}

        {tab === 2 && (
          <Button variant="contained" color="secondary" onClick={() => handleAction("quiz")}>
            Generate Quiz
          </Button>
        )}
      </Stack>

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* LOADER */}
      {loading && <Loader />}

      {/* OUTPUT */}
      <Box mt={3}>
        {tab === 0 && summary && <Summary summary={summary} />}

        {tab === 1 && points.length > 0 && (
          <Box>
            <h2>📌 Key Points</h2>
            <ul>
              {points.map((p, i) => (
                <li key={i} style={{ marginBottom: "6px" }}>
                  {p}
                </li>
              ))}
            </ul>
          </Box>
        )}

        {tab === 2 && quiz.length > 0 && <Quiz quiz={quiz} />}
      </Box>

    </Container>
  );
}

export default Home;