import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    setSubmittedQuestion("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmittedQuestion(data.data.question);
      setAnswer(data.data.response);
    } catch (err) {
      setError(err.message || "Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Asko</h1>
        <p className="subtitle">Ask once. Get clarity.</p>

        <form onSubmit={handleAsk} className="form">
          <textarea
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="5"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Ask AI"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {submittedQuestion && answer && (
          <div className="result">
            <h2>Your Question</h2>
            <p>{submittedQuestion}</p>

            <h2>AI Response</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;