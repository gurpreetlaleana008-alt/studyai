import { useState } from "react";
import "./AINotes.css";

function AINotes() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("Any Class");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("Detailed");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = () => {
    if (!subject.trim() || !topic.trim()) {
      alert("Please enter subject and topic.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const generatedNotes = `
${topic}

Subject: ${subject}
Class: ${classLevel}

Overview

${topic} is an important topic in ${subject}. These notes are designed to help you understand the main concepts clearly and prepare for exams.

Key Concepts

• Understand the basic meaning and definition of ${topic}.
• Learn the important terms related to the topic.
• Remember the major concepts and relationships.
• Focus on examples and applications.
• Revise important points before the exam.

Important Points

1. Learn the basic definition carefully.
2. Understand the concept instead of memorizing everything.
3. Connect the topic with related concepts.
4. Practice important questions.
5. Revise the topic regularly.

Exam Preparation

• Learn important definitions.
• Practice short-answer questions.
• Prepare long-answer questions.
• Review important diagrams or examples where applicable.
• Revise the topic before the examination.

Quick Revision

${topic} can be understood by focusing on its definition, key concepts, important points, examples, and exam-related questions.

Note

These are demonstration notes. Real AI-generated, topic-specific notes will be connected later.
      `.trim();

      setNotes(generatedNotes);
      setLoading(false);
    }, 700);
  };

  const copyNotes = async () => {
    if (!notes) return;

    await navigator.clipboard.writeText(notes);
    alert("Notes copied successfully.");
  };

  const saveNotes = () => {
    if (!notes) return;

    const savedNotes =
      JSON.parse(localStorage.getItem("studyAI_savedNotes")) || [];

    savedNotes.push({
      id: Date.now(),
      subject,
      topic,
      notes,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "studyAI_savedNotes",
      JSON.stringify(savedNotes)
    );

    alert("Notes saved successfully.");
  };

  const downloadNotes = () => {
    if (!notes) return;

    const blob = new Blob([notes], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${topic || "StudyAI-Notes"}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="notes-page">
      <header className="notes-navbar">
        <button
          className="notes-home-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Home
        </button>

        <div className="notes-logo">🎓 StudyAI</div>
      </header>

      <main className="notes-container">
        <div className="notes-heading">
          <div className="notes-badge">
            🤖 AI NOTES
          </div>

          <h1>Create Smart Study Notes</h1>

          <p>
            Enter your subject and topic to create organized
            study notes with StudyAI.
          </p>
        </div>

        <section className="notes-workspace">
          <div className="notes-form">
            <h2>📚 Study Details</h2>

            <label>Subject</label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Example: Biology"
            />

            <label>Topic</label>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Photosynthesis"
            />

            <label>Class / Level</label>

            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
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
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Punjabi</option>
              <option>Punjabi-English</option>
            </select>

            <label>Notes Style</label>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option>Detailed</option>
              <option>Quick Revision</option>
              <option>Exam Focused</option>
              <option>Step-by-step</option>
            </select>

            <button
              className="generate-btn"
              onClick={generateNotes}
              disabled={loading}
            >
              {loading
                ? "⏳ Generating..."
                : "✨ Generate Notes"}
            </button>
          </div>

          <div className="notes-result">
            <div className="result-header">
              <div>
                <h2>📖 Your Notes</h2>

                <p>
                  Your generated study material will appear here.
                </p>
              </div>
            </div>

            <div className="notes-paper">
              {notes ? (
                <pre>{notes}</pre>
              ) : (
                <div className="empty-notes">
                  <div>📚</div>

                  <h3>No notes yet</h3>

                  <p>
                    Enter a subject and topic, then click
                    Generate Notes.
                  </p>
                </div>
              )}
            </div>

            {notes && (
              <div className="notes-actions">
                <button onClick={copyNotes}>
                  📋 Copy
                </button>

                <button onClick={saveNotes}>
                  💾 Save
                </button>

                <button onClick={downloadNotes}>
                  📥 Download
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AINotes;