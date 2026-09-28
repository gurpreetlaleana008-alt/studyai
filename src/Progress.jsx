import { useEffect, useState } from "react";

function Progress() {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("studyAI_quizResults")
      ) || [];

    setQuizResults(saved);
  }, []);

  const totalQuizzes = quizResults.length;

  const totalQuestions = quizResults.reduce(
    (total, item) => total + item.totalQuestions,
    0
  );

  const totalCorrect = quizResults.reduce(
    (total, item) => total + item.correctAnswers,
    0
  );

  const accuracy =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect / totalQuestions) * 100
        )
      : 0;

  const bestScore =
    quizResults.length > 0
      ? Math.max(
          ...quizResults.map(
            (item) => item.percentage
          )
        )
      : 0;

  const clearProgress = () => {
    if (
      !window.confirm(
        "Are you sure you want to clear your progress?"
      )
    ) {
      return;
    }

    localStorage.removeItem("studyAI_quizResults");
    setQuizResults([]);
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
            📊 PROGRESS
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-2px",
              marginBottom: "15px",
            }}
          >
            Your Learning Progress
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
            }}
          >
            Track your quiz performance and learning journey.
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <div style={{ fontSize: "30px" }}>📝</div>

            <p
              style={{
                color: "#6b7280",
                marginTop: "15px",
              }}
            >
              Quizzes Completed
            </p>

            <h2 style={{ marginTop: "5px" }}>
              {totalQuizzes}
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <div style={{ fontSize: "30px" }}>📚</div>

            <p
              style={{
                color: "#6b7280",
                marginTop: "15px",
              }}
            >
              Questions Attempted
            </p>

            <h2 style={{ marginTop: "5px" }}>
              {totalQuestions}
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <div style={{ fontSize: "30px" }}>🎯</div>

            <p
              style={{
                color: "#6b7280",
                marginTop: "15px",
              }}
            >
              Accuracy
            </p>

            <h2
              style={{
                marginTop: "5px",
                color: "#2563eb",
              }}
            >
              {accuracy}%
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "25px",
            }}
          >
            <div style={{ fontSize: "30px" }}>🏆</div>

            <p
              style={{
                color: "#6b7280",
                marginTop: "15px",
              }}
            >
              Best Score
            </p>

            <h2
              style={{
                marginTop: "5px",
                color: "#16a34a",
              }}
            >
              {bestScore}%
            </h2>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            padding: "28px",
            marginTop: "25px",
          }}
        >
          <h2>📈 Quiz History</h2>

          {quizResults.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
              }}
            >
              <div style={{ fontSize: "55px" }}>
                📊
              </div>

              <h3 style={{ marginTop: "15px" }}>
                No quiz progress yet
              </h3>

              <p
                style={{
                  color: "#9ca3af",
                  marginTop: "8px",
                }}
              >
                Complete a quiz to see your progress here.
              </p>

              <button
                onClick={() => {
                  window.location.href = "/quiz";
                }}
                style={{
                  marginTop: "20px",
                  border: "none",
                  background: "#2563eb",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                📝 Take a Quiz
              </button>
            </div>
          ) : (
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gap: "12px",
              }}
            >
              {quizResults
                .slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3>
                        {item.subject || "Quiz"}
                      </h3>

                      <p
                        style={{
                          color: "#6b7280",
                          marginTop: "5px",
                          fontSize: "14px",
                        }}
                      >
                        {item.topic} •{" "}
                        {item.date}
                      </p>
                    </div>

                    <div
                      style={{
                        fontWeight: "800",
                        color:
                          item.percentage >= 70
                            ? "#16a34a"
                            : "#dc2626",
                      }}
                    >
                      {item.correctAnswers}/
                      {item.totalQuestions} (
                      {item.percentage}%)
                    </div>
                  </div>
                ))}
            </div>
          )}

          {quizResults.length > 0 && (
            <button
              onClick={clearProgress}
              style={{
                marginTop: "25px",
                border: "1px solid #fecaca",
                background: "#ffffff",
                color: "#dc2626",
                padding: "10px 16px",
                borderRadius: "9px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              🗑️ Clear Progress
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

export default Progress;