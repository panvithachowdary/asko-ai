import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/ai/ask";

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
      const res = await fetch(API_URL, {
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

      setSubmittedQuestion(data.data?.question || question);
      setAnswer(data.data?.response || data.answer || "No response generated.");
    } catch (err) {
      setError(err.message || "Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="background-blur blur-a"></div>
      <div className="background-blur blur-b"></div>
      <div className="background-blur blur-c"></div>

      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark"></div>
          <span className="brand-name">Asko AI</span>
        </div>

        <div className="top-pill">Single Query Assistant</div>
      </header>

      <main className="page-content">
        <section className="hero">
          <span className="hero-pill">Full-Stack Conversational AI Project</span>
          <h1>
            Ask one thing.
            <br />
            <span>Get a sharp answer.</span>
          </h1>
          <p className="hero-subtext">
            A focused AI assistant built for fast, structured responses with a
            polished full-stack experience.
          </p>
        </section>

        <section className="main-card">
          <div className="section-head">
            <div>
              <p className="section-kicker">Input</p>
              <h2>Ask your question</h2>
            </div>
          </div>

          <form onSubmit={handleAsk} className="ask-form">
            <textarea
              className="question-box"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="6"
            />

            <div className="form-footer">
              <p className="helper-text">
                One question at a time. One response per query.
              </p>

              <button type="submit" disabled={loading} className="ask-button">
                {loading ? "Generating..." : "Ask AI"}
              </button>
            </div>
          </form>

          {error && <div className="notice error-notice">{error}</div>}

          {loading && (
            <div className="loading-box">
              <div className="loader"></div>
              <div>
                <h3>Generating response</h3>
                <p>Please wait while the model processes your query.</p>
              </div>
            </div>
          )}

          {submittedQuestion && answer && !loading && (
            <div className="response-card fade-in">
              <div className="response-top">
                <span className="response-badge">Response</span>
              </div>

              <div className="question-preview">
                <span className="preview-label">Question</span>
                <p>{submittedQuestion}</p>
              </div>

              <div className="response-divider"></div>

              <div className="markdown-block">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;