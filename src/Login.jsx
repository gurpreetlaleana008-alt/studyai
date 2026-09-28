import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (mode === "signup" && !name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const result =
          await createUserWithEmailAndPassword(
            auth,
            cleanEmail,
            password
          );

        localStorage.setItem(
          "studyAI_user",
          JSON.stringify({
            uid: result.user.uid,
            name: name.trim(),
            email: result.user.email,
          })
        );
      } else {
        const result =
          await signInWithEmailAndPassword(
            auth,
            cleanEmail,
            password
          );

        localStorage.setItem(
          "studyAI_user",
          JSON.stringify({
            uid: result.user.uid,
            name: result.user.displayName || "",
            email: result.user.email,
          })
        );
      }

      window.location.href = "/dashboard";
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "This email is already registered. Please login."
        );
      } else if (
        error.code === "auth/invalid-credential"
      ) {
        alert("Incorrect email or password.");
      } else if (
        error.code === "auth/weak-password"
      ) {
        alert(
          "Password should be at least 6 characters."
        );
      } else if (
        error.code === "auth/invalid-email"
      ) {
        alert("Please enter a valid email.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      localStorage.setItem(
        "studyAI_user",
        JSON.stringify({
          uid: result.user.uid,
          name: result.user.displayName || "",
          email: result.user.email,
          photoURL: result.user.photoURL || "",
        })
      );

      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      alert("Please enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        cleanEmail
      );

      alert(
        "Password reset email sent. Please check your inbox."
      );
    } catch (error) {
      if (
        error.code === "auth/invalid-email"
      ) {
        alert("Please enter a valid email.");
      } else if (
        error.code === "auth/user-not-found"
      ) {
        alert(
          "No account was found with this email."
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem(
      "studyAI_guest",
      "true"
    );

    window.location.href = "/ai-notes";
  };

  return (
    <div className="login-page">
      <header className="login-navbar">
        <button
          className="login-home-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Home
        </button>

        <div className="login-logo">
          🎓 StudyAI
        </div>
      </header>

      <main className="login-container">
        <section className="login-card">
          <div className="login-icon">
            🎓
          </div>

          <div className="login-badge">
            🔐 STUDYAI ACCOUNT
          </div>

          <h1>
            {mode === "login"
              ? "Welcome Back"
              : "Create Your Account"}
          </h1>

          <p className="login-subtitle">
            {mode === "login"
              ? "Login to continue your learning journey."
              : "Create your StudyAI account and start learning smarter."}
          </p>

          <form onSubmit={handleEmailAuth}>
            {mode === "signup" && (
              <>
                <label>Full Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                />
              </>
            )}

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
            />

            {mode === "login" && (
              <div className="forgot-row">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading
                ? "⏳ Please wait..."
                : mode === "login"
                ? "🚀 Login"
                : "✨ Create Account"}
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            className="guest-btn"
            onClick={continueAsGuest}
            disabled={loading}
          >
            Continue as Guest
          </button>

          <button
            className="guest-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              marginTop: "10px",
            }}
          >
            🇬 Google Sign in
          </button>

          <div className="login-switch">
            <span>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              onClick={() => {
                setMode(
                  mode === "login"
                    ? "signup"
                    : "login"
                );

                setName("");
                setEmail("");
                setPassword("");
              }}
            >
              {mode === "login"
                ? "Create Account"
                : "Login"}
            </button>
          </div>

          <p className="login-note">
            🔒 Authentication is securely handled by
            Firebase.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;