import { useEffect, useMemo, useState } from "react";
import "./Quiz.css";

function Quiz() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("Any Class");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState("10");

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    {
      question: "What is the basic unit of life?",
      options: ["Cell", "Tissue", "Organ", "Organ system"],
      answer: "Cell",
    },
    {
      question:
        "Which gas do plants mainly use during photosynthesis?",
      options: [
        "Oxygen",
        "Carbon dioxide",
        "Nitrogen",
        "Hydrogen",
      ],
      answer: "Carbon dioxide",
    },
    {
      question: "What is 12 × 8?",
      options: ["86", "96", "108", "112"],
      answer: "96",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      answer: "Mars",
    },
    {
      question:
        "Which organ pumps blood through the human body?",
      options: ["Lungs", "Brain", "Heart", "Kidney"],
      answer: "Heart",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["CO₂", "O₂", "H₂O", "NaCl"],
      answer: "H₂O",
    },
    {
      question:
        "Which is the largest planet in our Solar System?",
      options: ["Earth", "Saturn", "Jupiter", "Neptune"],
      answer: "Jupiter",
    },
    {
      question:
        "Which part of the plant absorbs most water?",
      options: ["Flower", "Root", "Leaf", "Fruit"],
      answer: "Root",
    },
    {
      question: "How many sides does a triangle have?",
      options: ["2", "3", "4", "5"],
      answer: "3",
    },
    {
      question:
        "Which language is mainly used to structure web pages?",
      options: ["HTML", "Python", "SQL", "C++"],
      answer: "HTML",
    },
  ];

  const activeQuestions = useMemo(() => {
    const count = Number(questionCount);

    return questions.slice(0, count);
  }, [questionCount]);

  const current = activeQuestions[currentQuestion];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const startQuiz = () => {
    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setTimeLeft(Number(questionCount) * 60);
  };

  const finishQuiz = (finalScore) => {
    const percentage = Math.round(
      (finalScore / activeQuestions.length) * 100
    );

    const savedResults =
      JSON.parse(
        localStorage.getItem("studyAI_quizResults")
      ) || [];

    savedResults.push({
      id: Date.now(),
      subject,
      topic,
      classLevel,
      difficulty,
      totalQuestions: activeQuestions.length,
      correctAnswers: finalScore,
      percentage,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "studyAI_quizResults",
      JSON.stringify(savedResults)
    );

    setScore(finalScore);
    setFinished(true);
    setQuizStarted(false);
  };

  const nextQuestion = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    const isCorrect =
      selectedAnswer === current.answer;

    const newScore = isCorrect
      ? score + 1
      : score;

    if (
      currentQuestion ===
      activeQuestions.length - 1
    ) {
      finishQuiz(newScore);
      return;
    }

    setScore(newScore);
    setSelectedAnswer("");
    setCurrentQuestion(
      currentQuestion + 1
    );
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setTimeLeft(Number(questionCount) * 60);
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const goProgress = () => {
    window.location.href = "/progress";
  };

  useEffect(() => {
    if (!quizStarted || finished) {
      return;
    }

    if (timeLeft <= 0) {
      finishQuiz(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, finished, timeLeft, score]);

  if (finished) {
    const percentage = Math.round(
      (score / activeQuestions.length) * 100
    );

    return (
      <div className="quiz-page">
        <header className="quiz-navbar">
          <button
            className="quiz-home-btn"
            onClick={goHome}
          >
            ← Home
          </button>

          <div className="quiz-logo">
            🎓 StudyAI
          </div>
        </header>

        <main className="quiz-container">
          <section className="quiz-result">
            <div className="quiz-result-icon">
              {percentage >= 80
                ? "🎉"
                : percentage >= 50
                ? "👏"
                : "📚"}
            </div>

            <div className="quiz-badge">
              QUIZ COMPLETED
            </div>

            <h1>Great Work!</h1>

            <p>
              You completed the quiz on{" "}
              <strong>{topic}</strong>.
            </p>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Accuracy</span>
            </div>

            <div className="score-card">
              <div>
                <span>Score</span>
                <strong>
                  {score}/{activeQuestions.length}
                </strong>
              </div>

              <div>
                <span>Difficulty</span>
                <strong>{difficulty}</strong>
              </div>
            </div>

            <div className="result-actions">
              <button
                className="primary-btn"
                onClick={restartQuiz}
              >
                🔄 Try Again
              </button>

              <button
                className="secondary-btn"
                onClick={goProgress}
              >
                📊 View Progress
              </button>
            </div>

            <button
              className="result-home-btn"
              onClick={goHome}
            >
              ← Back to Home
            </button>
          </section>
        </main>
      </div>
    );
  }

  if (quizStarted && current) {
    const progress =
      ((currentQuestion + 1) /
        activeQuestions.length) *
      100;

    return (
      <div className="quiz-page">
        <header className="quiz-navbar">
          <button
            className="quiz-home-btn"
            onClick={goHome}
          >
            ← Home
          </button>

          <div className="quiz-logo">
            🎓 StudyAI
          </div>

          <div
            className={`quiz-timer ${
              timeLeft <= 30
                ? "timer-danger"
                : ""
            }`}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        </header>

        <main className="quiz-container">
          <div className="quiz-top">
            <div>
              <div className="quiz-badge">
                🧠 AI QUIZ
              </div>

              <h1>{topic}</h1>

              <p>
                {subject} • {classLevel} •{" "}
                {difficulty}
              </p>
            </div>

            <div className="question-number">
              Question{" "}
              <strong>
                {currentQuestion + 1}
              </strong>{" "}
              / {activeQuestions.length}
            </div>
          </div>

          <div className="progress-info">
            <span>Quiz Progress</span>
            <strong>
              {Math.round(progress)}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <section className="question-card">
            <div className="question-label">
              QUESTION {currentQuestion + 1}
            </div>

            <h2>{current.question}</h2>

            <div className="answer-options">
              {current.options.map(
                (option, index) => (
                  <button
                    key={option}
                    className={`answer-option ${
                      selectedAnswer === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedAnswer(option)
                    }
                  >
                    <span className="option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>{option}</span>

                    <span className="option-check">
                      {selectedAnswer === option
                        ? "✓"
                        : ""}
                    </span>
                  </button>
                )
              )}
            </div>

            <div className="question-footer">
              <span>
                {selectedAnswer
                  ? "Answer selected"
                  : "Select one answer"}
              </span>

              <button
                className="next-btn"
                onClick={nextQuestion}
              >
                {currentQuestion ===
                activeQuestions.length - 1
                  ? "Finish Quiz ✓"
                  : "Next Question →"}
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="quiz-navbar">
        <button
          className="quiz-home-btn"
          onClick={goHome}
        >
          ← Home
        </button>

        <div className="quiz-logo">
          🎓 StudyAI
        </div>
      </header>

      <main className="quiz-container">
        <div className="quiz-heading">
          <div className="quiz-badge">
            🧠 STUDYAI QUIZ
          </div>

          <h1>
            Test Your Knowledge
          </h1>

          <p>
            Create a personalized quiz and
            check your understanding with
            StudyAI.
          </p>
        </div>

        <section className="quiz-form-card">
          <div className="form-card-header">
            <div className="form-icon">
              📝
            </div>

            <div>
              <h2>Quiz Setup</h2>
              <p>
                Choose your quiz preferences
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Example: Biology"
              />
            </div>

            <div className="form-group">
              <label>Topic</label>

              <input
                type="text"
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                placeholder="Example: Photosynthesis"
              />
            </div>

            <div className="form-group">
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
                <option>
                  College / University
                </option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>
                Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(e.target.value)
                }
              >
                <option value="5">
                  5 Questions
                </option>

                <option value="10">
                  10 Questions
                </option>
              </select>
            </div>
          </div>

          <div className="quiz-info-box">
            <span>💡</span>

            <div>
              <strong>
                Quiz Preview
              </strong>

              <p>
                {questionCount} questions •{" "}
                {difficulty} difficulty •{" "}
                {Number(questionCount)} minute
                timer
              </p>
            </div>
          </div>

          <button
            className="start-quiz-btn"
            onClick={startQuiz}
          >
            🚀 Start Quiz
          </button>
        </section>
      </main>
    </div>
  );
}

export default Quiz;