import React from "react";

const MindForgeLogo = ({ size = 40 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      
      {/* SVG Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
      >
        <defs>
          <linearGradient id="mf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Brain (left) */}
        <path
          d="M110 50c-30 0-50 20-50 50s20 50 50 50"
          stroke="url(#mf)"
          strokeWidth="6"
          fill="none"
        />

        {/* Book (right) */}
        <path
          d="M130 50c30 0 50 20 50 50s-20 50-50 50"
          fill="url(#mf)"
        />

        {/* dots */}
        <circle cx="180" cy="60" r="4" fill="#8B5CF6" />
        <circle cx="200" cy="80" r="4" fill="#06B6D4" />
      </svg>

      {/* Text */}
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontWeight: "700",
            fontSize: "18px",
            background: "linear-gradient(90deg,#6366F1,#8B5CF6,#06B6D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MindForge
        </div>

        <div style={{ fontSize: "10px", color: "#94a3b8" }}>
          Transform Intelligence
        </div>
      </div>
    </div>
  );
};

export default MindForgeLogo;