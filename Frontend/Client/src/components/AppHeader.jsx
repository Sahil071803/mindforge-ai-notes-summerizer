import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch {
    user = null;
  }

  const displayName =
    user?.name || user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    if (!window.confirm("Logout?")) return;
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LOGO */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              color: "#111827",
              letterSpacing: "-0.5px",
            }}
          >
            MindForge
          </Typography>
        </Box>

        {/* NAV LINKS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {["Home", "Dashboard", "History"].map((item) => (
            <Button
              key={item}
              component={Link}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              sx={{
                textTransform: "none",
                color: "#374151",
                fontWeight: 500,
                borderRadius: "10px",
                "&:hover": {
                  background: "#f3f4f6",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        {/* USER */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "#111827", width: 32, height: 32 }}>
              {displayName.charAt(0).toUpperCase()}
            </Avatar>

            <Typography sx={{ fontSize: "14px", color: "#111827" }}>
              {displayName}
            </Typography>

            <Button
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                color: "#ef4444",
                fontWeight: 500,
                "&:hover": { background: "#fee2e2" },
              }}
            >
              Logout
            </Button>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;