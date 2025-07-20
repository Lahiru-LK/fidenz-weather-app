import React from "react";
import "../styles/loadingSpinner.css";

const BeatLoader = ({ message = "" }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6",
    }}
  >
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
      <span className="beat-dot" style={{ animationDelay: "0s" }} />
      <span className="beat-dot" style={{ animationDelay: "0.1s" }} />
      <span className="beat-dot" style={{ animationDelay: "0.2s" }} />
      <span className="beat-dot" style={{ animationDelay: "0.3s" }} />
      <span className="beat-dot" style={{ animationDelay: "0.4s" }} />
      <span className="beat-dot" style={{ animationDelay: "0.5s" }} />
    </div>
    <div
      style={{
        fontSize: "1rem",
        color: "#2563eb",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  </div>
);

export default BeatLoader;
