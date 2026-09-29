```jsx
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import AINotes from "./AINotes.jsx";
import AIQuestion from "./AIQuestion.jsx";
import ImageNotes from "./ImageNotes.jsx";
import Save from "./Save.jsx";
import PDF from "./PDF.jsx";
import Quiz from "./Quiz.jsx";
import Progress from "./Progress.jsx";
import Premium from "./Premium.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

const path = window.location.pathname;

let Page = App;

if (path === "/ai-notes") {
  Page = AINotes;
}

if (path === "/ask") {
  Page = AIQuestion;
}

if (path === "/image-notes") {
  Page = ImageNotes;
}

if (path === "/save") {
  Page = Save;
}

if (path === "/pdf") {
  Page = PDF;
}

if (path === "/quiz") {
  Page = Quiz;
}

if (path === "/progress") {
  Page = Progress;
}

if (path === "/premium") {
  Page = Premium;
}

if (path === "/login") {
  Page = Login;
}

if (path === "/dashboard") {
  Page = Dashboard;
}

createRoot(document.getElementById("root")).render(
  <Page />
);

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const isHttps = window.location.protocol === "https:";

    if (isLocalhost || isHttps) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("StudyAI Service Worker registered successfully.");
        })
        .catch((error) => {
          console.error(
            "StudyAI Service Worker registration failed:",
            error
          );
        });
    }
  });
}
```