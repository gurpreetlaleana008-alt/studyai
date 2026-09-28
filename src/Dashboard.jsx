import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        setUser(currentUser);
        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const goHome = () => {
    window.location.href = "/";
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("studyAI_user");
      localStorage.removeItem("studyAI_guest");

      window.location.href = "/login";
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const getUserName = () => {
    if (user?.displayName) {
      return user.displayName;
    }

    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "StudyAI Student";
  };

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>⏳ Checking your account...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <button
          className="dashboard-home-btn"
          onClick={goHome}
        >
          ← Home
        </button>

        <div className="dashboard-logo">
          🎓 StudyAI
        </div>

        <button
          className="dashboard-logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </header>

      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <div className="welcome-content">
            <div className="dashboard-badge">
              ✨ YOUR AI LEARNING SPACE
            </div>

            <h1>
              Welcome, <span>{getUserName()}</span>
            </h1>

            <h2>
              Your Smarter Way to Learn.
            </h2>

            <p>
              Create notes, ask questions, practice quizzes,
              track your progress and learn smarter with AI.
            </p>

            <div className="welcome-buttons">
              <button
                className="welcome-primary-btn"
                onClick={() => goTo("/ai-notes")}
              >
                🚀 Start Learning
              </button>

              <button
                className="welcome-secondary-btn"
                onClick={() => goTo("/ask")}
              >
                🧠 Ask AI Tutor
              </button>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "👤"
              )}
            </div>

            <div>
              <h3>{getUserName()}</h3>

              <p>
                {user?.email}
              </p>
            </div>

            <div className="profile-status">
              ●
            </div>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <span>Saved Material</span>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <span>Quizzes</span>
            <strong>0</strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <span>Accuracy</span>
            <strong>0%</strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👑</div>
            <span>Plan</span>
            <strong>Free</strong>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              💾
            </div>

            <h2>Saved Material</h2>

            <p>
              View your saved AI notes and answers.
            </p>

            <button onClick={() => goTo("/save")}>
              View Saved Material →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              📊
            </div>

            <h2>Learning Progress</h2>

            <p>
              Check your quiz scores and learning progress.
            </p>

            <button onClick={() => goTo("/progress")}>
              View Progress →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              🧠
            </div>

            <h2>AI Tutor</h2>

            <p>
              Ask StudyAI questions and learn step-by-step.
            </p>

            <button onClick={() => goTo("/ask")}>
              Ask AI Tutor →
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              💰
            </div>

            <h2>Premium</h2>

            <p>
              Explore advanced StudyAI features and plans.
            </p>

            <button onClick={() => goTo("/premium")}>
              View Premium →
            </button>
          </div>
        </section>

        <section className="dashboard-quick">
          <h2>🚀 Quick Start</h2>

          <div className="quick-buttons">
            <button onClick={() => goTo("/ai-notes")}>
              🤖 Create AI Notes
            </button>

            <button onClick={() => goTo("/image-notes")}>
              📸 Image / PDF Notes
            </button>

            <button onClick={() => goTo("/quiz")}>
              📝 Start Quiz
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;