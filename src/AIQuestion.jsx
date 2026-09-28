import { useState } from "react";
import "./AIQuestion.css";

function AIQuestion() {
  const [question, setQuestion] = useState("");
  const [classLevel, setClassLevel] = useState("Any Class");
  const [language, setLanguage] = useState("English");
  const [answerStyle, setAnswerStyle] = useState("Detailed");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = () => {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setAnswer(
        `StudyAI Tutor Answer

Question:
${question}

Class / Level:
${classLevel}

Language:
${language}

Answer Style:
${answerStyle}

This is a demonstration answer from StudyAI.

Your question has been received successfully. The real AI model will be connected later to provide accurate, topic-specific answers, explanations, examples and step-by-step solutions.`
      );

      setLoading(false);
    }, 700);
  };

  const copyAnswer = async () => {
    if (!answer) return;

    await navigator.clipboard.writeText(answer);
    alert("Answer copied successfully.");
  };

  const saveAnswer = () => {
    if (!answer) return;

    const savedAnswers =
      JSON.parse(
        localStorage.getItem("studyAI_savedAnswers")
      ) || [];

    savedAnswers.push({
      id: Date.now(),
      question,
      answer,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "studyAI_savedAnswers",
      JSON.stringify(savedAnswers)
    );

    alert("Answer saved successfully.");
  };

  return (
    <div className="question-page">
      <header className="question-navbar">
        <button
          className="question-home-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Home
        </button>

        <div className="question-logo">
          🎓 StudyAI
        </div>
      </header>

      <main className="question-container">
        <div className="question-heading">
          <div className="question-badge">
            🧠 AI TUTOR
          </div>

          <h1>Ask StudyAI Anything</h1>

          <p>
            Ask questions, understand concepts and learn
            step-by-step with StudyAI.
          </p>
        </div>

        <section className="question-workspace">
          <div className="question-form">
            <h2>💬 Your Question</h2>

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Example: Explain photosynthesis..."
              rows="8"
            />

            <label>Class / Level</label>

            <select
              value={classLevel}
              onChange={(e) =>
                setClassLevel(e.target.value)
              }
            >
              <option>Any Class</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
              <option>College / University</option>
              <option>Other</option>
            </select>

            <label>Language</label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              <option>English</option>
              <option>Punjabi</option>
              <option>Punjabi-English</option>
            </select>

            <label>Answer Style</label>

            <select
              value={answerStyle}
              onChange={(e) =>
                setAnswerStyle(e.target.value)
              }
            >
              <option>Short</option>
              <option>Detailed</option>
              <option>Step-by-step</option>
            </select>

            <button
              className="ask-btn"
              onClick={generateAnswer}
              disabled={loading}
            >
              {loading
                ? "⏳ Thinking..."
                : "🤖 Get Answer"}
            </button>
          </div>

          <div className="answer-panel">
            <div className="answer-header">
              <h2>📖 AI Answer</h2>

              <p>
                Your answer will appear here.
              </p>
            </div>

            <div className="answer-box">
              {answer ? (
                <pre>{answer}</pre>
              ) : (
                <div className="empty-answer">
                  <div>🧠</div>

                  <h3>Ask your first question</h3>

                  <p>
                    Enter a question and click
                    Get Answer.
                  </p>
                </div>
              )}
            </div>

            {answer && (
              <div className="answer-actions">
                <button onClick={copyAnswer}>
                  📋 Copy
                </button>

                <button onClick={saveAnswer}>
                  💾 Save
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AIQuestion;