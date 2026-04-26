import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

function ScoreChart({ scores }) {
  // convert data for chart
  const data = scores.map((item, index) => ({
    name: `Q${index + 1}`,
    score: item.score,
  }));

  return (
    <Card sx={{ mt: 4, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Score Analytics
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            {/* 🔥 Animation automatically included */}
            <Bar dataKey="score" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ScoreChart;