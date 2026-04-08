"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Home() {
  const [course, setCourse] = useState("CSE 491");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, topic, question }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
      setTopic("");
      setQuestion("");
      
      // Reset after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="container">
      <header>
        <h1>Clarify</h1>
        <p className="subtitle">
          Anonymously describe your confusion before stepping into office hours. We&apos;ll synthesize questions to help TAs prepare personalized, high-yield lessons.
        </p>
      </header>

      <div className="form-card">
        {status === "success" ? (
          <div className="success-message">
            <CheckCircle size={64} />
            <h2>Submitted Successfully!</h2>
            <p>Your question has been anonymously routed to your TA&apos;s Notion dashboard.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <select 
                id="course" 
                value={course} 
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="CSE 491">CSE 491 - System Level</option>
                <option value="CSE 331">CSE 331 - Algorithms</option>
                <option value="CSE 232">CSE 232 - Intro C++</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="topic">General Topic</label>
              <input
                type="text"
                id="topic"
                placeholder="e.g. Pointers, Recursion, Memory..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="question">What are you struggling with?</label>
              <textarea
                id="question"
                rows={4}
                placeholder="I don't get why my pointer is segfaulting in this loop..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={status === "submitting" || !topic || !question}
            >
              {status === "submitting" ? (
                <>
                  <div className="loader" /> Interfacing with Notion...
                </>
              ) : (
                <>
                  <Send size={20} /> Submit Question
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
