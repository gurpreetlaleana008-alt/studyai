import { useState } from "react";

function Save() {
  const [savedNotes, setSavedNotes] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("studyAI_savedNotes")) || []
    );
  });

  const [savedAnswers, setSavedAnswers] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("studyAI_savedAnswers")
      ) || []
    );
  });

  const deleteNote = (id) => {
    const updated = savedNotes.filter(
      (item) => item.id !== id
    );

    setSavedNotes(updated);

    localStorage.setItem(
      "studyAI_savedNotes",
      JSON.stringify(updated)
    );
  };

  const deleteAnswer = (id) => {
    const updated = savedAnswers.filter(
      (item) => item.id !== id
    );

    setSavedAnswers(updated);

    localStorage.setItem(
      "studyAI_savedAnswers",
      JSON.stringify(updated)
    );
  };

  const clearAll = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all saved material?"
      )
    ) {
      return;
    }

    setSavedNotes([]);
    setSavedAnswers([]);

    localStorage.removeItem("studyAI_savedNotes");
    localStorage.removeItem("studyAI_savedAnswers");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "60px",
      }}
    >
      <header
        style={{
          height: "72px",
          padding: "0 7%",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            border: "1px solid #d1d5db",
            background: "#ffffff",
            padding: "10px 16px",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          ← Home
        </button>

        <div
          style={{
            fontSize: "23px",
            fontWeight: "800",
          }}
        >
          🎓 StudyAI
        </div>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "60px 25px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            💾 SAVED MATERIAL
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              marginBottom: "15px",
              letterSpacing: "-2px",
            }}
          >
            Your Saved Study Material
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
            }}
          >
            Access your saved notes and AI Tutor answers anytime.
          </p>
        </div>

        {(savedNotes.length > 0 ||
          savedAnswers.length > 0) && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={clearAll}
              style={{
                border: "1px solid #fecaca",
                background: "#ffffff",
                color: "#dc2626",
                padding: "10px 16px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              🗑️ Clear All
            </button>
          </div>
        )}

        <section
          style={{
            display: "grid",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "28px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              📚 Saved Notes
            </h2>

            {savedNotes.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>
                No saved notes yet. Generate notes from AI Notes
                and click Save.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                {savedNotes.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      padding: "18px",
                    }}
                  >
                    <h3>{item.topic || "Study Notes"}</h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "5px",
                        fontSize: "13px",
                      }}
                    >
                      {item.subject} • {item.date}
                    </p>

                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        marginTop: "15px",
                        lineHeight: "1.6",
                        fontFamily: "Arial, sans-serif",
                        color: "#374151",
                      }}
                    >
                      {item.notes}
                    </pre>

                    <button
                      onClick={() => deleteNote(item.id)}
                      style={{
                        marginTop: "15px",
                        border: "1px solid #fecaca",
                        background: "#fff",
                        color: "#dc2626",
                        padding: "8px 13px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "28px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              🧠 Saved AI Answers
            </h2>

            {savedAnswers.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>
                No saved answers yet. Ask the AI Tutor a question
                and click Save.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                {savedAnswers.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      padding: "18px",
                    }}
                  >
                    <h3>Question</h3>

                    <p
                      style={{
                        marginTop: "8px",
                        fontWeight: "600",
                        lineHeight: "1.6",
                      }}
                    >
                      {item.question}
                    </p>

                    <h3 style={{ marginTop: "18px" }}>
                      Answer
                    </h3>

                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        marginTop: "8px",
                        lineHeight: "1.6",
                        fontFamily: "Arial, sans-serif",
                        color: "#374151",
                      }}
                    >
                      {item.answer}
                    </pre>

                    <p
                      style={{
                        color: "#9ca3af",
                        fontSize: "13px",
                        marginTop: "12px",
                      }}
                    >
                      Saved: {item.date}
                    </p>

                    <button
                      onClick={() => deleteAnswer(item.id)}
                      style={{
                        marginTop: "15px",
                        border: "1px solid #fecaca",
                        background: "#fff",
                        color: "#dc2626",
                        padding: "8px 13px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Save;