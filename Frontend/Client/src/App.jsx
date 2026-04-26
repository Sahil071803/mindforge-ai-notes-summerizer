import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppHeader from "./components/AppHeader";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  const [darkMode] = useState(false); // future toggle

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#0b0f19" : "#f5f7fb",
            paper: darkMode ? "#111827" : "#ffffff",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      {!hideNavbar && <AppHeader />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;