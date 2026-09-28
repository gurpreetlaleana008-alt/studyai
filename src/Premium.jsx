import "./Premium.css";

function Premium() {
  const goHome = () => {
    window.location.href = "/";
  };

  const chooseFree = () => {
    window.location.href = "/ai-notes";
  };

  const choosePremium = () => {
    alert(
      "Premium payment will be connected later."
    );
  };

  return (
    <div className="premium-page">
      <header className="premium-navbar">
        <button
          className="premium-home-btn"
          onClick={goHome}
        >
          ← Home
        </button>

        <div className="premium-logo">
          🎓 StudyAI
        </div>
      </header>

      <main className="premium-container">
        <div className="premium-heading">
          <div className="premium-badge">
            💰 STUDYAI PREMIUM
          </div>

          <h1>
            Choose Your Study Plan
          </h1>

          <p>
            Start for free and upgrade when you
            need more powerful study tools.
          </p>
        </div>

        <section className="pricing-grid">
          <div className="pricing-card">
            <div className="plan-icon">
              🎓
            </div>

            <h2>Free</h2>

            <p className="plan-description">
              Basic tools for everyday studying.
            </p>

            <div className="price">
              ₹0
              <span>/ forever</span>
            </div>

            <div className="features-list">
              <div>✓ AI Notes</div>
              <div>✓ AI Tutor</div>
              <div>✓ Basic Quiz</div>
              <div>✓ Image Upload</div>
              <div>✓ Save Notes</div>
              <div>✓ Basic Progress</div>
            </div>

            <button
              className="free-plan-btn"
              onClick={chooseFree}
            >
              Start Free
            </button>
          </div>

          <div className="pricing-card premium-plan">
            <div className="popular">
              MOST FEATURES
            </div>

            <div className="plan-icon">
              👑
            </div>

            <h2>Premium</h2>

            <p className="plan-description">
              Advanced tools for serious learning.
            </p>

            <div className="price">
              ₹199
              <span>/ month</span>
            </div>

            <div className="features-list">
              <div>✓ Everything in Free</div>
              <div>✓ Advanced AI Notes</div>
              <div>✓ PDF to Notes</div>
              <div>✓ Unlimited Quizzes</div>
              <div>✓ Advanced AI Tutor</div>
              <div>✓ Personal Study Plan</div>
              <div>✓ Detailed Progress</div>
              <div>✓ Premium AI Features</div>
            </div>

            <button
              className="premium-plan-btn"
              onClick={choosePremium}
            >
              🚀 Upgrade to Premium
            </button>
          </div>
        </section>

        <div className="premium-note">
          <strong>🔒 Secure payments coming later</strong>

          <p>
            Premium payment and subscription
            management will be connected after
            the main StudyAI features are complete.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Premium;