import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const installStudyAI = async () => {
    if (isInstalled) {
      alert("StudyAI is already installed.");
      return;
    }

    if (!installPrompt) {
      alert(
        "StudyAI installation is not available yet. Please open the published HTTPS website in Chrome or Edge and try again."
      );
      return;
    }

    try {
      installPrompt.prompt();

      const result = await installPrompt.userChoice;

      if (result.outcome === "accepted") {
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error("Installation failed:", error);
    }
  };

  const features = [
    {
      icon: "🤖",
      title: "AI Notes",
      text: "Create smart and organized study notes with AI.",
      link: "/ai-notes",
    },
    {
      icon: "📸",
      title: "Image to Notes",
      text: "Turn textbook images into useful study notes.",
      link: "/image-notes",
    },
    {
      icon: "🧠",
      title: "AI Tutor",
      text: "Ask questions and learn with simple explanations.",
      link: "/ask",
    },
    {
      icon: "📝",
      title: "Quiz",
      text: "Practice with AI-powered quizzes and check your score.",
      link: "/quiz",
    },
    {
      icon: "💾",
      title: "Save",
      text: "Keep your important study material organized.",
      link: "/save",
    },
    {
      icon: "📄",
      title: "PDF",
      text: "Create and download your study material as PDF.",
      link: "/pdf",
    },
    {
      icon: "📊",
      title: "Progress",
      text: "Track your learning and study progress.",
      link: "/progress",
    },
    {
      icon: "💰",
      title: "Premium",
      text: "Unlock advanced StudyAI features.",
      link: "/premium",
    },
  ];

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div
          className="logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          🎓 StudyAI
        </div>

        <div className="nav-links">

          <a href="#home">Home</a>

          <a href="#features">Features</a>

          <a href="/premium">Premium</a>

          {/* INSTALL BUTTON */}
          <button
            className="install-btn"
            onClick={installStudyAI}
          >
            {isInstalled
              ? "✅ Installed"
              : "📲 Install StudyAI"}
          </button>

          <button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <div className="badge">
            🤖 AI POWERED LEARNING
          </div>

          <h1>
            Learn Smarter.
            <br />
            Make Notes.
            <br />
            <span>Prepare Better.</span>
          </h1>

          <p>
            Study smarter with AI Notes,
            Image to Notes, AI Tutor,
            Quizzes, PDF tools and
            Progress tracking.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => {
                window.location.href = "/ai-notes";
              }}
            >
              🚀 Start Learning
            </button>

            {/* HERO INSTALL BUTTON */}
            <button
              className="secondary-btn"
              onClick={installStudyAI}
            >
              {isInstalled
                ? "✅ StudyAI Installed"
                : "📲 Install StudyAI"}
            </button>

            <a
              href="#features"
              className="secondary-btn"
            >
              Explore Features →
            </a>

          </div>
        </div>

        {/* AI CARD */}
        <div className="hero-card">

          <div className="ai-card-header">

            <div className="ai-icon">
              🤖
            </div>

            <div>
              <h3>StudyAI Assistant</h3>
              <p>Your AI Study Assistant</p>
            </div>

            <div className="online">
              ●
            </div>

          </div>

          <div className="ai-message">

            <span>🤖</span>

            <p>
              Hi! What would you like
              to study today?
            </p>

          </div>

          <div className="suggestions">

            <button
              onClick={() => {
                window.location.href = "/ai-notes";
              }}
            >
              📚 Make Notes
            </button>

            <button
              onClick={() => {
                window.location.href = "/quiz";
              }}
            >
              📝 Create Quiz
            </button>

            <button
              onClick={() => {
                window.location.href = "/ask";
              }}
            >
              🧠 Ask Tutor
            </button>

          </div>
        </div>

      </section>

      {/* STUDYAI FLOW */}
      <section className="feature-flow">

        <div className="flow-title">

          <div className="badge">
            ✨ STUDYAI FLOW
          </div>

          <h2>
            Everything You Need in One Place
          </h2>

          <p>
            From creating notes to testing your
            knowledge and tracking your progress.
          </p>

        </div>

        <div className="flow">

          {features.map((feature, index) => (

            <div
              className="flow-item"
              key={feature.title}
            >

              <div className="flow-icon">
                {feature.icon}
              </div>

              <span>
                {feature.title}
              </span>

              {index < features.length - 1 && (
                <div className="flow-arrow">
                  →
                </div>
              )}

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}
      <section
        className="features"
        id="features"
      >

        <div className="section-heading">

          <div className="badge">
            ✨ FEATURES
          </div>

          <h2>
            Study Smarter With StudyAI
          </h2>

          <p>
            Powerful tools designed to make your
            learning faster, easier and more organized.
          </p>

        </div>

        <div className="feature-grid">

          {features.map((feature) => (

            <div
              className="feature-card clickable"
              key={feature.title}
              onClick={() => {
                window.location.href = feature.link;
              }}
              style={{
                cursor: "pointer",
              }}
            >

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>

              <span className="feature-link">
                Explore →
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* PREMIUM CTA */}
      <section className="cta">

        <div className="badge">
          💰 PREMIUM
        </div>

        <h2>
          Ready to Study Smarter?
        </h2>

        <p>
          Start with StudyAI and make your
          preparation easier and more organized.
        </p>

        <button
          className="primary-btn"
          onClick={() => {
            window.location.href = "/premium";
          }}
        >
          🚀 View Premium Plans
        </button>

      </section>

      {/* FOOTER */}
      <footer>

        <div>

          <strong>
            🎓 StudyAI
          </strong>

          <p>
            Your AI Study Assistant
          </p>

        </div>

        <p>
          © 2026 StudyAI. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;