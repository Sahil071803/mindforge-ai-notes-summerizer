import { TextField, Button, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function LoginForm({ form, handleChange, handleSubmit }) {
  return (
    <Paper style={{ padding: 25, maxWidth: 400, margin: "100px auto" }}>
      <Typography variant="h6" align="center">
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        margin="normal"
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        margin="normal"
        value={form.password}
        onChange={handleChange}
      />

      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Login
      </Button>

      {/* 👇 Register Button */}
      <Button
        fullWidth
        variant="outlined"
        component={Link}
        to="/register"
        style={{ marginTop: 10 }}
      >
        Create Account
      </Button>
    </Paper>
  );
}

export default LoginForm;