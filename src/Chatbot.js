import React, { useState } from "react";
import "./Chatbot.css"; // Import the CSS file

const API_URL = "https://1af4-35-247-8-134.ngrok-free.app/generate-plot";

// Chatbot Component
const Chatbot = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [moviePlot, setMoviePlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMoviePlot = async (prompt) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie plot. Please try again.");
      }

      const data = await response.json();
      return data.generated_plot;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };

  const handleGeneratePlot = async () => {
    if (!userPrompt.trim()) {
      setError("Please enter a movie subject or context!");
      return;
    }

    setLoading(true);
    setError("");
    setMoviePlot("");

    try {
      const plot = await fetchMoviePlot(userPrompt);
      setMoviePlot(plot);
    } catch (err) {
      setError("Error: Could not fetch the movie plot. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">🎥 Movie Plot Generator 🎥</h2>
      <p className="chatbot-description">
        Enter a subject or context for a movie plot, and the AI will generate a story!
      </p>

      <input
        type="text"
        className="chatbot-input"
        placeholder="Enter a movie subject..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      <button className="chatbot-button" onClick={handleGeneratePlot}>
        {loading ? "Generating..." : "Generate Plot"}
      </button>

      {error && <p className="chatbot-error">{error}</p>}

      <div className="chatbot-output">
        {loading && <p className="chatbot-loading">Generating movie plot... 🎬</p>}
        {moviePlot && (
          <>
            <h3>Generated Movie Plot:</h3>
            <p>{moviePlot}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
