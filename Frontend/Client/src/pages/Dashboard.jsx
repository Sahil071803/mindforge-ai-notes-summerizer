import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Fade,
  Box,
} from "@mui/material";
import { getScores } from "../services/api";
import ScoreChart from "../components/ScoreChart";

function Dashboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await getScores();
        const data = res.data.data || [];
        setScores(data);
      } catch (err) {
        console.error("Score fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  // 📊 calculations
  const total = scores.length;

  const avg =
    total > 0
      ? (
          scores.reduce((a, b) => a + (b.score || 0), 0) / total
        ).toFixed(2)
      : 0;

  const lastScore = total > 0 ? scores[0]?.score : 0;

  const bestScore =
    total > 0 ? Math.max(...scores.map((s) => s.score)) : 0;

  // 🔄 Loader
  if (loading) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* 🔥 Title */}
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📊 Dashboard
      </Typography>

      {/* 🔥 Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="Attempts" value={total} delay={0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Avg Score" value={avg} delay={200} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Last Score" value={lastScore} delay={400} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Best Score" value={bestScore} delay={600} />
        </Grid>
      </Grid>

      {/* 🔥 Chart Section */}
      {scores.length > 0 && (
        <Fade in timeout={800}>
          <Box>
            <ScoreChart scores={scores} />
          </Box>
        </Fade>
      )}
    </Container>
  );
}

// 🔥 Animated Stat Card
function StatCard({ title, value, delay }) {
  return (
    <Fade in timeout={600 + delay}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 8,
          },
        }}
      >
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default Dashboard;