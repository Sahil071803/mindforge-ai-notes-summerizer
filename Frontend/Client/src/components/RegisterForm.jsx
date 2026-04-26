import { TextField, Button, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function RegisterForm({ form, handleChange, handleSubmit }) {
  return (
    <Paper style={{ padding: 25, maxWidth: 400, margin: "100px auto" }}>
      <Typography variant="h6" align="center">
        Register
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        margin="normal"
        value={form.name}
        onChange={handleChange}
      />

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
        Register
      </Button>

      {/* 👇 Login Button */}
      <Button
        fullWidth
        variant="outlined"
        component={Link}
        to="/login"
        style={{ marginTop: 10 }}
      >
        Already have account? Login
      </Button>
    </Paper>
  );
}

export default RegisterForm;